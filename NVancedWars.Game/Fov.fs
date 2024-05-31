namespace NVancedWars.Game

type FovState =
    | BlackMap
    | Hidden
    | Visible
    | Revealed

type Fov = Fov of Map<Point, FovState>

module Fov =

    let getCell pt (Fov fov) =
        Map.tryFind pt fov
        |> Option.defaultValue Hidden

    let markVisible pt (Fov fov) =
        Fov <| Map.add pt Visible fov

    let markRevealed pt (Fov fov) =
        Fov <| Map.add pt Revealed fov