##
# This file defines manual simplification and expansion rules for specific operations of quantum objects.
##

##
# Predicate functions
##
function hasscalings(xs)
    any(xs) do x
        operation(x) == *
    end
end
_isa(T) = x->isa(x,T)
_vecisa(T) = x->all(_isa(T), x)

##
# Simplification rules
## 

# Pauli identities
RULES_PAULI = [
    @rule(~o1::_isa(XGate)*~o2::_isa(XGate) => I),
    @rule(~o1::_isa(YGate)*~o2::_isa(YGate) => I),
    @rule(~o1::_isa(ZGate)*~o2::_isa(ZGate) => I),
    @rule(~o1::_isa(XGate)*~o2::_isa(YGate) => im*Z),
    @rule(~o1::_isa(YGate)*~o2::_isa(ZGate) => im*X),
    @rule(~o1::_isa(ZGate)*~o2::_isa(XGate) => im*Y),
    @rule(~o1::_isa(YGate)*~o2::_isa(XGate) => -im*Z),
    @rule(~o1::_isa(ZGate)*~o2::_isa(YGate) => -im*X),
    @rule(~o1::_isa(XGate)*~o2::_isa(ZGate) => -im*Y),
    @rule(~o1::_isa(HGate)*~o2::_isa(XGate)*~o3::_isa(HGate) => Z),
    @rule(~o1::_isa(HGate)*~o2::_isa(YGate)*~o3::_isa(HGate) => -Y),
    @rule(~o1::_isa(HGate)*~o2::_isa(ZGate)*~o3::_isa(HGate) => X)
]

# Commutator identities
RULES_COMMUTATOR = [
    @rule(commutator(~o1::_isa(XGate), ~o2::_isa(YGate)) => 2*im*Z),
    @rule(commutator(~o1::_isa(YGate), ~o2::_isa(ZGate)) => 2*im*X),
    @rule(commutator(~o1::_isa(ZGate), ~o2::_isa(XGate)) => 2*im*Y),
    @rule(commutator(~o1::_isa(YGate), ~o2::_isa(XGate)) => -2*im*Z),
    @rule(commutator(~o1::_isa(ZGate), ~o2::_isa(YGate)) => -2*im*X),
    @rule(commutator(~o1::_isa(XGate), ~o2::_isa(ZGate)) => -2*im*Y)
]

# Anticommutator identities
RULES_ANTICOMMUTATOR = [
    @rule(anticommutator(~o1::_isa(XGate), ~o2::_isa(XGate)) => 2*I),
    @rule(anticommutator(~o1::_isa(YGate), ~o2::_isa(YGate)) => 2*I),
    @rule(anticommutator(~o1::_isa(ZGate), ~o2::_isa(ZGate)) => 2*I),
    @rule(anticommutator(~o1::_isa(XGate), ~o2::_isa(YGate))=> 0),
    @rule(anticommutator(~o1::_isa(YGate), ~o2::_isa(ZGate)) => 0),
    @rule(anticommutator(~o1::_isa(ZGate), ~o2::_isa(XGate)) => 0),
    @rule(anticommutator(~o1::_isa(YGate), ~o2::_isa(XGate)) => 0),
    @rule(anticommutator(~o1::_isa(ZGate), ~o2::_isa(YGate)) => 0),
    @rule(anticommutator(~o1::_isa(XGate), ~o2::_isa(ZGate)) => 0),
    @rule(commutator(~o1::_isa(DestroyOp), ~o2::_isa(CreateOp)) => IdentityOp(inf_fock_basis)),
    @rule(commutator(~o1::_isa(CreateOp), ~o2::_isa(DestroyOp)) => -IdentityOp(inf_fock_basis)),
    @rule(commutator(~o1::_isa(NumberOp), ~o2::_isa(DestroyOp)) => -Destroy),
    @rule(commutator(~o1::_isa(DestroyOp), ~o2::_isa(NumberOp)) => Destroy),
    @rule(commutator(~o1::_isa(NumberOp), ~o2::_isa(CreateOp)) => Create),
    @rule(commutator(~o1::_isa(CreateOp), ~o2::_isa(NumberOp)) => -Create)
]

RULES_FOCK = [
    @rule(~o::_isa(DestroyOp) * ~f::(x->isequal(x, vac)) => SZeroKet()),
    @rule(~o::_isa(CreateOp) * ~f::_isa(FockState) => sqrt((~f).idx+1)*FockState((~f).idx+1, inf_fock_basis)),
    @rule(~o::_isa(DestroyOp) * ~f::_isa(FockState) => sqrt((~f).idx)*FockState((~f).idx-1, inf_fock_basis)),
    @rule(~o::_isa(NumberOp) * ~f::_isa(FockState) => (~f).idx*(~f))
]

RULES_SIMPLIFY = [RULES_PAULI; RULES_COMMUTATOR; RULES_ANTICOMMUTATOR; RULES_FOCK]

##
# Simplification rewriters
##

qsimplify_anticommutator = Chain(RULES_ANTICOMMUTATOR)
qsimplify_pauli = Chain(RULES_PAULI)
qsimplify_commutator = Chain(RULES_COMMUTATOR)

"""Manually simplify a symbolic expression of quantum objects. 

If the keyword `rewriter` is not specified, then `qsimplify` will apply every defined rule to the expression. 
For performance or single-purpose motivations, the user has the option to define a specific rewriter for `qsimplify` to apply to the expression.

```jldoctest
julia> qsimplify(σʸ*commutator(σˣ*σᶻ, σᶻ))
(0 - 2im)Z

julia> qsimplify(anticommutator(σˣ, σˣ), rewriter=qsimplify_anticommutator)
2𝕀
```
"""
function qsimplify(s; rewriter=nothing)
    if QuantumSymbolics.isexpr(s)
        if isnothing(rewriter)
            Fixpoint(Prewalk(Chain(RULES_SIMPLIFY)))(s)
        else
            Fixpoint(Prewalk(rewriter))(s)
        end
    else
        error("Object $(s) of type $(typeof(s)) is not an expression.")
    end
end

##
# Expansion rules
## 

RULES_EXPAND = [
    @rule(commutator(~o1, ~o2) => (~o1)*(~o2) - (~o2)*(~o1)),
    @rule(anticommutator(~o1, ~o2) => (~o1)*(~o2) + (~o2)*(~o1)),
    @rule(~o1 ⊗ +(~~ops) => +(map(op -> ~o1 ⊗ op, ~~ops)...)),
    @rule(+(~~ops) ⊗ ~o1 => +(map(op -> op ⊗ ~o1, ~~ops)...)),
    @rule(~o1 * +(~~ops) => +(map(op -> ~o1 * op, ~~ops)...)),
    @rule(+(~~ops) * ~o1 => +(map(op -> op * ~o1, ~~ops)...)),
    @rule(+(~~ops) * ~o1 => +(map(op -> op * ~o1, ~~ops)...)),
    @rule(⊗(~~ops1::_vecisa(Symbolic{AbstractOperator})) * ⊗(~~ops2::_vecisa(Symbolic{AbstractOperator})) => ⊗(map(*, ~~ops1, ~~ops2)...)),
    @rule(⊗(~~ops1::_vecisa(Symbolic{AbstractBra})) * ⊗(~~ops2::_vecisa(Symbolic{AbstractKet})) => *(map(*, ~~ops1, ~~ops2)...))
]

# 

##
# Expansion rewriter
##

"""Manually expand a symbolic expression of quantum objects. 

```jldoctest
julia> @op A; @op B; @op C;

julia> qexpand(commutator(A, B))
(-1BA+AB)

julia> qexpand(A⊗(B+C))
((A⊗B)+(A⊗C))

julia> @ket k₁; @ket k₂;

julia> qexpand(A*(k₁+k₂))
(A|k₁⟩+A|k₂⟩)
```
"""
function qexpand(s)
    if QuantumSymbolics.isexpr(s)
        Fixpoint(Prewalk(Chain(RULES_EXPAND)))(s)
    else
        error("Object $(s) of type $(typeof(s)) is not an expression.")
    end
end