﻿// For more information see https://aka.ms/fsharp-console-apps
open FSharp.Data


let destination = "../../../../NVancedWars.Game/Generated"


let moveCosts = FSharp.Data.CsvFile.Load("./MoveCosts.csv")


let terrainColumn = moveCosts.GetColumnIndex("_TT")
let sightColumn = moveCosts.GetColumnIndex("_SIGHT")
let defenseColumn = moveCosts.GetColumnIndex("_DEFENSE")

let movementTypes = 
    moveCosts.Headers.Value
    |> Seq.filter (fun v -> v.StartsWith("_") |> not)
    |> Seq.map(fun name -> name, moveCosts.GetColumnIndex name)
    |> Array.ofSeq

let terrainTypes =
    moveCosts.Rows
    |> Seq.map(fun row -> row.GetColumn terrainColumn)
    |> Array.ofSeq


printfn "MOVEMENT TYPES: %s" (movementTypes |> Seq.map fst |> String.concat ", ")
printfn "TERRAIN TYPES: %s" (terrainTypes |> String.concat ", ")

let terrainFile = System.IO.Path.Combine(destination, "Terrain.fs")

printfn "Writing terrain file: %s" terrainFile

using (new System.IO.StreamWriter(new System.IO.FileStream(terrainFile, System.IO.FileMode.Create))) (fun writer ->
    let wrl (line: string) =
        writer.WriteLine (line)
        printfn "%s" line

    let wr (line: string) =
        writer.Write (line)
        printf "%s" line
        
    wrl "// AUTO GENERATED FILE //"
    wrl "// Do NOT edit this file manually //"
    wrl "// Run NVancedWars.CodeGen instead! //"

    wrl ("namespace NVancedWars.Game")
    wrl ("type TerrainType = ")
    for terrain in terrainTypes do
        wrl (sprintf "    | %s" terrain)

    wrl ""

    wrl "type MovementType = "
    for (moveType, _) in movementTypes do
        wrl (sprintf "    | %s" moveType)


    wrl "module TerrainType = "
    wrl "    let getSightCost = "
    wrl "        function"
    
    for row in moveCosts.Rows do
        wrl (sprintf "        | %s -> %i" (row.GetColumn terrainColumn)(row.GetColumn sightColumn |> int))

    
    wrl ""
    wrl "    let getDefenseModifier = "
    wrl "        function"
    for row in moveCosts.Rows do
        wrl (sprintf "        | %s -> Percentage.from(%i, 10)" (row.GetColumn terrainColumn) (row.GetColumn defenseColumn |> int))

    
    wrl ""
    wrl <| sprintf "    let allTerrainTypes = [ %s ]" (String.concat ", " (terrainTypes))

    wrl "    let getMoveCost terrain movement = "
    wrl "        match terrain, movement with"
    
    for row in moveCosts.Rows do
        let terrainMatch =
            row.GetColumn terrainColumn
        for (moveType, col) in movementTypes do
            match row.GetColumn col with
            | "0" 
            | "" ->
                ()
            | str ->
                let cost = int str
                wrl (sprintf "        | %s, %s -> Some %i" terrainMatch moveType cost)
    wrl (sprintf "        | _ -> None")

    
    wrl "module MovementType = "
    wrl <| sprintf "    let allMovementTypes = [ %s ]" (String.concat ", " (Seq.map fst movementTypes))

    ()
)



let dmgCsv = FSharp.Data.CsvFile.Load("./DamageCoeffs.csv")

let damageTypeColumn = dmgCsv.GetColumnIndex("_DAMAGE");
let armorTypes = 
    dmgCsv.Headers.Value
    |> Seq.filter (fun v -> v.StartsWith("_") |> not)
    |> Seq.map(fun name -> name, dmgCsv.GetColumnIndex name)
    |> Array.ofSeq

let damageTypes =
    dmgCsv.Rows
    |> Seq.map(fun row -> row.GetColumn damageTypeColumn)
    |> Array.ofSeq


printfn "ARMOR TYPES: %s" (armorTypes |> Seq.map fst |> String.concat ", ")
printfn "DAMAGE TYPES: %s" (damageTypes |> String.concat ", ")


let armorFile = System.IO.Path.Combine(destination, "ArmorDamage.fs")

printfn "Writing terrain file: %s" armorFile

using (new System.IO.StreamWriter(new System.IO.FileStream(armorFile, System.IO.FileMode.Create))) (fun writer ->
    let wrl (line: string) =
        writer.WriteLine (line)
        printfn "%s" line

    let wr (line: string) =
        writer.Write (line)
        printf "%s" line
        
    wrl "// AUTO GENERATED FILE //"
    wrl "// Do NOT edit this file manually //"
    wrl "// Run NVancedWars.CodeGen instead! //"

    wrl ("namespace NVancedWars.Game")
    wrl ("type DamageType = ")
    for dt in damageTypes do
        wrl (sprintf "    | %s" dt)

    wrl ""

    wrl "type ArmorType = "
    for (at, _) in armorTypes do
        wrl (sprintf "    | %s" at)


    wrl "module DamageType = "

    wrl "    let getDamageCoeff armor damage = "
    wrl "        match armor, damage with"
    
    for row in dmgCsv.Rows do
        let dmgName = row.GetColumn damageTypeColumn

        for (armorType, col) in armorTypes do
            match row.GetColumn col with
            | "" ->
                ()
            | str ->
                let cost = int str
                wrl (sprintf "        | %s, %s -> Percentage(%i)" armorType dmgName cost)
    wrl (sprintf "        | _ -> Percentage(0)")


    wrl <| sprintf "    let allDamageTypes = [ %s ]" (String.concat ", " damageTypes)
    
    wrl "module ArmorType = "
    wrl <| sprintf "    let allArmorTypes = [ %s ]" (String.concat ", " (Seq.map fst armorTypes))


    ()
)