import { Union } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { class_type, union_type } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";
import { Point$reflection } from "./Point.fs.js";
import { defaultArg } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Option.js";
import { add, tryFind } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Map.js";

export class FovState extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["BlackMap", "Hidden", "Visible", "Revealed"];
    }
}

export function FovState$reflection() {
    return union_type("NVancedWars.Game.FovState", [], FovState, () => [[], [], [], []]);
}

export class Fov extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Fov"];
    }
}

export function Fov$reflection() {
    return union_type("NVancedWars.Game.Fov", [], Fov, () => [[["Item", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [Point$reflection(), FovState$reflection()])]]]);
}

export function FovModule_getCell(pt, _arg) {
    const fov = _arg.fields[0];
    return defaultArg(tryFind(pt, fov), new FovState(1, []));
}

export function FovModule_markVisible(pt, _arg) {
    const fov = _arg.fields[0];
    return new Fov(0, [add(pt, new FovState(2, []), fov)]);
}

export function FovModule_markRevealed(pt, _arg) {
    const fov = _arg.fields[0];
    return new Fov(0, [add(pt, new FovState(3, []), fov)]);
}

