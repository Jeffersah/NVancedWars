import { printf, toFail } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/String.js";
import { Record } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { class_type } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";

export class Percentage extends Record {
    "constructor"(_v) {
        super();
        this._v = (_v | 0);
    }
    Equals(obj) {
        const this$ = this;
        let matchResult;
        if (obj instanceof Percentage) {
            if (Percentage__get_v(obj) === Percentage__get_v(this$)) {
                matchResult = 0;
            }
            else {
                matchResult = 1;
            }
        }
        else {
            matchResult = 1;
        }
        switch (matchResult) {
            case 0: {
                return true;
            }
            case 1: {
                return false;
            }
        }
    }
    GetHashCode() {
        const this$ = this;
        return this$._v | 0;
    }
    "System.IComparable`1.CompareTo2B595"(other) {
        const this$ = this;
        return (this$._v - Percentage__get_v(other)) | 0;
    }
    CompareTo(obj) {
        const this$ = this;
        if (obj instanceof Percentage) {
            return this$["System.IComparable`1.CompareTo2B595"](obj) | 0;
        }
        else {
            const clo = toFail(printf("Can\'t compare percentage to %A"));
            return clo(obj) | 0;
        }
    }
}

export function Percentage$reflection() {
    return class_type("NVancedWars.Game.Percentage", void 0, Percentage, class_type("System.ValueType"));
}

export function Percentage_$ctor_Z524259A4(_v) {
    return new Percentage(_v);
}

export function Percentage__get_v(_) {
    return _._v;
}

export function Percentage_get_oneHundred() {
    return Percentage_$ctor_Z524259A4(100);
}

export function Percentage_get_zero() {
    return Percentage_$ctor_Z524259A4(0);
}

export function Percentage_get_fifty() {
    return Percentage_$ctor_Z524259A4(50);
}

export function Percentage_from_Z37302880(current, max) {
    return Percentage_$ctor_Z524259A4(~(~((current * 100) / max)));
}

export function Percentage_op_Addition_Z3F598920(a, b) {
    return Percentage_$ctor_Z524259A4(Percentage__get_v(a) + Percentage__get_v(b));
}

export function Percentage_op_Subtraction_Z3F598920(a, b) {
    return Percentage_$ctor_Z524259A4(Percentage__get_v(a) - Percentage__get_v(b));
}

export function Percentage_op_Multiply_Z3F598920(a, b) {
    return Percentage_$ctor_Z524259A4(~(~((Percentage__get_v(a) * Percentage__get_v(b)) / 10000)));
}

export function Percentage_op_Multiply_631F3DCD(a, b) {
    return ~(~((Percentage__get_v(a) * b) / 100));
}

