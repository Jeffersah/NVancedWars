namespace NVancedWars.Game

type PlayerState = {
    id: PlayerId    
    info: PlayerInfo
    fov: Fov
}


type GameState = {
    players: Map<PlayerId, PlayerState>

    world: Map<Point, Terrain>
    rules: GameRules
    data: ConstData

    units: Map<UnitId, UnitState>
}


module GameState =
    let createUnit position unitInfo (owner: PlayerId) (gs: GameState) =
        let unit = 
            {
                owner = owner
                id = UnitId (Guid.create ())
                info = unitInfo
                hp = unitInfo.hp
                ammo =
                    unitInfo.weapons
                    |> Seq.choose (fun kvp -> match kvp.Value.ammo with | None -> None | Some ammo -> Some (kvp.Key, ammo))
                    |> Map.ofSeq
                position = OnMap position
            }
        {
            gs with
                units = Map.add unit.id unit gs.units
                
        }

    let destroyUnit id (gs: GameState) =
        { gs with units = Map.remove id gs.units }