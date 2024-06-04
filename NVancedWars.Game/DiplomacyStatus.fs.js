import { Union } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { union_type } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";
import { max, compare, min } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Util.js";

export class DiplomacyStatus extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Enemy", "Neutral", "Allied"];
    }
}

export function DiplomacyStatus$reflection() {
    return union_type("NVancedWars.Game.DiplomacyStatus", [], DiplomacyStatus, () => [[], [], []]);
}

export function DiplomacyStatusModule_leastFriendly(a, b) {
    return min(compare, a, b);
}

export function DiplomacyStatusModule_mostFriendly(a, b) {
    return max(compare, a, b);
}

export function DiplomacyStatusModule_allowMoveThrough(_arg) {
    switch (_arg.tag) {
        case 1: {
            return false;
        }
        case 2: {
            return true;
        }
        default: {
            return false;
        }
    }
}

export function DiplomacyStatusModule_allowSharedLos(_arg) {
    switch (_arg.tag) {
        case 1: {
            return false;
        }
        case 2: {
            return true;
        }
        default: {
            return false;
        }
    }
}

export function DiplomacyStatusModule_allowAttack(_arg) {
    switch (_arg.tag) {
        case 1:
        case 2: {
            return false;
        }
        default: {
            return true;
        }
    }
}

