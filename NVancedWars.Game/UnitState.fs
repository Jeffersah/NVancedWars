namespace NVancedWars.Game

type UnitPosition =
    | InTransport
    | OnMap of Point


type UnitState = {
    owner: PlayerId
    id: UnitId
    info: UnitInfo
    hp: int
    ammo: Map<WeaponId, int>
    position: UnitPosition
}