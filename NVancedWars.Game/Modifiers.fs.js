import { Union } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { Percentage_op_Multiply_631F3DCD, Percentage$reflection } from "./Percentage.fs.js";
import { union_type, int32_type } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";
import { fold, sort } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Seq.js";
import { max, comparePrimitives, min, compare } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Util.js";

export class Modifier extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Mult", "Linear", "Min", "Max"];
    }
}

export function Modifier$reflection() {
    return union_type("NVancedWars.Game.Modifier", [], Modifier, () => [[["Item", Percentage$reflection()]], [["Item", int32_type]], [["Item", int32_type]], [["Item", int32_type]]]);
}

export function ModifierModule_order(modifiers) {
    return sort(modifiers, {
        Compare: compare,
    });
}

export function ModifierModule_apply(value, _arg) {
    switch (_arg.tag) {
        case 1: {
            const l = _arg.fields[0] | 0;
            return (l + value) | 0;
        }
        case 2: {
            const v = _arg.fields[0] | 0;
            return min(comparePrimitives, v, value) | 0;
        }
        case 3: {
            const v_1 = _arg.fields[0] | 0;
            return max(comparePrimitives, v_1, value) | 0;
        }
        default: {
            const m = _arg.fields[0];
            return Percentage_op_Multiply_631F3DCD(m, value) | 0;
        }
    }
}

export function ModifierModule_applyAll(value) {
    return (arg) => fold(ModifierModule_apply, value, ModifierModule_order(arg));
}

