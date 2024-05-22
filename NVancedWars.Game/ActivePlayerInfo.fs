namespace NVancedWars.Game

type UnitActionState =
    | Ready
    | Moved
    | Acted

module UnitActionState =
    let canMove =
        function
        | Ready -> true
        | _-> false

    let canAct =
        function
        | Ready
        | Moved -> true
        | _ -> false

type ActivePlayerInfo = {
    id: PlayerId    
    unitActionStates: Map<UnitId, UnitActionState>
}