namespace NVancedWars.Game.Logic
open NVancedWars.Game


type ObservedUnitAction =
    | DropTransportedUnit of UnitId * Point
    | Capture of Point

type ObservedAction =
    | UnitEnteredView of Point * UnitState
    | UnitLeftView of Point * UnitState
    | UnitMoved of UnitMove
    | UnitActed of UnitId * UnitAction
