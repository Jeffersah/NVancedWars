import { Union } from "../../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { union_type } from "../../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";
import { Percentage_$ctor_Z524259A4 } from "../Percentage.fs.js";
import { singleton } from "../../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/List.js";

export class DamageType extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Rifle", "Cannon", "APHE", "HE", "Grenade", "HighVelocity", "Bomb", "Special"];
    }
}

export function DamageType$reflection() {
    return union_type("NVancedWars.Game.DamageType", [], DamageType, () => [[], [], [], [], [], [], [], []]);
}

export class ArmorType extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Unarmored", "Light", "Tank", "Heavy", "Air", "Ship"];
    }
}

export function ArmorType$reflection() {
    return union_type("NVancedWars.Game.ArmorType", [], ArmorType, () => [[], [], [], [], [], []]);
}

export function DamageTypeModule_getDamageCoeff(armor, damage) {
    if (armor.tag === 1) {
        if (damage.tag === 1) {
            return Percentage_$ctor_Z524259A4(120);
        }
        else if (damage.tag === 2) {
            return Percentage_$ctor_Z524259A4(80);
        }
        else if (damage.tag === 3) {
            return Percentage_$ctor_Z524259A4(100);
        }
        else if (damage.tag === 4) {
            return Percentage_$ctor_Z524259A4(80);
        }
        else if (damage.tag === 5) {
            return Percentage_$ctor_Z524259A4(60);
        }
        else if (damage.tag === 6) {
            return Percentage_$ctor_Z524259A4(100);
        }
        else if (damage.tag === 7) {
            return Percentage_$ctor_Z524259A4(100);
        }
        else {
            return Percentage_$ctor_Z524259A4(80);
        }
    }
    else if (armor.tag === 2) {
        if (damage.tag === 1) {
            return Percentage_$ctor_Z524259A4(60);
        }
        else if (damage.tag === 2) {
            return Percentage_$ctor_Z524259A4(100);
        }
        else if (damage.tag === 3) {
            return Percentage_$ctor_Z524259A4(60);
        }
        else if (damage.tag === 4) {
            return Percentage_$ctor_Z524259A4(20);
        }
        else if (damage.tag === 5) {
            return Percentage_$ctor_Z524259A4(100);
        }
        else if (damage.tag === 6) {
            return Percentage_$ctor_Z524259A4(100);
        }
        else if (damage.tag === 7) {
            return Percentage_$ctor_Z524259A4(100);
        }
        else {
            return Percentage_$ctor_Z524259A4(30);
        }
    }
    else if (armor.tag === 3) {
        if (damage.tag === 1) {
            return Percentage_$ctor_Z524259A4(40);
        }
        else if (damage.tag === 2) {
            return Percentage_$ctor_Z524259A4(80);
        }
        else if (damage.tag === 3) {
            return Percentage_$ctor_Z524259A4(20);
        }
        else if (damage.tag === 4) {
            return Percentage_$ctor_Z524259A4(20);
        }
        else if (damage.tag === 5) {
            return Percentage_$ctor_Z524259A4(100);
        }
        else if (damage.tag === 6) {
            return Percentage_$ctor_Z524259A4(100);
        }
        else if (damage.tag === 7) {
            return Percentage_$ctor_Z524259A4(100);
        }
        else {
            return Percentage_$ctor_Z524259A4(20);
        }
    }
    else if (armor.tag === 4) {
        if (damage.tag === 1) {
            return Percentage_$ctor_Z524259A4(100);
        }
        else if (damage.tag === 2) {
            return Percentage_$ctor_Z524259A4(20);
        }
        else if (damage.tag === 3) {
            return Percentage_$ctor_Z524259A4(100);
        }
        else if (damage.tag === 4) {
            return Percentage_$ctor_Z524259A4(20);
        }
        else if (damage.tag === 5) {
            return Percentage_$ctor_Z524259A4(80);
        }
        else if (damage.tag === 6) {
            return Percentage_$ctor_Z524259A4(20);
        }
        else if (damage.tag === 7) {
            return Percentage_$ctor_Z524259A4(100);
        }
        else {
            return Percentage_$ctor_Z524259A4(80);
        }
    }
    else if (armor.tag === 5) {
        if (damage.tag === 1) {
            return Percentage_$ctor_Z524259A4(60);
        }
        else if (damage.tag === 2) {
            return Percentage_$ctor_Z524259A4(80);
        }
        else if (damage.tag === 3) {
            return Percentage_$ctor_Z524259A4(100);
        }
        else if (damage.tag === 4) {
            return Percentage_$ctor_Z524259A4(20);
        }
        else if (damage.tag === 5) {
            return Percentage_$ctor_Z524259A4(60);
        }
        else if (damage.tag === 6) {
            return Percentage_$ctor_Z524259A4(100);
        }
        else if (damage.tag === 7) {
            return Percentage_$ctor_Z524259A4(100);
        }
        else {
            return Percentage_$ctor_Z524259A4(30);
        }
    }
    else if (damage.tag === 1) {
        return Percentage_$ctor_Z524259A4(100);
    }
    else if (damage.tag === 2) {
        return Percentage_$ctor_Z524259A4(40);
    }
    else if (damage.tag === 3) {
        return Percentage_$ctor_Z524259A4(120);
    }
    else if (damage.tag === 4) {
        return Percentage_$ctor_Z524259A4(100);
    }
    else if (damage.tag === 5) {
        return Percentage_$ctor_Z524259A4(20);
    }
    else if (damage.tag === 6) {
        return Percentage_$ctor_Z524259A4(100);
    }
    else if (damage.tag === 7) {
        return Percentage_$ctor_Z524259A4(100);
    }
    else {
        return Percentage_$ctor_Z524259A4(100);
    }
}

export const DamageTypeModule_allDamageTypes = singleton([new DamageType(0, []), new DamageType(1, []), new DamageType(2, []), new DamageType(3, []), new DamageType(4, []), new DamageType(5, []), new DamageType(6, []), new DamageType(7, [])]);

export const ArmorTypeModule_allArmorTypes = singleton([new ArmorType(0, []), new ArmorType(1, []), new ArmorType(2, []), new ArmorType(3, []), new ArmorType(4, []), new ArmorType(5, [])]);

