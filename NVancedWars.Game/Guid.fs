namespace NVancedWars.Game

type Guid = System.Guid

module Guid =
    let create () = System.Guid.NewGuid()