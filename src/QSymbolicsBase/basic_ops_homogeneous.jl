##
# This file defines the symbolic operations for quantum objects (kets, operators, and bras) 
# that are homogeneous in their arguments.
##

"""Scaling of a quantum object (ket, operator, or bra) by a number

```jldoctest
julia> k = SKet(:k, SpinBasis(1//2))
|k⟩

julia> 2*k
2|k⟩

julia> A = SOperator(:A, SpinBasis(1//2))
A 

julia> 2*A
2A
````
"""
@withmetadata struct SScaled{T<:QObj} <: Symbolic{T}
    coeff
    obj
    SScaled{S}(c,k) where S = _isone(c) ? k : new{S}(c,k)
end
isexpr(::SScaled) = true
iscall(::SScaled) = true
arguments(x::SScaled) = [x.coeff,x.obj]
operation(x::SScaled) = *
head(x::SScaled) = :*
children(x::SScaled) = [:*,x.coeff,x.obj]
function Base.:(*)(c, x::Symbolic{T}) where {T<:QObj} 
    if iszero(c) || isa(x,SymZeroObj)
        first(filter(i->i<:Symbolic{T}, Base.uniontypes(SymZeroObj)))()
    else
        SScaled{T}(c, x)
    end
end
function Base.:(*)(x::Symbolic{T}, c) where {T<:QObj} 
    if iszero(c) || isa(x,SymZeroObj)
        first(filter(i->i<:Symbolic{T}, Base.uniontypes(SymZeroObj)))()
    else
        SScaled{T}(c, x)
    end
end
Base.:(/)(x::Symbolic{T}, c) where {T<:QObj} = iszero(c) ? error("cannot divide by zero") : SScaled{T}(1/c,x)
Base.:(/)(x::SymZeroObj, c) = x
basis(x::SScaled) = basis(x.obj)

const SScaledKet = SScaled{AbstractKet}
function Base.show(io::IO, x::SScaledKet)
    if x.coeff isa Number
        print(io, "$(x.coeff)$(x.obj)")
    else
        print(io, "($(x.coeff))$(x.obj)")
    end
end
const SScaledOperator = SScaled{AbstractOperator}
function Base.show(io::IO, x::SScaledOperator)
    if x.coeff isa Number
        print(io, "$(x.coeff)$(x.obj)")
    else
        print(io, "($(x.coeff))$(x.obj)")
    end
end
const SScaledBra = SScaled{AbstractBra}
function Base.show(io::IO, x::SScaledBra)
    if x.coeff isa Number
        print(io, "$(x.coeff)$(x.obj)")
    else
        print(io, "($(x.coeff))$(x.obj)")
    end
end

"""Addition of quantum objects (kets, operators, or bras)

```jldoctest
julia> k₁ = SKet(:k₁, SpinBasis(1//2)); k₂ = SKet(:k₂, SpinBasis(1//2));

julia> k₁ + k₂
(|k₁⟩+|k₂⟩)
```
"""
@withmetadata struct SAdd{T<:QObj} <: Symbolic{T}
    dict
    _set_precomputed
    _arguments_precomputed
    SAdd{S}(d,s,a) where S = length(d)==1 ? SScaled{S}(reverse(first(d))...) : new{S}(d,s,a)
end
isexpr(::SAdd) = true
iscall(::SAdd) = true
arguments(x::SAdd) = x._arguments_precomputed
operation(x::SAdd) = +
head(x::SAdd) = :+
children(x::SAdd) = [:+; x._arguments_precomputed]
function Base.:(+)(xs::Vararg{Symbolic{T},N}) where {T<:QObj,N} 
    nonzero_terms = filter!(x->!isa(x,SymZeroObj),collect(xs))
    isempty(nonzero_terms) ? xs[1] : SAdd{T}(countmap_flatten(nonzero_terms, SScaled{T}), Set(collect(xs)), collect(xs))
end
Base.:(+)(xs::Vararg{Symbolic{<:QObj},0}) = 0 # to avoid undefined type parameters issue in the above method
basis(x::SAdd) = basis(first(x.dict).first)

const SAddKet = SAdd{AbstractKet}
function Base.show(io::IO, x::SAddKet)
    ordered_terms = sort([repr(i) for i in arguments(x)])
    print(io, "("*join(ordered_terms,"+")::String*")") # type assert to help inference
end
const SAddOperator = SAdd{AbstractOperator}
function Base.show(io::IO, x::SAddOperator) 
    ordered_terms = sort([repr(i) for i in arguments(x)])
    print(io, "("*join(ordered_terms,"+")::String*")") # type assert to help inference
end
const SAddBra = SAdd{AbstractBra}
function Base.show(io::IO, x::SAddBra)
    ordered_terms = sort([repr(i) for i in arguments(x)])
    print(io, "("*join(ordered_terms,"+")::String*")") # type assert to help inference
end

"""Symbolic application of operator on operator

```jldoctest
julia> A = SOperator(:A, SpinBasis(1//2)); B = SOperator(:B, SpinBasis(1//2));

julia> A*B 
AB
```
"""
@withmetadata struct SMulOperator <: Symbolic{AbstractOperator}
    terms
    function SMulOperator(terms)
        coeff, cleanterms = prefactorscalings(terms)
        coeff*new(cleanterms)
    end
end
isexpr(::SMulOperator) = true
iscall(::SMulOperator) = true
arguments(x::SMulOperator) = x.terms
operation(x::SMulOperator) = *
head(x::SMulOperator) = :*
children(x::SMulOperator) = [:*;x.terms]
function Base.:(*)(xs::Symbolic{AbstractOperator}...) 
    zero_ind = findfirst(x->isa(x,SZeroOperator), xs)
    isnothing(zero_ind) ? SMulOperator(collect(xs)) : SZeroOperator()
end
Base.show(io::IO, x::SMulOperator) = print(io, join(map(string, arguments(x)),""))
basis(x::SMulOperator) = basis(x.terms)

"""Tensor product of quantum objects (kets, operators, or bras)

```jldoctest
julia> k₁ = SKet(:k₁, SpinBasis(1//2)); k₂ = SKet(:k₂, SpinBasis(1//2));

julia> k₁ ⊗ k₂
|k₁⟩|k₂⟩

julia> A = SOperator(:A, SpinBasis(1//2)); B = SOperator(:B, SpinBasis(1//2));

julia> A ⊗ B 
A⊗B
```
"""
@withmetadata struct STensor{T<:QObj} <: Symbolic{T}
    terms
    function STensor{S}(terms) where S
        coeff, cleanterms = prefactorscalings(terms)
        coeff * new{S}(cleanterms)
    end
end
isexpr(::STensor) = true
iscall(::STensor) = true
arguments(x::STensor) = x.terms
operation(x::STensor) = ⊗
head(x::STensor) = :⊗
children(x::STensor) = pushfirst!(x.terms,:⊗)
function ⊗(xs::Symbolic{T}...) where {T<:QObj}
    zero_ind = findfirst(x->isa(x,SymZeroObj), xs)
    isnothing(zero_ind) ? STensor{T}(collect(xs)) : xs[zero_ind]
end
basis(x::STensor) = tensor(basis.(x.terms)...)

const STensorKet = STensor{AbstractKet}
Base.show(io::IO, x::STensorKet) = print(io, join(map(string, arguments(x)),""))
const STensorOperator = STensor{AbstractOperator}
Base.show(io::IO, x::STensorOperator) = print(io, join(map(string, arguments(x)),"⊗"))
const STensorSuperOperator = STensor{AbstractSuperOperator}
Base.show(io::IO, x::STensorSuperOperator) = print(io, join(map(string, arguments(x)),"⊗"))
const STensorBra = STensor{AbstractBra}
Base.show(io::IO, x::STensorBra) = print(io, join(map(string, arguments(x)),""))

"""Symbolic commutator of two operators

```jldoctest
julia> A = SOperator(:A, SpinBasis(1//2)); B = SOperator(:B, SpinBasis(1//2));

julia> commutator(A, B)
[A,B]

julia> commutator(A, A)
𝟎
```
"""
@withmetadata struct SCommutator <: Symbolic{AbstractOperator}
    op1
    op2
    function SCommutator(o1, o2) 
        coeff, cleanterms = prefactorscalings([o1 o2], scalar=true)
        cleanterms[1] === cleanterms[2] ? SZeroOperator() : coeff*new(cleanterms...)
    end
end
isexpr(::SCommutator) = true
iscall(::SCommutator) = true
arguments(x::SCommutator) = [x.op1, x.op2]
operation(x::SCommutator) = commutator
head(x::SCommutator) = :commutator
children(x::SCommutator) = [:commutator, x.op1, x.op2]
commutator(o1::Symbolic{AbstractOperator}, o2::Symbolic{AbstractOperator}) = SCommutator(o1, o2)
commutator(o1::SZeroOperator, o2::Symbolic{AbstractOperator}) = SZeroOperator()
commutator(o1::Symbolic{AbstractOperator}, o2::SZeroOperator) = SZeroOperator()
commutator(o1::SZeroOperator, o2::SZeroOperator) = SZeroOperator()
Base.show(io::IO, x::SCommutator) = print(io, "[$(x.op1),$(x.op2)]")
basis(x::SCommutator) = basis(x.op1)
expand(x::SCommutator) = x == 0 ? x : x.op1*x.op2 - x.op2*x.op1

"""Symbolic anticommutator of two operators

```jldoctest
julia> A = SOperator(:A, SpinBasis(1//2)); B = SOperator(:B, SpinBasis(1//2));

julia> anticommutator(A, B)
{A,B}
```
"""
@withmetadata struct SAnticommutator <: Symbolic{AbstractOperator}
    op1
    op2
    function SAnticommutator(o1, o2) 
        coeff, cleanterms = prefactorscalings([o1 o2], scalar=true)
        coeff*new(cleanterms...)
    end
end
isexpr(::SAnticommutator) = true
iscall(::SAnticommutator) = true
arguments(x::SAnticommutator) = [x.op1, x.op2]
operation(x::SAnticommutator) = anticommutator
head(x::SAnticommutator) = :anticommutator
children(x::SAnticommutator) = [:anticommutator, x.op1, x.op2]
anticommutator(o1::Symbolic{AbstractOperator}, o2::Symbolic{AbstractOperator}) = SAnticommutator(o1, o2)
anticommutator(o1::SZeroOperator, o2::Symbolic{AbstractOperator}) = SZeroOperator()
anticommutator(o1::Symbolic{AbstractOperator}, o2::SZeroOperator) = SZeroOperator()
anticommutator(o1::SZeroOperator, o2::SZeroOperator) = SZeroOperator()
Base.show(io::IO, x::SAnticommutator) = print(io, "{$(x.op1),$(x.op2)}")
basis(x::SAnticommutator) = basis(x.op1)
expand(x::SAnticommutator) = x == 0 ? x : x.op1*x.op2 + x.op2*x.op1
