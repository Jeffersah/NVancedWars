// AUTO GENERATED FILE //
// Do NOT edit this file manually //
// Run NVancedWars.CodeGen instead! //
namespace NVancedWars.Game
type DamageType = 
    | Rifle
    | Cannon
    | APHE
    | HE
    | Grenade
    | HighVelocity
    | Bomb
    | Special

type ArmorType = 
    | Unarmored
    | Light
    | Tank
    | Heavy
    | Air
    | Ship
module DamageType = 
    let getDamageCoeff armor damage = 
        match armor, damage with
        | Unarmored, Rifle -> Percentage(100)
        | Light, Rifle -> Percentage(80)
        | Tank, Rifle -> Percentage(30)
        | Heavy, Rifle -> Percentage(20)
        | Air, Rifle -> Percentage(80)
        | Ship, Rifle -> Percentage(30)
        | Unarmored, Cannon -> Percentage(100)
        | Light, Cannon -> Percentage(120)
        | Tank, Cannon -> Percentage(60)
        | Heavy, Cannon -> Percentage(40)
        | Air, Cannon -> Percentage(100)
        | Ship, Cannon -> Percentage(60)
        | Unarmored, APHE -> Percentage(40)
        | Light, APHE -> Percentage(80)
        | Tank, APHE -> Percentage(100)
        | Heavy, APHE -> Percentage(80)
        | Air, APHE -> Percentage(20)
        | Ship, APHE -> Percentage(80)
        | Unarmored, HE -> Percentage(120)
        | Light, HE -> Percentage(100)
        | Tank, HE -> Percentage(60)
        | Heavy, HE -> Percentage(20)
        | Air, HE -> Percentage(100)
        | Ship, HE -> Percentage(100)
        | Unarmored, Grenade -> Percentage(100)
        | Light, Grenade -> Percentage(80)
        | Tank, Grenade -> Percentage(20)
        | Heavy, Grenade -> Percentage(20)
        | Air, Grenade -> Percentage(20)
        | Ship, Grenade -> Percentage(20)
        | Unarmored, HighVelocity -> Percentage(20)
        | Light, HighVelocity -> Percentage(60)
        | Tank, HighVelocity -> Percentage(100)
        | Heavy, HighVelocity -> Percentage(100)
        | Air, HighVelocity -> Percentage(80)
        | Ship, HighVelocity -> Percentage(60)
        | Unarmored, Bomb -> Percentage(100)
        | Light, Bomb -> Percentage(100)
        | Tank, Bomb -> Percentage(100)
        | Heavy, Bomb -> Percentage(100)
        | Air, Bomb -> Percentage(20)
        | Ship, Bomb -> Percentage(100)
        | Unarmored, Special -> Percentage(100)
        | Light, Special -> Percentage(100)
        | Tank, Special -> Percentage(100)
        | Heavy, Special -> Percentage(100)
        | Air, Special -> Percentage(100)
        | Ship, Special -> Percentage(100)
        | _ -> Percentage(0)
    let allDamageTypes = [ Rifle, Cannon, APHE, HE, Grenade, HighVelocity, Bomb, Special ]
module ArmorType = 
    let allArmorTypes = [ Unarmored, Light, Tank, Heavy, Air, Ship ]