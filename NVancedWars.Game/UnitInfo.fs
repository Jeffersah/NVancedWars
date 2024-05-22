namespace NVancedWars.Game

type WeaponInfo = 
    {
        id: WeaponId
        displayName: string
        damageType: DamageType
        damage: int
        ammo: int option
        minRange: int
        maxRange: int
        targetLayers: Layer list
        weaponAttributes: WeaponAttribute list
    }

type UnitInfo =
    {
        id: UnitInfoId
        displayName: string
        price: int
        hp: int
        layer: Layer
        armorType: ArmorType
        attributes: UnitAttribute list
        vision: int
        moveType: MovementType
        moveSpeed: int
        weapons: Map<WeaponId, WeaponInfo>
    }

type BuildingInfo = 
    {
        id: BuildingInfoId
        hp: int
        canBuild: UnitInfoId list
        incomeMult: Percentage
    }

type BuildingState =
    {
        info: BuildingInfoId
        hp: int
        captureStatus: Map<PlayerId, Percentage>
    }