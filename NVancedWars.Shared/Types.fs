namespace NVancedWars.Shared

open Elmish.Bridge

type GameId = GameId of string
type PlayerToken = PlayerToken of string



type LoginRequest = { user: string; password: string }

type AccountCommands =
    | Register of LoginRequest * IReplyChannel<Result<PlayerToken, string>>
    | Login of LoginRequest * IReplyChannel<PlayerToken option>
    | AutoLogin of PlayerToken * IReplyChannel<string option> // Returns username
    | ChangePassword of string * string * IReplyChannel<PlayerToken option> // Old, New


type MsgToServer = 
    | Account of AccountCommands


