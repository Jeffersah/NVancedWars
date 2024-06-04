import { Record, Union } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { Point$reflection } from "./Point.fs.js";
import { record_type, class_type, int32_type, union_type } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";
import { WeaponId$reflection, UnitId$reflection, PlayerId$reflection } from "./Ids.fs.js";
import { UnitInfo$reflection } from "./UnitInfo.fs.js";

export class UnitPosition extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["InTransport", "OnMap"];
    }
}

export function UnitPosition$reflection() {
    return union_type("NVancedWars.Game.UnitPosition", [], UnitPosition, () => [[], [["Item", Point$reflection()]]]);
}

export class UnitState extends Record {
    "constructor"(owner, id, info, hp, ammo, position) {
        super();
        this.owner = owner;
        this.id = id;
        this.info = info;
        this.hp = (hp | 0);
        this.ammo = ammo;
        this.position = position;
    }
}

export function UnitState$reflection() {
    return record_type("NVancedWars.Game.UnitState", [], UnitState, () => [["owner", PlayerId$reflection()], ["id", UnitId$reflection()], ["info", UnitInfo$reflection()], ["hp", int32_type], ["ammo", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [WeaponId$reflection(), int32_type])], ["position", UnitPosition$reflection()]]);
}

