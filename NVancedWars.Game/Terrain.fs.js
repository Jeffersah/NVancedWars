import { Record } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Types.js";
import { TerrainTypeModule_getMoveCost, TerrainType$reflection } from "./Generated/Terrain.fs.js";
import { record_type, option_type, int32_type } from "../NVancedWars.UI/src/fable_modules/fable-library.4.0.1/Reflection.js";
import { BuildingInfo$reflection } from "./UnitInfo.fs.js";

export class Terrain extends Record {
    "constructor"(terrainType, variant, building) {
        super();
        this.terrainType = terrainType;
        this.variant = (variant | 0);
        this.building = building;
    }
}

export function Terrain$reflection() {
    return record_type("NVancedWars.Game.Terrain", [], Terrain, () => [["terrainType", TerrainType$reflection()], ["variant", int32_type], ["building", option_type(BuildingInfo$reflection())]]);
}

export function TerrainModule_getMoveCost(terrain, moveType) {
    return TerrainTypeModule_getMoveCost(terrain.terrainType, moveType);
}

