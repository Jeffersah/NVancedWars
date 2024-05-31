namespace NVancedWars.Game

type Modifier =
    | Mult of Percentage
    | Linear of int
    | Min of int
    | Max of int

module Modifier =

    let order (modifiers: #seq<Modifier>) = Seq.sort modifiers
    let apply (value: int) =
        function
        | Mult m -> m * value
        | Linear l -> l + value
        | Min v -> min v value
        | Max v -> max v value

    let applyAll value =
        order >> Seq.fold apply value