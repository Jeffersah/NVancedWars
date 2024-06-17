import { Record } from "../../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { UnitState, UnitState$reflection } from "../UnitState.fs.js";
import { Terrain$reflection } from "../Terrain.fs.js";
import { option_type, record_type, bool_type, int32_type } from "../../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";
import { WeaponId$reflection } from "../Ids.fs.js";
import { map as map_1, sortByDescending, where, empty, singleton, append, delay, toList } from "../../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Seq.js";
import { ModifierModule_applyAll, Modifier } from "../Modifiers.fs.js";
import { DamageTypeModule_getDamageCoeff } from "../Generated/ArmorDamage.fs.js";
import { TerrainType, TerrainTypeModule_getDefenseModifier } from "../Generated/Terrain.fs.js";
import { map, defaultArg } from "../../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Option.js";
import { WeaponAttributeModule_counterIndirect, WeaponAttributeModule_indirect, WeaponAttributeModule_cannotBeCountered, WeaponAttributeModule_cannotCounter, UnitAttributeModule_resist } from "../Attributes.fs.js";
import { op_UnaryNegation_Int32 } from "../../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Int32.js";
import { change, values, tryFind } from "../../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Map.js";
import { Percentage_op_Multiply_631F3DCD, Percentage_from_Z37302880 } from "../Percentage.fs.js";
import { sortByDescending as sortByDescending_1, tryFind as tryFind_1, takeWhile, map as map_2, head, isEmpty, ofSeq } from "../../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/List.js";
import { comparePrimitives } from "../../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Util.js";

export class FightInfo extends Record {
    "constructor"(attacker, defender, attackerTerrain, defenderTerrain, range, blindFire) {
        super();
        this.attacker = attacker;
        this.defender = defender;
        this.attackerTerrain = attackerTerrain;
        this.defenderTerrain = defenderTerrain;
        this.range = (range | 0);
        this.blindFire = blindFire;
    }
}

export function FightInfo$reflection() {
    return record_type("NVancedWars.Game.Logic.FightInfo", [], FightInfo, () => [["attacker", UnitState$reflection()], ["defender", UnitState$reflection()], ["attackerTerrain", Terrain$reflection()], ["defenderTerrain", Terrain$reflection()], ["range", int32_type], ["blindFire", bool_type]]);
}

export class FightOutcome extends Record {
    "constructor"(attacker, defender, attackerWeapon, defenderWeapon, attackerOutcome, defenderOutcome) {
        super();
        this.attacker = attacker;
        this.defender = defender;
        this.attackerWeapon = attackerWeapon;
        this.defenderWeapon = defenderWeapon;
        this.attackerOutcome = attackerOutcome;
        this.defenderOutcome = defenderOutcome;
    }
}

export function FightOutcome$reflection() {
    return record_type("NVancedWars.Game.Logic.FightOutcome", [], FightOutcome, () => [["attacker", UnitState$reflection()], ["defender", UnitState$reflection()], ["attackerWeapon", option_type(WeaponId$reflection())], ["defenderWeapon", option_type(WeaponId$reflection())], ["attackerOutcome", option_type(UnitState$reflection())], ["defenderOutcome", option_type(UnitState$reflection())]]);
}

export function Fight_damageDealt(attackerHpMult, defenderTerrain, weapon, target) {
    const modifiers = toList(delay(() => append(singleton(new Modifier(0, [attackerHpMult])), delay(() => append(singleton(new Modifier(0, [DamageTypeModule_getDamageCoeff(target.info.armorType, weapon.damageType)])), delay(() => append(singleton(new Modifier(0, [TerrainTypeModule_getDefenseModifier(defaultArg(map((_arg) => (new TerrainType(1, [])), defenderTerrain.building), defenderTerrain.terrainType))])), delay(() => {
        const matchValue = UnitAttributeModule_resist(target.info.attributes);
        if (matchValue != null) {
            const resist = matchValue | 0;
            return singleton(new Modifier(1, [op_UnaryNegation_Int32(resist)]));
        }
        else {
            return empty();
        }
    }))))))));
    let damage;
    const clo = ModifierModule_applyAll(weapon.damage);
    damage = clo(modifiers);
    return damage | 0;
}

export function Fight_findBestWeapon(attackerEffectiveHp, attacker, defender, rules, defenderTerrain, range, blind, attributePredicate) {
    const usableWeapons = where((weapon_2) => attributePredicate(weapon_2.weaponAttributes), where((weapon_1) => {
        if (weapon_1.ammo == null) {
            return true;
        }
        else {
            return defaultArg(tryFind(weapon_1.id, attacker.ammo), 0) > 0;
        }
    }, where((weapon) => {
        if (defaultArg(weapon.minRange, 0) <= range) {
            return weapon.maxRange >= range;
        }
        else {
            return false;
        }
    }, values(attacker.info.weapons))));
    const attackerHpMult = Percentage_from_Z37302880(attackerEffectiveHp, attacker.info.hp);
    const weaponDamages = ofSeq(sortByDescending((tuple) => tuple[1], map_1((weapon_3) => [weapon_3, Fight_damageDealt(attackerHpMult, defenderTerrain, weapon_3, defender)], usableWeapons), {
        Compare: comparePrimitives,
    }));
    if (!isEmpty(weaponDamages)) {
        const damage = head(weaponDamages)[1] | 0;
        const maxWeapons = map_2((tuple_2) => tuple_2[0], takeWhile((arg) => (damage === arg[1]), weaponDamages));
        let chosen;
        const option_2 = tryFind_1((x_1) => (x_1.ammo == null), maxWeapons);
        const value_2 = head(sortByDescending_1((x_2) => defaultArg(tryFind(x_2.id, attacker.ammo), 0), maxWeapons, {
            Compare: comparePrimitives,
        }));
        chosen = defaultArg(option_2, value_2);
        return [chosen, damage];
    }
    else {
        return void 0;
    }
}

export function Fight_canCounter(atkWeapon, testWeapon) {
    if (WeaponAttributeModule_cannotCounter(testWeapon)) {
        return false;
    }
    else if (WeaponAttributeModule_cannotBeCountered(atkWeapon.weaponAttributes)) {
        return false;
    }
    else if (WeaponAttributeModule_indirect(atkWeapon.weaponAttributes) && (!WeaponAttributeModule_counterIndirect(testWeapon))) {
        return false;
    }
    else {
        return !WeaponAttributeModule_indirect(testWeapon);
    }
}

export function Fight_previewFight(fight, rules) {
    let atk;
    let patternInput;
    const matchValue = Fight_findBestWeapon(fight.attacker.hp, fight.attacker, fight.defender, rules, fight.defenderTerrain, fight.range, fight.blindFire, (attribs) => (fight.blindFire ? WeaponAttributeModule_indirect(attribs) : true));
    if (matchValue != null) {
        const wpn = matchValue[0];
        const dmg = matchValue[1] | 0;
        patternInput = [wpn, dmg];
    }
    else {
        patternInput = [void 0, 0];
    }
    const atkWeapon = patternInput[0];
    const atkDamage = patternInput[1] | 0;
    const dmgBeforeCounter = Percentage_op_Multiply_631F3DCD(rules.firstStrikeDamage, atkDamage) | 0;
    let patternInput_1;
    const matchValue_1 = Fight_findBestWeapon(fight.defender.hp - dmgBeforeCounter, fight.defender, fight.attacker, rules, fight.attackerTerrain, fight.range, false, (atkWeapon != null) ? ((atk = atkWeapon, (testWeapon) => Fight_canCounter(atk, testWeapon))) : ((_arg) => true));
    if (matchValue_1 != null) {
        const wpn_1 = matchValue_1[0];
        const dmg_1 = matchValue_1[1] | 0;
        patternInput_1 = [wpn_1, dmg_1];
    }
    else {
        patternInput_1 = [void 0, 0];
    }
    const defWeapon = patternInput_1[0];
    const defDamage = patternInput_1[1] | 0;
    const attackerHpLeft = (fight.attacker.hp - defDamage) | 0;
    const defenderHpLeft = (fight.defender.hp - atkDamage) | 0;
    const handleState = (unit, hpLeft, spendAmmoFor) => {
        if (hpLeft <= 0) {
            return void 0;
        }
        else if (spendAmmoFor != null) {
            const wpn_2 = spendAmmoFor;
            return new UnitState(unit.owner, unit.id, unit.info, hpLeft, change(wpn_2.id, (_arg_1) => {
                if (_arg_1 != null) {
                    const n = _arg_1 | 0;
                    return n - 1;
                }
                else {
                    return void 0;
                }
            }, unit.ammo), unit.position);
        }
        else {
            return new UnitState(unit.owner, unit.id, unit.info, hpLeft, unit.ammo, unit.position);
        }
    };
    return new FightOutcome(fight.attacker, fight.defender, map((wpn_3) => wpn_3.id, atkWeapon), map((wpn_4) => wpn_4.id, defWeapon), handleState(fight.attacker, attackerHpLeft, atkWeapon), handleState(fight.defender, defenderHpLeft, defWeapon));
}

