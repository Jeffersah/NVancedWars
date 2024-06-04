import { Union } from "../../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { UnitId$reflection } from "../Ids.fs.js";
import { Point$reflection } from "../Point.fs.js";
import { union_type } from "../../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";
import { UnitState$reflection } from "../UnitState.fs.js";
import { UnitAction$reflection, UnitMove$reflection } from "./PlayerAction.fs.js";

export class ObservedUnitAction extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["DropTransportedUnit", "Capture"];
    }
}

export function ObservedUnitAction$reflection() {
    return union_type("NVancedWars.Game.Logic.ObservedUnitAction", [], ObservedUnitAction, () => [[["Item1", UnitId$reflection()], ["Item2", Point$reflection()]], [["Item", Point$reflection()]]]);
}

export class ObservedAction extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["UnitEnteredView", "UnitLeftView", "UnitMoved", "UnitActed"];
    }
}

export function ObservedAction$reflection() {
    return union_type("NVancedWars.Game.Logic.ObservedAction", [], ObservedAction, () => [[["Item1", Point$reflection()], ["Item2", UnitState$reflection()]], [["Item1", Point$reflection()], ["Item2", UnitState$reflection()]], [["Item", UnitMove$reflection()]], [["Item1", UnitId$reflection()], ["Item2", UnitAction$reflection()]]]);
}

