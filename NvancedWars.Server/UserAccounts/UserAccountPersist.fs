namespace NVancedWars.Server.UserAccounts

open NVancedWars.Shared

type IssuedToken = {
    token: PlayerToken
    issued: System.DateTime
    expires: System.DateTime
}

type UserAccountRecord = {
    uid: System.Guid

    username: string
    salt: string
    hashedPassword: string

    tokens: IssuedToken list
}


type UserAccountPersist = 
    { 
        load: unit -> UserAccountRecord list Async
        save: UserAccountRecord list -> unit Async
    }

module Persist =

    let toBinaryFile path = 
        if(not<|System.IO.File.Exists path) then
            use binaryWriter = new System.IO.BinaryWriter(new System.IO.FileStream(path, System.IO.FileMode.OpenOrCreate, System.IO.FileAccess.ReadWrite, System.IO.FileShare.ReadWrite))
            binaryWriter.Write(0)
        else
            ()
        let load () = async {
            use binaryReader = new System.IO.BinaryReader(new System.IO.FileStream(path, System.IO.FileMode.OpenOrCreate, System.IO.FileAccess.ReadWrite, System.IO.FileShare.ReadWrite))
            let numberOfRecords = binaryReader.ReadInt32()

            let rec readAllTokens (tokensLeft: byte) acc =
                if tokensLeft = 0uy then acc
                else
                    let tokenStr = PlayerToken <| binaryReader.ReadString()
                    let issued = System.DateTime(binaryReader.ReadInt64 ())
                    let expires = System.DateTime(binaryReader.ReadInt64 ())
                    let acc = 
                        if expires >= System.DateTime.Now then
                            { token = tokenStr; issued = issued; expires = expires }::acc
                        else
                            acc
                    readAllTokens (byte (tokensLeft - 1uy)) acc

            let rec readAll recordsLeft acc = 
                if recordsLeft = 0 then acc
                else
                    let uid = System.Guid.Parse(binaryReader.ReadString ())
                    let username = binaryReader.ReadString()
                    let salt = binaryReader.ReadString()
                    let hashedPassword = binaryReader.ReadString()
                    let numberOfTokens = binaryReader.ReadByte()
                    let tokens = readAllTokens numberOfTokens []

                    {
                        uid = uid
                        username = username
                        salt = salt
                        hashedPassword = hashedPassword
                        tokens = tokens
                    }::acc
                    |> readAll (recordsLeft - 1)

            return readAll numberOfRecords []
        }
        let save (items: UserAccountRecord list) = async { 
            use binaryWriter = new System.IO.BinaryWriter(new System.IO.FileStream(path, System.IO.FileMode.OpenOrCreate, System.IO.FileAccess.ReadWrite, System.IO.FileShare.ReadWrite))
            let count = List.length items
            
            let rec saveTokens(tokens: IssuedToken list) =
                match tokens with
                | [] -> ()
                | { token = PlayerToken (token); issued = issued; expires = expires }::tokens ->
                    binaryWriter.Write(token)
                    binaryWriter.Write(issued.Ticks)
                    binaryWriter.Write(expires.Ticks)
                    saveTokens tokens

            let rec saveAll (records: UserAccountRecord list) =
                match records with
                | [] -> 
                    ()
                | record::records ->
                    binaryWriter.Write(record.uid.ToString())
                    binaryWriter.Write(record.username)
                    binaryWriter.Write(record.salt)
                    binaryWriter.Write(record.hashedPassword)
                    binaryWriter.Write(byte <| List.length record.tokens)
                    saveTokens record.tokens
                    saveAll records
            binaryWriter.Write(count)
            return saveAll items
        }

        {
            load = load
            save = save
        }