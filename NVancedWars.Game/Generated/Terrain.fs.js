import { Union } from "../../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { union_type } from "../../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";
import { Percentage_from_Z37302880 } from "../Percentage.fs.js";
import { singleton } from "../../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/List.js";

export class TerrainType extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Road", "Building", "Bridge", "Plains", "Desert", "Forest", "Mountain", "River", "Ocean", "Reef", "Beach"];
    }
}

export function TerrainType$reflection() {
    return union_type("NVancedWars.Game.TerrainType", [], TerrainType, () => [[], [], [], [], [], [], [], [], [], [], []]);
}

export class MovementType extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Foot", "Tire", "Tread", "Ship", "Sub", "Air"];
    }
}

export function MovementType$reflection() {
    return union_type("NVancedWars.Game.MovementType", [], MovementType, () => [[], [], [], [], [], []]);
}

export function TerrainTypeModule_getSightCost(_arg) {
    switch (_arg.tag) {
        case 1: {
            return 3;
        }
        case 2: {
            return 1;
        }
        case 3: {
            return 2;
        }
        case 4: {
            return 1;
        }
        case 5: {
            return 3;
        }
        case 6: {
            return 4;
        }
        case 7: {
            return 2;
        }
        case 8: {
            return 1;
        }
        case 9: {
            return 1;
        }
        case 10: {
            return 1;
        }
        default: {
            return 1;
        }
    }
}

export function TerrainTypeModule_getDefenseModifier(_arg) {
    switch (_arg.tag) {
        case 1: {
            return Percentage_from_Z37302880(5, 10);
        }
        case 2: {
            return Percentage_from_Z37302880(0, 10);
        }
        case 3: {
            return Percentage_from_Z37302880(1, 10);
        }
        case 4: {
            return Percentage_from_Z37302880(1, 10);
        }
        case 5: {
            return Percentage_from_Z37302880(3, 10);
        }
        case 6: {
            return Percentage_from_Z37302880(4, 10);
        }
        case 7: {
            return Percentage_from_Z37302880(2, 10);
        }
        case 8: {
            return Percentage_from_Z37302880(1, 10);
        }
        case 9: {
            return Percentage_from_Z37302880(3, 10);
        }
        case 10: {
            return Percentage_from_Z37302880(0, 10);
        }
        default: {
            return Percentage_from_Z37302880(0, 10);
        }
    }
}

export const TerrainTypeModule_allTerrainTypes = singleton([new TerrainType(0, []), new TerrainType(1, []), new TerrainType(2, []), new TerrainType(3, []), new TerrainType(4, []), new TerrainType(5, []), new TerrainType(6, []), new TerrainType(7, []), new TerrainType(8, []), new TerrainType(9, []), new TerrainType(10, [])]);

export function TerrainTypeModule_getMoveCost(terrain, movement) {
    let matchResult;
    if (terrain.tag === 1) {
        if (movement.tag === 0) {
            matchResult = 4;
        }
        else if (movement.tag === 1) {
            matchResult = 5;
        }
        else if (movement.tag === 2) {
            matchResult = 6;
        }
        else if (movement.tag === 5) {
            matchResult = 7;
        }
        else {
            matchResult = 39;
        }
    }
    else if (terrain.tag === 2) {
        if (movement.tag === 0) {
            matchResult = 8;
        }
        else if (movement.tag === 1) {
            matchResult = 9;
        }
        else if (movement.tag === 2) {
            matchResult = 10;
        }
        else if (movement.tag === 5) {
            matchResult = 11;
        }
        else {
            matchResult = 39;
        }
    }
    else if (terrain.tag === 3) {
        if (movement.tag === 0) {
            matchResult = 12;
        }
        else if (movement.tag === 1) {
            matchResult = 13;
        }
        else if (movement.tag === 2) {
            matchResult = 14;
        }
        else if (movement.tag === 5) {
            matchResult = 15;
        }
        else {
            matchResult = 39;
        }
    }
    else if (terrain.tag === 4) {
        if (movement.tag === 0) {
            matchResult = 16;
        }
        else if (movement.tag === 1) {
            matchResult = 17;
        }
        else if (movement.tag === 2) {
            matchResult = 18;
        }
        else if (movement.tag === 5) {
            matchResult = 19;
        }
        else {
            matchResult = 39;
        }
    }
    else if (terrain.tag === 5) {
        if (movement.tag === 0) {
            matchResult = 20;
        }
        else if (movement.tag === 1) {
            matchResult = 21;
        }
        else if (movement.tag === 2) {
            matchResult = 22;
        }
        else if (movement.tag === 5) {
            matchResult = 23;
        }
        else {
            matchResult = 39;
        }
    }
    else if (terrain.tag === 6) {
        if (movement.tag === 0) {
            matchResult = 24;
        }
        else if (movement.tag === 5) {
            matchResult = 25;
        }
        else {
            matchResult = 39;
        }
    }
    else if (terrain.tag === 7) {
        if (movement.tag === 0) {
            matchResult = 26;
        }
        else if (movement.tag === 5) {
            matchResult = 27;
        }
        else {
            matchResult = 39;
        }
    }
    else if (terrain.tag === 8) {
        if (movement.tag === 3) {
            matchResult = 28;
        }
        else if (movement.tag === 4) {
            matchResult = 29;
        }
        else if (movement.tag === 5) {
            matchResult = 30;
        }
        else {
            matchResult = 39;
        }
    }
    else if (terrain.tag === 9) {
        if (movement.tag === 3) {
            matchResult = 31;
        }
        else if (movement.tag === 4) {
            matchResult = 32;
        }
        else if (movement.tag === 5) {
            matchResult = 33;
        }
        else {
            matchResult = 39;
        }
    }
    else if (terrain.tag === 10) {
        if (movement.tag === 0) {
            matchResult = 34;
        }
        else if (movement.tag === 1) {
            matchResult = 35;
        }
        else if (movement.tag === 2) {
            matchResult = 36;
        }
        else if (movement.tag === 3) {
            matchResult = 37;
        }
        else if (movement.tag === 5) {
            matchResult = 38;
        }
        else {
            matchResult = 39;
        }
    }
    else if (movement.tag === 0) {
        matchResult = 0;
    }
    else if (movement.tag === 1) {
        matchResult = 1;
    }
    else if (movement.tag === 2) {
        matchResult = 2;
    }
    else if (movement.tag === 5) {
        matchResult = 3;
    }
    else {
        matchResult = 39;
    }
    switch (matchResult) {
        case 0: {
            return 1;
        }
        case 1: {
            return 1;
        }
        case 2: {
            return 1;
        }
        case 3: {
            return 1;
        }
        case 4: {
            return 1;
        }
        case 5: {
            return 1;
        }
        case 6: {
            return 1;
        }
        case 7: {
            return 1;
        }
        case 8: {
            return 1;
        }
        case 9: {
            return 1;
        }
        case 10: {
            return 1;
        }
        case 11: {
            return 1;
        }
        case 12: {
            return 1;
        }
        case 13: {
            return 2;
        }
        case 14: {
            return 1;
        }
        case 15: {
            return 1;
        }
        case 16: {
            return 2;
        }
        case 17: {
            return 3;
        }
        case 18: {
            return 2;
        }
        case 19: {
            return 1;
        }
        case 20: {
            return 3;
        }
        case 21: {
            return 3;
        }
        case 22: {
            return 3;
        }
        case 23: {
            return 1;
        }
        case 24: {
            return 4;
        }
        case 25: {
            return 1;
        }
        case 26: {
            return 3;
        }
        case 27: {
            return 1;
        }
        case 28: {
            return 1;
        }
        case 29: {
            return 1;
        }
        case 30: {
            return 1;
        }
        case 31: {
            return 2;
        }
        case 32: {
            return 4;
        }
        case 33: {
            return 1;
        }
        case 34: {
            return 2;
        }
        case 35: {
            return 3;
        }
        case 36: {
            return 2;
        }
        case 37: {
            return 2;
        }
        case 38: {
            return 1;
        }
        case 39: {
            return void 0;
        }
    }
}

export const MovementTypeModule_allMovementTypes = singleton([new MovementType(0, []), new MovementType(1, []), new MovementType(2, []), new MovementType(3, []), new MovementType(4, []), new MovementType(5, [])]);

