namespace App

open Feliz
open Feliz.Router
type LoginComponents() =

    [<ReactComponent>]
    static member LoginOrRegister(disable, showError, dispatchLogin: (string* string) -> unit, dispatchRegister: (string* string) -> unit) =
        let isRegister, setIsRegister = React.useState false
        if isRegister then
            LoginComponents.RegisterForm (disable, showError, dispatchRegister, setIsRegister)
        else
            LoginComponents.LoginForm (disable, showError, dispatchLogin, setIsRegister)

    [<ReactComponent>]
    static member LoginForm(disable, showError, dispatch: (string * string) -> unit, setRegister) =
        let usernameInput, setUsernameInput = 
            React.useState ""

        let pwdInput, setPwdInput = 
            React.useState ""

        Html.div [
            prop.className "fullScreen"
            prop.style [
                style.backgroundColor "#112"
            ]
            prop.children [
                Html.div [
                    prop.className [ "flex-col" ]
                    prop.style [
                        style.width 750
                        style.margin.auto
                        style.backgroundColor "#2A2A30"
                        style.justifyContent.stretch
                        style.padding (0, 12)
                    ]
                    prop.children [
                        Html.div [
                            prop.className "flex-row"
                            prop.style [ style.alignItems.baseline ]
                            prop.children [
                                Html.h1 [
                                    prop.text "Login"
                                    prop.style [ style.flexGrow 1 ]
                                ]
                                Html.div [
                                    Html.span "No Account? "
                                    Html.a [
                                        prop.text "Register"
                                        prop.href "#"
                                        prop.onClick (fun _ -> setRegister true)
                                    ]
                                ]
                            ]
                        ]
                        CommonComponents.row [
                            Html.div [ prop.text "Username"; prop.style [ style.width (length.em 6)] ]
                            Html.input [
                                prop.disabled disable
                                prop.type'.text
                                prop.value usernameInput
                                prop.onChange setUsernameInput
                                prop.style [
                                    style.flexGrow 1
                                ]
                            ]
                        ]
                        CommonComponents.row [
                            Html.div [ prop.text "Password"; prop.style [ style.width (length.em 6)] ]
                            Html.input [
                                prop.disabled disable
                                prop.type'.password
                                prop.value pwdInput
                                prop.onChange setPwdInput
                                prop.style [
                                    style.flexGrow 1
                                ]
                            ]
                        ]


                        
                        Html.button [
                            prop.style [
                                style.marginTop 12
                            ]
                            prop.disabled disable
                            prop.text "Submit"
                            prop.onClick (fun _ -> dispatch(usernameInput, pwdInput))
                        ]
                        
                        if showError then
                            Html.div [
                                prop.text "Login failed - Check your username and password"
                                prop.style [ style.color "red"; style.fontStyle.italic ]
                            ]
                    ]
                ]    
            ]
        ]

    [<ReactComponent>]
    static member RegisterForm(disable, showError, dispatch: (string * string) -> unit, setRegister) =
        let usernameInput, setUsernameInput = 
            React.useState ""
            
        let pwdInput, setPwdInput = 
            React.useState ""
        
        let pwdInput2, setPwdInput2 = 
            React.useState ""

        let verify pwd pwd2 =
            if String.length pwd < 4 then 
                Error "Password should probably be longer than 3 characters."
            else if pwd <> pwd2 then
                Error "Passwords don't match"
            else
                Ok pwd

        let pwdVerify = React.useMemo ((fun _ -> verify pwdInput pwdInput2), [| pwdInput; pwdInput2 |])

        Html.div [
            prop.className "fullScreen"
            prop.style [
                style.backgroundColor "#112"
            ]
            prop.children [
                Html.div [
                    prop.className [ "flex-col" ]
                    prop.style [
                        style.width 750
                        style.margin.auto
                        style.backgroundColor "#2A2A30"
                        style.justifyContent.stretch
                        style.padding (0, 12)
                    ]
                    prop.children [
                        Html.div [
                            prop.className "flex-row"
                            prop.style [ style.alignItems.baseline ]
                            prop.children [
                                Html.h1 [
                                    prop.text "Register"
                                    prop.style [ style.flexGrow 1 ]
                                ]
                                Html.div [
                                    Html.span "Have an account? "
                                    Html.a [
                                        prop.text "Login"
                                        prop.href "#"
                                        prop.onClick (fun _ -> setRegister false)
                                    ]
                                ]
                            ]
                        ]
                        CommonComponents.row [
                            Html.div [ prop.text "Username"; prop.style [ style.width (length.em 6)] ]
                            Html.input [
                                prop.disabled disable
                                prop.type'.text
                                prop.value usernameInput
                                prop.onChange setUsernameInput
                                prop.style [
                                    style.flexGrow 1
                                ]
                            ]
                        ]
                        CommonComponents.row [
                            Html.div [ prop.text "Password"; prop.style [ style.width (length.em 6)] ]
                            Html.input [
                                prop.disabled disable
                                prop.type'.password
                                prop.value pwdInput
                                prop.onChange setPwdInput
                                prop.style [
                                    style.flexGrow 1
                                ]
                            ]
                        ]
                        
                        CommonComponents.row [
                            Html.div [ prop.text "Re-Enter Password"; prop.style [ style.width (length.em 6)] ]
                            Html.input [
                                prop.disabled disable
                                prop.type'.password
                                prop.value pwdInput2
                                prop.onChange setPwdInput2
                                prop.style [
                                    style.flexGrow 1
                                ]
                            ]
                        ]
                        
                        
                        match pwdVerify with
                        | Error message ->
                            Html.div [
                                prop.style [
                                    style.marginTop 12
                                ]
                                prop.text (sprintf "%s" message)
                                prop.style [ style.color "red"; style.fontStyle.italic ]
                            ]
                        | Ok pwdOk ->
                            Html.button [
                                prop.style [
                                    style.marginTop 12
                                ]
                                prop.disabled disable
                                prop.text "Submit"
                                prop.onClick (fun _ -> dispatch(usernameInput, pwdOk))
                            ]

                        if showError then
                            Html.div [
                                prop.text "Register failed - likely that username is already in use. Try another!"
                                prop.style [ style.color "red"; style.fontStyle.italic ]
                            ]

                        Html.div [
                                prop.style [
                                    style.marginTop 12
                                ]
                                prop.text ("Hey! Don't use a password you care about. I'm not putting a lot of effort into cybersecurity.")
                                prop.style [ style.color "#AAA"; style.fontStyle.italic ]
                            ]
                    ]
                ]    
            ]
        ]