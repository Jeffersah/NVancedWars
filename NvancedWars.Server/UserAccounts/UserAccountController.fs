namespace NVancedWars.Server.UserAccounts

open NVancedWars.Shared

type UserAccountController(persist: NVancedWars.Server.UserAccounts.UserAccountPersist, accounts: UserAccountRecord list) =

    let rng = RngHelper.createRng( )

    let mutable accountsById =    
        accounts
        |> List.fold (fun map record -> Map.add record.uid record map) Map.empty

    let mutable accountsByUsername =
        accounts
        |> List.fold (fun map record -> Map.add record.username record map) Map.empty

    
    let mutable accountsByToken =
        accounts
        |> List.fold (fun map record -> record.tokens |> Seq.fold (fun map { token = token } -> Map.add token record map) map) Map.empty

    let mutable saveTask = System.Threading.Tasks.Task.FromResult ()

    let hash (content: string) (salt: string) = 
        let enc = System.Text.Encoding.UTF8
        let contentLen = enc.GetByteCount(content)
        let saltLen = enc.GetByteCount(salt)
        let asArray = Array.init ( contentLen + saltLen ) (fun _ -> 0uy)
        ignore <| enc.GetBytes(content, 0, content.Length, asArray, 0)
        ignore <| enc.GetBytes(salt, 0, salt.Length, asArray, contentLen)
        use crypto = System.Security.Cryptography.SHA256.Create()
        let transformed = crypto.TransformFinalBlock (asArray, 0, asArray.Length)
        System.Convert.ToBase64String(transformed)

    let save(record: UserAccountRecord) =
        accountsById <- Map.add record.uid record accountsById
        accountsByUsername <- Map.add record.username record accountsByUsername
        accountsByToken <- record.tokens |> List.fold (fun map { token = token } -> Map.add token record map) accountsByToken
        let oldTask = saveTask
        saveTask <- Async.StartAsTask (async {
            do! Async.AwaitTask oldTask
            do! persist.save (accountsByUsername |> Map.values |> List.ofSeq)
        })

    member this.IssueToken (): IssuedToken =
        let tokenId = PlayerToken(RngHelper.generateString rng 128)
        {
            token = tokenId
            issued = System.DateTime.Now
            expires = System.DateTime.Now + System.TimeSpan.FromDays 7
        }

    member this.RegisterAccount(username: string, password: string) =
        let salt = RngHelper.generateString rng 128
        let pwdHash = hash password salt
        let token = this.IssueToken()
        lock this (fun () ->
            match Map.tryFind username accountsByUsername with
            | Some _ -> 
                Error "Username is already in use"
            | None ->   
                let record = {
                    uid= System.Guid.NewGuid()
                    username = username
                    hashedPassword = pwdHash
                    salt = salt
                    tokens = [ token ]
                }
                save record
                Ok(token.token)
        )

    member this.Login(username: string, password: string) =
        match Map.tryFind username accountsByUsername with
        | None -> Error "Incorrect username or password"
        | Some account ->
            let hashed = hash password account.salt
            if hashed = account.hashedPassword then
                let token = this.IssueToken()
                lock this (fun () ->
                    let tokens = token::account.tokens |> Extensions.List.takeAtMost 16
                    let updated = {account with tokens = tokens}
                    save updated
                    Ok(token)
                )
            else Error "Incorrect username or password"

    member this.LoginByToken(token: PlayerToken) =
        match Map.tryFind token accountsByToken with
        | None -> Error "Invalid Token"
        | Some account ->
            Ok(account.username)


    static member init persist = async {
        let! content = persist.load ()
        return UserAccountController(persist, content)
    }