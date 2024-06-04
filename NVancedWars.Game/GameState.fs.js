import { Record } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { UnitId, UnitId$reflection, PlayerId$reflection } from "./Ids.fs.js";
import { PlayerInfo$reflection } from "./PlayerInfo.fs.js";
import { Fov$reflection } from "./Fov.fs.js";
import { class_type, record_type } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";
import { Point$reflection } from "./Point.fs.js";
import { Terrain$reflection } from "./Terrain.fs.js";
import { GameRules$reflection } from "./GameRules.fs.js";
import { ConstData$reflection } from "./ConstData.fs.js";
import { UnitState, UnitPosition, UnitState$reflection } from "./UnitState.fs.js";
import { GuidModule_create } from "./Guid.fs.js";
import { remove, add, ofSeq } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Map.js";
import { choose } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Seq.js";
import { compare } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Util.js";

export class PlayerState extends Record {
    "constructor"(id, info, fov) {
        super();
        this.id = id;
        this.info = info;
        this.fov = fov;
    }
}

export function PlayerState$reflection() {
    return record_type("NVancedWars.Game.PlayerState", [], PlayerState, () => [["id", PlayerId$reflection()], ["info", PlayerInfo$reflection()], ["fov", Fov$reflection()]]);
}

export class GameState extends Record {
    "constructor"(players, world, rules, data, units) {
        super();
        this.players = players;
        this.world = world;
        this.rules = rules;
        this.data = data;
        this.units = units;
    }
}

export function GameState$reflection() {
    return record_type("NVancedWars.Game.GameState", [], GameState, () => [["players", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [PlayerId$reflection(), PlayerState$reflection()])], ["world", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [Point$reflection(), Terrain$reflection()])], ["rules", GameRules$reflection()], ["data", ConstData$reflection()], ["units", class_type("Microsoft.FSharp.Collections.FSharpMap`2", [UnitId$reflection(), UnitState$reflection()])]]);
}

export function GameStateModule_createUnit(position, unitInfo, owner, gs) {
    const unit = new UnitState(owner, new UnitId(0, [GuidModule_create()]), unitInfo, unitInfo.hp, ofSeq(choose((kvp) => {
        const matchValue = kvp[1].ammo;
        if (matchValue != null) {
            return [kvp[0], matchValue];
        }
        else {
            return void 0;
        }
    }, unitInfo.weapons), {
        Compare: compare,
    }), new UnitPosition(1, [position]));
    return new GameState(gs.players, gs.world, gs.rules, gs.data, add(unit.id, unit, gs.units));
}

export function GameStateModule_destroyUnit(id, gs) {
    return new GameState(gs.players, gs.world, gs.rules, gs.data, remove(id, gs.units));
}

