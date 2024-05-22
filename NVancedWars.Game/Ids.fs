namespace NVancedWars.Game

type UnitId = UnitId of Guid
type PlayerId = PlayerId of Guid

type UnitInfoId = UnitInfoId of string
type WeaponId = WeaponId of string
type BuildingInfoId = BuildingInfoId of string

type DamageType = DamageType of string

type Layer =
    | Sub
    | Surface
    | Air