module Main

open Feliz
open App
open Browser.Dom
open Elmish
open Elmish.Bridge
open NVancedWars.App.Elmish
open Elmish.React

let socket = 
    #if DEBUG
        sprintf "https://localhost:8080%s" (NVancedWars.Shared.Variables.endpoint)
    #else
        NVancedWars.Shared.Variables.endpoint
    #endif

Program.mkProgram init update view
|> Program.withBridge NVancedWars.Shared.Variables.endpoint
|> Program.withReactBatched "feliz-app"
|> Program.run