namespace NVancedWars.Game

open System.Runtime.CompilerServices

[<Struct; IsReadOnly; CustomComparison; CustomEquality>]
type Percentage(_v: int) =
    member _.v = _v
    
    static member from(current: int, max: int) =
        Percentage(current * 100 / max)

    static member (+) (a: Percentage, b: Percentage) = Percentage(a.v + b.v)
    static member (-) (a: Percentage, b: Percentage) = Percentage(a.v - b.v)
    static member (*) (a: Percentage, b: Percentage) = Percentage((a.v * b.v) / 10000)
    
    override this.Equals(obj: obj) =
        match obj with
        | :? Percentage as other when other.v = this.v ->
            true
        | _ ->
            false

    override this.GetHashCode() =
        _v

    interface System.IComparable<Percentage> with
        member this.CompareTo(other: Percentage) =
            _v.CompareTo(other.v)

    interface System.IComparable with
        member this.CompareTo(obj: obj) =
            match obj with
            | :? Percentage as other ->
                (this :> System.IComparable<Percentage>).CompareTo(other)
            | _ -> 
                failwithf "Can't compare percentage to %A" obj