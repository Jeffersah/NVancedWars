module Main

open Feliz
open App
open Browser.Dom
open Elmish
open Elmish.Bridge
open NVancedWars.App.Elmish
open Elmish.React

let USE_REAL_SERVER = false

let socket = 
    NVancedWars.Shared.Variables.endpoint

let program =
    let program = Program.mkProgram init (update USE_REAL_SERVER) view
    if USE_REAL_SERVER then
        program |> Program.withBridge NVancedWars.Shared.Variables.endpoint
    else 
        program

program
|> Program.withReactBatched "feliz-app"
|> Program.run