namespace NVancedWars.Game

type UnitAttribute =
    | Capture
    | NoHide
    | Engineer
    | Reveal of int
    | Resist of int
    | Supply of int

type WeaponAttribute =
    | Indirect
    | NoAttackMove
    | CounterIndirect
    | CannotBeCountered
    | CannotCounter
    | Flare of int

type Attributes<'t> = 't list

module UnitAttribute =
    let caputure attribs = List.contains Capture attribs
    let noHide attribs = List.contains NoHide attribs
    let engineer attribs = List.contains Engineer attribs
    let reveal attribs = List.tryPick (function | Reveal x -> Some x | _ -> None) attribs
    let resist attribs = List.tryPick (function | Resist x -> Some x | _ -> None) attribs
    let supply attribs = List.tryPick (function | Supply x -> Some x | _ -> None) attribs

module WeaponAttribute =
    let indirect attribs = List.contains Indirect attribs
    let noAttackMove attribs = List.contains NoAttackMove attribs
    let counterIndirect attribs = List.contains CounterIndirect attribs
    let cannotBeCountered attribs = List.contains CannotBeCountered attribs
    let cannotCounter attribs = List.contains CannotCounter attribs
    let Flare attribs =  List.tryPick (function | Flare x -> Some x | _ -> None) attribs
