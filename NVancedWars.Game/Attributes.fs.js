import { Union } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { union_type, int32_type } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";
import { tryPick, contains } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/List.js";
import { safeHash, equals } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Util.js";

export class UnitAttribute extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Capture", "NoHide", "Engineer", "Reveal", "Resist", "Supply"];
    }
}

export function UnitAttribute$reflection() {
    return union_type("NVancedWars.Game.UnitAttribute", [], UnitAttribute, () => [[], [], [], [["Item", int32_type]], [["Item", int32_type]], [["Item", int32_type]]]);
}

export class WeaponAttribute extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Indirect", "NoAttackMove", "CounterIndirect", "CannotBeCountered", "CannotCounter", "Flare"];
    }
}

export function WeaponAttribute$reflection() {
    return union_type("NVancedWars.Game.WeaponAttribute", [], WeaponAttribute, () => [[], [], [], [], [], [["Item", int32_type]]]);
}

export function UnitAttributeModule_caputure(attribs) {
    return contains(new UnitAttribute(0, []), attribs, {
        Equals: equals,
        GetHashCode: safeHash,
    });
}

export function UnitAttributeModule_noHide(attribs) {
    return contains(new UnitAttribute(1, []), attribs, {
        Equals: equals,
        GetHashCode: safeHash,
    });
}

export function UnitAttributeModule_engineer(attribs) {
    return contains(new UnitAttribute(2, []), attribs, {
        Equals: equals,
        GetHashCode: safeHash,
    });
}

export function UnitAttributeModule_reveal(attribs) {
    return tryPick((_arg) => ((_arg.tag === 3) ? _arg.fields[0] : (void 0)), attribs);
}

export function UnitAttributeModule_resist(attribs) {
    return tryPick((_arg) => ((_arg.tag === 4) ? _arg.fields[0] : (void 0)), attribs);
}

export function UnitAttributeModule_supply(attribs) {
    return tryPick((_arg) => ((_arg.tag === 5) ? _arg.fields[0] : (void 0)), attribs);
}

export function WeaponAttributeModule_indirect(attribs) {
    return contains(new WeaponAttribute(0, []), attribs, {
        Equals: equals,
        GetHashCode: safeHash,
    });
}

export function WeaponAttributeModule_noAttackMove(attribs) {
    return contains(new WeaponAttribute(1, []), attribs, {
        Equals: equals,
        GetHashCode: safeHash,
    });
}

export function WeaponAttributeModule_counterIndirect(attribs) {
    return contains(new WeaponAttribute(2, []), attribs, {
        Equals: equals,
        GetHashCode: safeHash,
    });
}

export function WeaponAttributeModule_cannotBeCountered(attribs) {
    return contains(new WeaponAttribute(3, []), attribs, {
        Equals: equals,
        GetHashCode: safeHash,
    });
}

export function WeaponAttributeModule_cannotCounter(attribs) {
    return contains(new WeaponAttribute(4, []), attribs, {
        Equals: equals,
        GetHashCode: safeHash,
    });
}

export function WeaponAttributeModule_Flare(attribs) {
    return tryPick((_arg) => ((_arg.tag === 5) ? _arg.fields[0] : (void 0)), attribs);
}

