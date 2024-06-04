import { Record, Union } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { record_type, class_type, union_type } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";
import { UnitId$reflection, PlayerId$reflection } from "./Ids.fs.js";

export class UnitActionState extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Ready", "Moved", "Acted"];
    }
}

export function UnitActionState$reflection() {
    return union_type("NVancedWars.Game.UnitActionState", [], UnitActionState, () => [[], [], []]);
}

export function UnitActionStateModule_canMove(_arg) {
    if (_arg.tag === 0) {
        return true;
    }
    else {
        return false;
    }
}

export function UnitActionStateModule_canAct(_arg) {
    switch (_arg.tag) {
        case 0:
        case 1: {
            return true;
        }
        default: {
            return false;
        }
    }
}

export class ActivePlayerInfo extends Record {
    "constructor"(id, unitActionStates) {
        super();
        this.id = id;
        this.unitActionStates = unitActionStates;
    }
}

export function ActivePlayerInfo$reflection() {
    return record_type("NVancedWars.Game.ActivePlayerInfo", [], ActivePlayerInfo, () => [["id", PlayerId$reflection()], ["unitActionStates", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [UnitId$reflection(), UnitActionState$reflection()])]]);
}

