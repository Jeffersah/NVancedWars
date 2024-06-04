module App.CommonComponents

open Fable.React
open Feliz



let row (children: ReactElement seq) =
    Html.div [
        prop.className "flex-row"
        prop.children children
    ]
let col (children: ReactElement seq) = 
    Html.div [
        prop.className "flex-col"
        prop.children children
    ]