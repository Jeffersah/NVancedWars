namespace NVancedWars.Game.Logic
open NVancedWars.Game

type UnitMove =
    {
        id: UnitId 
        path: Point list
        enterTransport: UnitId option
    }

type UnitAction =
    | Wait
    | AttackUnit of WeaponId * UnitId
    | BlindAttack of WeaponId * Point
    | DropTransportedUnit of UnitId * Point
    | Capture of Point

type PlayerAction =
    | MoveUnit of UnitMove
    | UseAction of UnitId * UnitAction
