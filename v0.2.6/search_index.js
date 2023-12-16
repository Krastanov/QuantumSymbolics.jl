var documenterSearchIndex = {"docs":
[{"location":"qubit_basis/#Typical-Qubit-Bases","page":"Qubit Basis Choice","title":"Typical Qubit Bases","text":"","category":"section"},{"location":"qubit_basis/","page":"Qubit Basis Choice","title":"Qubit Basis Choice","text":"DocTestSetup = quote\n    using QuantumSymbolics, QuantumOptics\nend","category":"page"},{"location":"qubit_basis/","page":"Qubit Basis Choice","title":"Qubit Basis Choice","text":"Here are some common conventions for representing a qubit in a physical system. This reference is provided as the conventions matter to the correct choice of noise processes and bases in which they are represented.","category":"page"},{"location":"qubit_basis/","page":"Qubit Basis Choice","title":"Qubit Basis Choice","text":"In monospaced code format we give the symbols by which these objects are callable in QuantumSymbolics. We provide unicode and ASCII names for convenience of typing.","category":"page"},{"location":"qubit_basis/#Spin-\\frac{1}{2}-qubits","page":"Qubit Basis Choice","title":"Spin frac12 qubits","text":"","category":"section"},{"location":"qubit_basis/","page":"Qubit Basis Choice","title":"Qubit Basis Choice","text":"First we introduce the Pauli matrices:","category":"page"},{"location":"qubit_basis/","page":"Qubit Basis Choice","title":"Qubit Basis Choice","text":"julia> express(σᶻ) |> dense # or `Z`\nOperator(dim=2x2)\n  basis: Spin(1/2)\n 1.0+0.0im   0.0+0.0im\n 0.0+0.0im  -1.0+0.0im\n\njulia> express(σˣ) |> dense # or `X`\nOperator(dim=2x2)\n  basis: Spin(1/2)\n 0.0+0.0im  1.0+0.0im\n 1.0+0.0im  0.0+0.0im\n\njulia> express(σʸ) |> dense # or `Y`\nOperator(dim=2x2)\n  basis: Spin(1/2)\n 0.0+0.0im  -0.0-1.0im\n 0.0+1.0im   0.0+0.0im","category":"page"},{"location":"qubit_basis/","page":"Qubit Basis Choice","title":"Qubit Basis Choice","text":"Above dense is from QuantumOptics, used to convert their representation to a dense matrix.","category":"page"},{"location":"qubit_basis/","page":"Qubit Basis Choice","title":"Qubit Basis Choice","text":"The eigenvectors of each one of them provides for a convenient basis. The σᶻ basis is also called the computational basis. As mentioned, we have both unicode and ASCII names for convenience of typing. For these basis vectors we also have two sets of names: one based on which operator they are eigenvectors of and one in terms of typical logical representation (with prefix L).","category":"page"},{"location":"qubit_basis/","page":"Qubit Basis Choice","title":"Qubit Basis Choice","text":"Z1 = Z₁ = L0 = L₀ = 0rangle = beginpmatrix10endpmatrix = uparrowrangle with eigenvalue +1 for σᶻ\nZ2 = Z₂ = L1 = L₁ = 1rangle = beginpmatrix01endpmatrix = downarrowrangle with eigenvalue +1 for σᶻ\nX1 = X₁ = Lp = L₊ = +rangle = frac1sqrt 2beginpmatrix11endpmatrix with eigenvalue +1 for σˣ\nX2 = X₂ = Lm = L₋ = -rangle = frac1sqrt 2beginpmatrix1-1endpmatrix with eigenvalue -1 for σˣ\nY1 = Y₁ = Lpi = L₊ᵢ = +irangle = frac1sqrt 2beginpmatrix1 iendpmatrix with eigenvalue +1 for σʸ\nY2 = Y₂ = Lmi = L₋ᵢ = -irangle = frac1sqrt 2beginpmatrix1-iendpmatrix with eigenvalue -1 for σʸ","category":"page"},{"location":"qubit_basis/","page":"Qubit Basis Choice","title":"Qubit Basis Choice","text":"The Y vectors occasionally are denoted with R and L (stemming from the vector notation for right and left polarized light), but there is no established notation choice or ordering.","category":"page"},{"location":"qubit_basis/","page":"Qubit Basis Choice","title":"Qubit Basis Choice","text":"warning: Talking about ground/excited and spin-up/spin-down states can lead to confusion\nWe specifically avoid using notation with \"ground\" and \"excited\" states. For physicist usually the excited state is the \"up\" states (erangle=uparrowrangle), but that historical choice clashes with the logical state notation as we have the logical zero be the \"excited\" state. This clash becomes particularly confusing when noise processes and relaxation process are taken into account. E.g. one might think the operator usually denoted hatsigma_- would be the one corresponding to decay but we actually have hatsigma_-0rangle=1rangle. To avoid this confusion we strive to not use the notation uparrowrangle, downarrowrangle, erangle, and grangle. Similarly we strongly prefer to never use hatsigma_- and hatsigma_+, rather only use 1rangle langle0 and its conjugate. If we were instead talking about single-rail photonic qubits, we do not have the same issue (because the diagonal of the number operator is growing, instead of decreasing like the diagonal of the Pauli Z).","category":"page"},{"location":"qubit_basis/","page":"Qubit Basis Choice","title":"Qubit Basis Choice","text":"The basis states can be easily expressed both as kets and as tableaux (In the tableau representation below the top half corresponds to the destabilizer, while the bottom is the stabilizer):","category":"page"},{"location":"qubit_basis/","page":"Qubit Basis Choice","title":"Qubit Basis Choice","text":"julia> express(L0, CliffordRepr())\n𝒟ℯ𝓈𝓉𝒶𝒷\n+ X\n𝒮𝓉𝒶𝒷\n+ Z\n\n\njulia> express(L1, CliffordRepr())\n𝒟ℯ𝓈𝓉𝒶𝒷\n+ X\n𝒮𝓉𝒶𝒷\n- Z\n\n\njulia> express(L₀, CliffordRepr())\n𝒟ℯ𝓈𝓉𝒶𝒷\n+ X\n𝒮𝓉𝒶𝒷\n+ Z\n\n\njulia> express(L₁, CliffordRepr())\n𝒟ℯ𝓈𝓉𝒶𝒷\n+ X\n𝒮𝓉𝒶𝒷\n- Z\n\n\njulia> express(L₊, CliffordRepr())\n𝒟ℯ𝓈𝓉𝒶𝒷\n+ Z\n𝒮𝓉𝒶𝒷\n+ X\n\n\njulia> express(L₋, CliffordRepr())\n𝒟ℯ𝓈𝓉𝒶𝒷\n+ Z\n𝒮𝓉𝒶𝒷\n- X\n\n\njulia> express(L₊ᵢ, CliffordRepr())\n𝒟ℯ𝓈𝓉𝒶𝒷\n+ Z\n𝒮𝓉𝒶𝒷\n+ Y\n\n\njulia> express(L₋ᵢ, CliffordRepr())\n𝒟ℯ𝓈𝓉𝒶𝒷\n+ Z\n𝒮𝓉𝒶𝒷\n- Y","category":"page"},{"location":"qubit_basis/","page":"Qubit Basis Choice","title":"Qubit Basis Choice","text":"julia> express(L₀)\nKet(dim=2)\n  basis: Spin(1/2)\n 1.0 + 0.0im\n 0.0 + 0.0im\n\njulia> express(L₁)\nKet(dim=2)\n  basis: Spin(1/2)\n 0.0 + 0.0im\n 1.0 + 0.0im\n\njulia> express(L₊)\nKet(dim=2)\n  basis: Spin(1/2)\n 0.7071067811865475 + 0.0im\n 0.7071067811865475 + 0.0im\n\njulia> express(L₋)\nKet(dim=2)\n  basis: Spin(1/2)\n  0.7071067811865475 + 0.0im\n -0.7071067811865475 + 0.0im\n\njulia> express(L₊ᵢ)\nKet(dim=2)\n  basis: Spin(1/2)\n 0.7071067811865475 + 0.0im\n                0.0 + 0.7071067811865475im\n\njulia> express(L₋ᵢ)\nKet(dim=2)\n  basis: Spin(1/2)\n 0.7071067811865475 + 0.0im\n                0.0 - 0.7071067811865475im","category":"page"},{"location":"bibliography/#Bibliography","page":"Bibliography","title":"Bibliography","text":"","category":"section"},{"location":"bibliography/","page":"Bibliography","title":"Bibliography","text":"","category":"page"},{"location":"#QuantumSymbolics.jl","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"","category":"section"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"DocTestSetup = quote\n    using QuantumSymbolics\nend","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"A symbolics package for quantum information science. It serves two purposes:","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"It provides for algebraic manipulation of mathematical expressions related to your quantum models. Particularly helpful when having to automatically generate or simplify expressions of significant complexity.\nAn assortment of \"expression translators\" are provided that can turn a symbolic expression into a numerical one in a variety of formalisms.","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"Below we list some commonly used expressions, followed by an autogenerated API list.","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"using QuantumSymbolics","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"<table>\n<tr>\n<th></th><th>Symbolic Example</th><th>Conversion Example</th>\n</tr>\n<tr>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"<!-- Qubit Basis States -->\n<td>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"Qubit Basis States X1, X2, Y1, Y2, Z1, Z2","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</td>\n<td>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"Z1","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</td>\n<td>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"express(Z1)","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"express(Y2, CliffordRepr())","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</td>\n</tr>\n<tr>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"<!-- Common gates -->\n<td>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"Common gates: CNOT, H, etc","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</td>\n<td>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"CNOT","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</td>\n<td>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"express(H)","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"express(CNOT, CliffordRepr(), UseAsOperation())","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</td>\n</tr>\n<tr>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"<!-- Tensor products and sums -->\n<td>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"Tensor products ⊗ and sums +","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</td>\n<td>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"(X1⊗Z2 + Y1⊗Y2 ) / √3","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</td>\n<td>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"express(X1⊗Z1)","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"express(X1⊗Y2, CliffordRepr())","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</td>\n</tr>\n<tr>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"<!-- Projectors -->\n<td>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"Projectors, pure density matrices","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</td>\n<td>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"SProjector(X1⊗Z2)","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</td>\n<td>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"express(SProjector(X1⊗Z1))","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"express(SProjector(X1⊗Z1), CliffordRepr())","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</td>\n</tr>\n<tr>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"<!-- Completely mixed state -->\n<td>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"Completely depolarized (mixed) state","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</td>\n<td>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"MixedState(X1)","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</td>\n<td>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"express(MixedState(X1))","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"express(MixedState(X1), CliffordRepr())","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</td>\n</tr>\n<tr>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"<!-- Mixtures -->\n<td>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"Impure states, represented as sum of density matrices","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</td>\n<td>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"(MixedState(X1)+SProjector(Z1)) / 2","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</td>\n<td>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"express((MixedState(X1)+SProjector(Z1)) / 2)","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"When a Clifford representation is used, an efficient sampler is generated, and stabilizer states are randomly sampled from the correct distribution:","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"express(MixedState(X1)/2+SProjector(Z1)/2, CliffordRepr())","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</td>\n</tr>\n<tr>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"</tr>\n</table>","category":"page"},{"location":"","page":"QuantumSymbolics.jl","title":"QuantumSymbolics.jl","text":"warning: Stabilizer state expressions\nThe state written as fracZ₁Z₁+Z₂Z₂2 is a well known stabilizer state, namely a Bell state. However, automatically expressing it as a stabilizer is a prohibitively expensive computational operation in general. We do not perform that computation automatically. If you want to ensure that states you define can be automatically converted to tableaux for Clifford simulations, avoid using sumation of kets. On the other hand, in all of our Clifford Monte-Carlo simulations, ⊗ is fully supported, as well as SProjector, MixedState, StabilizerState, and sumation of density matrices.","category":"page"},{"location":"API/#Full-API","page":"API","title":"Full API","text":"","category":"section"},{"location":"API/","page":"API","title":"API","text":"<style>\n    .content table td {\n        padding-top: 0 !important;\n        padding-bottom: 0 !important;\n    }\n</style>","category":"page"},{"location":"API/#Autogenerated-API-list","page":"API","title":"Autogenerated API list","text":"","category":"section"},{"location":"API/","page":"API","title":"API","text":"Modules = [QuantumSymbolics]\nPrivate = false","category":"page"},{"location":"API/#QuantumSymbolics.CNOT","page":"API","title":"QuantumSymbolics.CNOT","text":"CNOT gate\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.CPHASE","page":"API","title":"QuantumSymbolics.CPHASE","text":"CPHASE gate\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.Create","page":"API","title":"QuantumSymbolics.Create","text":"Creation operator, also available as the constant âꜛ - there is no unicode dagger superscript, so we use the uparrow\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.Destroy","page":"API","title":"QuantumSymbolics.Destroy","text":"Annihilation operator, also available as the constant â\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.F₁","page":"API","title":"QuantumSymbolics.F₁","text":"Single photon basis state of n\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.H","page":"API","title":"QuantumSymbolics.H","text":"Hadamard gate\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.N","page":"API","title":"QuantumSymbolics.N","text":"Number operator, also available as the constant n̂\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.Pm","page":"API","title":"QuantumSymbolics.Pm","text":"Pauli \"minus\" operator, also available as the constant σ₋\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.Pp","page":"API","title":"QuantumSymbolics.Pp","text":"Pauli \"plus\" operator, also available as the constant σ₊\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.X","page":"API","title":"QuantumSymbolics.X","text":"Pauli X operator, also available as the constant σˣ\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.X1","page":"API","title":"QuantumSymbolics.X1","text":"Basis state of σˣ\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.X2","page":"API","title":"QuantumSymbolics.X2","text":"Basis state of σˣ\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.Y","page":"API","title":"QuantumSymbolics.Y","text":"Pauli Y operator, also available as the constant σʸ\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.Y1","page":"API","title":"QuantumSymbolics.Y1","text":"Basis state of σʸ\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.Y2","page":"API","title":"QuantumSymbolics.Y2","text":"Basis state of σʸ\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.Z","page":"API","title":"QuantumSymbolics.Z","text":"Pauli Z operator, also available as the constant σᶻ\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.Z1","page":"API","title":"QuantumSymbolics.Z1","text":"Basis state of σᶻ\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.Z2","page":"API","title":"QuantumSymbolics.Z2","text":"Basis state of σᶻ\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.vac","page":"API","title":"QuantumSymbolics.vac","text":"Vacuum basis state of n\n\n\n\n\n\n","category":"constant"},{"location":"API/#QuantumSymbolics.AbstractRepresentation","page":"API","title":"QuantumSymbolics.AbstractRepresentation","text":"An abstract type for the supported representation of quantum objects.\n\n\n\n\n\n","category":"type"},{"location":"API/#QuantumSymbolics.CliffordRepr","page":"API","title":"QuantumSymbolics.CliffordRepr","text":"Representation using tableaux governed by QuantumClifford.jl\n\n\n\n\n\n","category":"type"},{"location":"API/#QuantumSymbolics.DephasingCPTP","page":"API","title":"QuantumSymbolics.DephasingCPTP","text":"Single-qubit dephasing CPTP map\n\n\n\n\n\n","category":"type"},{"location":"API/#QuantumSymbolics.GateCPTP","page":"API","title":"QuantumSymbolics.GateCPTP","text":"A unitary gate followed by a CPTP map\n\n\n\n\n\n","category":"type"},{"location":"API/#QuantumSymbolics.IdentityOp","page":"API","title":"QuantumSymbolics.IdentityOp","text":"The identity operator for a given basis\n\njulia> IdentityOp(X1⊗X2)\n𝕀\n\njulia> express(IdentityOp(Z2))\nOperator(dim=2x2)\n  basis: Spin(1/2)sparse([1, 2], [1, 2], ComplexF64[1.0 + 0.0im, 1.0 + 0.0im], 2, 2)\n\n\n\n\n\n","category":"type"},{"location":"API/#QuantumSymbolics.MixedState","page":"API","title":"QuantumSymbolics.MixedState","text":"Completely depolarized state\n\njulia> MixedState(X1⊗X2)\n𝕄\n\njulia> express(MixedState(X1⊗X2))\nOperator(dim=4x4)\n  basis: [Spin(1/2) ⊗ Spin(1/2)]sparse([1, 2, 3, 4], [1, 2, 3, 4], ComplexF64[0.25 + 0.0im, 0.25 + 0.0im, 0.25 + 0.0im, 0.25 + 0.0im], 4, 4)\n\njulia> express(MixedState(X1⊗X2), CliffordRepr())\n𝒟ℯ𝓈𝓉𝒶𝒷\n\n𝒳ₗ━━\n+ X_\n+ _X\n𝒮𝓉𝒶𝒷\n\n𝒵ₗ━━\n+ Z_\n+ _Z\n\n\n\n\n\n","category":"type"},{"location":"API/#QuantumSymbolics.PauliNoiseCPTP","page":"API","title":"QuantumSymbolics.PauliNoiseCPTP","text":"Single-qubit Pauli noise CPTP map\n\njulia> apply!(express(Z1), [1], express(PauliNoiseCPTP(1/4,1/4,1/4)))\nOperator(dim=2x2)\n  basis: Spin(1/2)\n 0.5+0.0im  0.0+0.0im\n 0.0+0.0im  0.5+0.0im\n\n\n\n\n\n","category":"type"},{"location":"API/#QuantumSymbolics.QuantumMCRepr","page":"API","title":"QuantumSymbolics.QuantumMCRepr","text":"Similar to QuantumOpticsRepr, but using trajectories instead of superoperators.\n\n\n\n\n\n","category":"type"},{"location":"API/#QuantumSymbolics.QuantumOpticsRepr","page":"API","title":"QuantumSymbolics.QuantumOpticsRepr","text":"Representation using kets, bras, density matrices, and superoperators governed by QuantumOptics.jl.\n\n\n\n\n\n","category":"type"},{"location":"API/#QuantumSymbolics.SDagger","page":"API","title":"QuantumSymbolics.SDagger","text":"Dagger a Ket into Bra.\n\n\n\n\n\n","category":"type"},{"location":"API/#QuantumSymbolics.SProjector","page":"API","title":"QuantumSymbolics.SProjector","text":"Projector for a given ket\n\njulia> SProjector(X1⊗X2)\n𝐏[|X₁⟩|X₂⟩]\n\njulia> express(SProjector(X2))\nOperator(dim=2x2)\n  basis: Spin(1/2)\n  0.5+0.0im  -0.5-0.0im\n -0.5+0.0im   0.5+0.0im\n\n\n\n\n\n","category":"type"},{"location":"API/#QuantumSymbolics.StabilizerState","page":"API","title":"QuantumSymbolics.StabilizerState","text":"State defined by a stabilizer tableau\n\nFor full functionality you also need to import the QuantumClifford library.\n\njulia> using QuantumClifford, QuantumOptics # needed for the internal representation of the stabilizer tableaux and the conversion to a ket\n\njulia> StabilizerState(S\"XX ZZ\")\n𝒮₂\n\njulia> express(StabilizerState(S\"-X\"))\nKet(dim=2)\n  basis: Spin(1/2)\n  0.7071067811865475 + 0.0im\n -0.7071067811865475 + 0.0im\n\n\n\n\n\n","category":"type"},{"location":"API/#QuantumSymbolics.consistent_representation-Tuple{Any, Any}","page":"API","title":"QuantumSymbolics.consistent_representation","text":"Pick a representation that is consistent with given representations and appropriate for the given state.\n\n\n\n\n\n","category":"method"},{"location":"API/#QuantumSymbolics.express","page":"API","title":"QuantumSymbolics.express","text":"The main interface for expressing quantum objects in various representations.\n\njulia> express(X1)\nKet(dim=2)\n  basis: Spin(1/2)\n 0.7071067811865475 + 0.0im\n 0.7071067811865475 + 0.0im\n\njulia> express(X1, CliffordRepr())\n𝒟ℯ𝓈𝓉𝒶𝒷\n+ Z\n𝒮𝓉𝒶𝒷\n+ X\n\njulia> express(QuantumSymbolics.X, CliffordRepr(), UseAsOperation())\nsX\n\n\n\n\n\n","category":"function"}]
}
