import { Union } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { string_type, union_type, class_type } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";

export class UnitId extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["UnitId"];
    }
}

export function UnitId$reflection() {
    return union_type("NVancedWars.Game.UnitId", [], UnitId, () => [[["Item", class_type("System.Guid")]]]);
}

export class PlayerId extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["PlayerId"];
    }
}

export function PlayerId$reflection() {
    return union_type("NVancedWars.Game.PlayerId", [], PlayerId, () => [[["Item", class_type("System.Guid")]]]);
}

export class UnitInfoId extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["UnitInfoId"];
    }
}

export function UnitInfoId$reflection() {
    return union_type("NVancedWars.Game.UnitInfoId", [], UnitInfoId, () => [[["Item", string_type]]]);
}

export class WeaponId extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["WeaponId"];
    }
}

export function WeaponId$reflection() {
    return union_type("NVancedWars.Game.WeaponId", [], WeaponId, () => [[["Item", string_type]]]);
}

export class BuildingInfoId extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["BuildingInfoId"];
    }
}

export function BuildingInfoId$reflection() {
    return union_type("NVancedWars.Game.BuildingInfoId", [], BuildingInfoId, () => [[["Item", string_type]]]);
}

export class Layer extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Sub", "Surface", "Air"];
    }
}

export function Layer$reflection() {
    return union_type("NVancedWars.Game.Layer", [], Layer, () => [[], [], []]);
}

