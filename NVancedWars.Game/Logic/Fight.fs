namespace NVancedWars.Game.Logic
open NVancedWars.Game

type FightInfo = {
    attacker: UnitState
    defender: UnitState

    attackerTerrain: Terrain
    defenderTerrain: Terrain

    range: int
    blindFire: bool
}

type FightOutcome = {
    attacker: UnitState
    defender: UnitState

    attackerWeapon: WeaponId option
    defenderWeapon: WeaponId option

    attackerOutcome: UnitState option
    defenderOutcome: UnitState option
}

module Fight =

    let damageDealt (attackerHpMult: Percentage) (defenderTerrain: Terrain) (weapon: WeaponInfo) (target: UnitState) =
        let modifiers = [ 
            Mult <| attackerHpMult
            Mult <| DamageType.getDamageCoeff target.info.armorType weapon.damageType
            Mult <| TerrainType.getDefenseModifier (Option.map (fun _ -> Building) defenderTerrain.building |> Option.defaultValue defenderTerrain.terrainType)

            match UnitAttribute.resist target.info.attributes with
            | None -> 
                ()
            | Some resist -> 
                Linear (-resist)
        ]
        
        let damage = Modifier.applyAll weapon.damage modifiers
        damage

    let findBestWeapon (attackerEffectiveHp: int) (attacker: UnitState) (defender: UnitState) (rules: GameRules) (defenderTerrain: Terrain) (range: int) (blind: bool) (attributePredicate: WeaponAttribute list -> bool) =
        let usableWeapons =
            Map.values attacker.info.weapons
            |> Seq.where (fun weapon -> (Option.defaultValue 0 weapon.minRange) <= range && weapon.maxRange >= range)
            |> Seq.where (fun weapon -> Option.isNone weapon.ammo || (Map.tryFind weapon.id attacker.ammo |> Option.defaultValue 0) > 0)
            |> Seq.where (fun weapon -> attributePredicate weapon.weaponAttributes)
        
        let attackerHpMult = Percentage.from (attackerEffectiveHp, attacker.info.hp)

        let weaponDamages =
            usableWeapons
            |> Seq.map (fun weapon -> weapon, damageDealt attackerHpMult defenderTerrain weapon defender)
            |> Seq.sortByDescending snd
            |> List.ofSeq

        match weaponDamages with
        | [] -> None
        | (_, damage)::_ ->
            let maxWeapons = 
                weaponDamages
                |> List.takeWhile (snd >> (=) damage)
                |> List.map fst
            
            let chosen = 
                maxWeapons
                |> List.tryFind (fun x -> Option.isNone x.ammo)
                |> Option.defaultValue (
                    maxWeapons
                    |> List.sortByDescending (fun x -> Map.tryFind x.id attacker.ammo |> Option.defaultValue 0)
                    |> List.head
                )

            Some (chosen, damage)

    let canCounter (atkWeapon: WeaponInfo) (testWeapon: WeaponAttribute list) =
        if WeaponAttribute.cannotCounter testWeapon then false
        else if WeaponAttribute.cannotBeCountered atkWeapon.weaponAttributes then false
        else if WeaponAttribute.indirect atkWeapon.weaponAttributes && not (WeaponAttribute.counterIndirect testWeapon) then false
        else not (WeaponAttribute.indirect testWeapon)

    let previewFight (fight: FightInfo) (rules: GameRules): FightOutcome =
        let (atkWeapon, atkDamage) = 
            match findBestWeapon fight.attacker.hp fight.attacker fight.defender rules fight.defenderTerrain fight.range fight.blindFire (fun attribs -> if fight.blindFire then WeaponAttribute.indirect attribs else true) with
            | None -> None, 0
            | Some (wpn, dmg) -> Some wpn, dmg

        let dmgBeforeCounter = rules.firstStrikeDamage * atkDamage

        let (defWeapon, defDamage) =
            match findBestWeapon (fight.defender.hp - dmgBeforeCounter) fight.defender fight.attacker rules fight.attackerTerrain fight.range false (match atkWeapon with | None -> (fun _ -> true) | Some atk -> canCounter atk) with
            | None -> None, 0
            | Some(wpn, dmg) -> Some(wpn), dmg

        let attackerHpLeft = fight.attacker.hp - defDamage
        let defenderHpLeft = fight.defender.hp - atkDamage

        let handleState (unit: UnitState) (hpLeft: int) (spendAmmoFor: WeaponInfo option) =
            if hpLeft <= 0 then None
            else
                match spendAmmoFor with
                | None -> Some { unit with hp = hpLeft }
                | Some (wpn) -> Some { unit with hp = hpLeft; ammo = Map.change wpn.id (function None -> None | Some n -> Some (n-1)) unit.ammo }

        {
            attacker = fight.attacker
            defender = fight.defender

            attackerWeapon = atkWeapon |> Option.map (fun wpn -> wpn.id)
            defenderWeapon = defWeapon |> Option.map (fun wpn -> wpn.id)

            attackerOutcome = handleState fight.attacker attackerHpLeft atkWeapon
            defenderOutcome = handleState fight.defender defenderHpLeft defWeapon
        }

