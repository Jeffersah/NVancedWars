namespace NVancedWars.Game

type Terrain =
    {
        terrainType: TerrainType
        variant: int

        building: BuildingInfo option
    }

module Terrain =
    let getMoveCost terrain moveType =
        TerrainType.getMoveCost terrain.terrainType moveType
        