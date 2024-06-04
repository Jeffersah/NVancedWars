import { Union, Record } from "../../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { WeaponId$reflection, UnitId$reflection } from "../Ids.fs.js";
import { Point$reflection } from "../Point.fs.js";
import { union_type, record_type, option_type, list_type } from "../../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";

export class UnitMove extends Record {
    "constructor"(id, path, enterTransport) {
        super();
        this.id = id;
        this.path = path;
        this.enterTransport = enterTransport;
    }
}

export function UnitMove$reflection() {
    return record_type("NVancedWars.Game.Logic.UnitMove", [], UnitMove, () => [["id", UnitId$reflection()], ["path", list_type(Point$reflection())], ["enterTransport", option_type(UnitId$reflection())]]);
}

export class UnitAction extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Wait", "AttackUnit", "BlindAttack", "DropTransportedUnit", "Capture"];
    }
}

export function UnitAction$reflection() {
    return union_type("NVancedWars.Game.Logic.UnitAction", [], UnitAction, () => [[], [["Item1", WeaponId$reflection()], ["Item2", UnitId$reflection()]], [["Item1", WeaponId$reflection()], ["Item2", Point$reflection()]], [["Item1", UnitId$reflection()], ["Item2", Point$reflection()]], [["Item", Point$reflection()]]]);
}

export class PlayerAction extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["MoveUnit", "UseAction"];
    }
}

export function PlayerAction$reflection() {
    return union_type("NVancedWars.Game.Logic.PlayerAction", [], PlayerAction, () => [[["Item", UnitMove$reflection()]], [["Item1", UnitId$reflection()], ["Item2", UnitAction$reflection()]]]);
}

