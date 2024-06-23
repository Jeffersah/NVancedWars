namespace NVancedWars.App.Pages.Frame

open App.CommonComponents
open Feliz

type FrameComponents =

    [<ReactComponent>]
    static member HeaderRowButton (name: string, active: bool, activate: unit -> unit) =
        Html.div [
            prop.style [
                style.flexGrow 1
                style.textAlign.center
                style.border (1, borderStyle.solid, "black")
                style.padding 4
                style.custom ("background", "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)")
            ]
            prop.children [
                Html.h2 name
            ]
        ]

    [<ReactComponent>]
    static member Frame(username: string) =
        col [
            Html.div [
                prop.style [
                    style.display.flex
                    style.flexDirection.row
                    style.justifyContent.spaceBetween
                ]
                prop.children [
                    FrameComponents.HeaderRowButton("Games", false, ignore)
                    FrameComponents.HeaderRowButton("Lobbies", false, ignore)
                    FrameComponents.HeaderRowButton("Info", false, ignore)
                    FrameComponents.HeaderRowButton("Account", false, ignore)
                ]
            ]
        ]