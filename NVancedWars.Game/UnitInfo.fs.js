import { Record } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { PlayerId$reflection, BuildingInfoId$reflection, UnitInfoId$reflection, Layer$reflection, WeaponId$reflection } from "./Ids.fs.js";
import { class_type, record_type, list_type, option_type, int32_type, string_type } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";
import { ArmorType$reflection, DamageType$reflection } from "./Generated/ArmorDamage.fs.js";
import { UnitAttribute$reflection, WeaponAttribute$reflection } from "./Attributes.fs.js";
import { MovementType$reflection } from "./Generated/Terrain.fs.js";
import { Percentage$reflection } from "./Percentage.fs.js";

export class WeaponInfo extends Record {
    "constructor"(id, displayName, damageType, damage, ammo, minRange, maxRange, targetLayers, weaponAttributes) {
        super();
        this.id = id;
        this.displayName = displayName;
        this.damageType = damageType;
        this.damage = (damage | 0);
        this.ammo = ammo;
        this.minRange = minRange;
        this.maxRange = (maxRange | 0);
        this.targetLayers = targetLayers;
        this.weaponAttributes = weaponAttributes;
    }
}

export function WeaponInfo$reflection() {
    return record_type("NVancedWars.Game.WeaponInfo", [], WeaponInfo, () => [["id", WeaponId$reflection()], ["displayName", string_type], ["damageType", DamageType$reflection()], ["damage", int32_type], ["ammo", option_type(int32_type)], ["minRange", option_type(int32_type)], ["maxRange", int32_type], ["targetLayers", list_type(Layer$reflection())], ["weaponAttributes", list_type(WeaponAttribute$reflection())]]);
}

export class UnitInfo extends Record {
    "constructor"(id, displayName, price, hp, layer, armorType, attributes, vision, moveType, moveSpeed, weapons) {
        super();
        this.id = id;
        this.displayName = displayName;
        this.price = (price | 0);
        this.hp = (hp | 0);
        this.layer = layer;
        this.armorType = armorType;
        this.attributes = attributes;
        this.vision = (vision | 0);
        this.moveType = moveType;
        this.moveSpeed = (moveSpeed | 0);
        this.weapons = weapons;
    }
}

export function UnitInfo$reflection() {
    return record_type("NVancedWars.Game.UnitInfo", [], UnitInfo, () => [["id", UnitInfoId$reflection()], ["displayName", string_type], ["price", int32_type], ["hp", int32_type], ["layer", Layer$reflection()], ["armorType", ArmorType$reflection()], ["attributes", list_type(UnitAttribute$reflection())], ["vision", int32_type], ["moveType", MovementType$reflection()], ["moveSpeed", int32_type], ["weapons", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [WeaponId$reflection(), WeaponInfo$reflection()])]]);
}

export class BuildingInfo extends Record {
    "constructor"(id, hp, canBuild, incomeMult) {
        super();
        this.id = id;
        this.hp = (hp | 0);
        this.canBuild = canBuild;
        this.incomeMult = incomeMult;
    }
}

export function BuildingInfo$reflection() {
    return record_type("NVancedWars.Game.BuildingInfo", [], BuildingInfo, () => [["id", BuildingInfoId$reflection()], ["hp", int32_type], ["canBuild", list_type(UnitInfoId$reflection())], ["incomeMult", Percentage$reflection()]]);
}

export class BuildingState extends Record {
    "constructor"(info, hp, captureStatus) {
        super();
        this.info = info;
        this.hp = (hp | 0);
        this.captureStatus = captureStatus;
    }
}

export function BuildingState$reflection() {
    return record_type("NVancedWars.Game.BuildingState", [], BuildingState, () => [["info", BuildingInfoId$reflection()], ["hp", int32_type], ["captureStatus", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [PlayerId$reflection(), Percentage$reflection()])]]);
}

