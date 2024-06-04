namespace NVancedWars.Game

open System.Runtime.CompilerServices

type CardinalDirection =
    | Up
    | Down
    | Left
    | Right

[<Struct; IsReadOnly; CustomComparison; CustomEquality>]
type Point(_x: int, _y: int) =
    member _.x = _x
    member _.y = _y

    static member manhattanLength (a: Point) = abs(a.x) + abs(a.y)
    
    static member (+) (a: Point, b: Point) = Point(a.x + b.x, a.y + b.y)
    static member (-) (a: Point, b: Point) = Point(a.x - b.x, a.y - b.y)
    static member (~-) (a: Point) = Point(-a.x, -a.y)
    
    static member (*) (a: Point, s: int) = new Point(a.x * s, a.y * s)
    static member (*) (s: int, a: Point) = new Point(a.x * s, a.y * s)
    
    static member getX (a: Point) = a.x
    static member getY (a: Point) = a.y
    
    static member setX (x: int) (a: Point) = new Point(x, a.y)
    static member setY (y: int) (a: Point) = new Point(a.x, y)

    static member updateX (f: int -> int) (a: Point) = new Point(f a.x, a.y)
    static member updateY (f: int -> int) (a: Point) = new Point(a.x, f a.y)

    static member map fn (a: Point) = new Point(fn a.x, fn a.y)

    static member fromTuple (x: int, y: int) = new Point (x, y)
    static member from x y = new Point(x, y)

    static member cardinalNeighbors pt = Point.cardinal |> List.map((+)pt)

    static member fromDirection dir =
        match dir with
        | Up -> Point(0, -1)
        | Down -> Point(0, 1)
        | Left -> Point(-1, 0)
        | Right -> Point(1, 0)

    static member nearestCardinalDirection (pt: Point) =
        if abs(pt.x) >= abs(pt.y) then
            if pt.x < 0 then Left else Right
        else
            if pt.y < 0 then Up else Down

    static member cardinal = [
        Point(1, 0)
        Point(0, 1)
        Point(-1, 0)
        Point(0, -1)
    ]

    override this.Equals(obj: obj) =
        match obj with
        | :? Point as other when other.x = this.x && other.y = this.y ->
            true
        | _ ->
            false

    override this.GetHashCode() =
        #if FABLE_COMPILER
            this.x ^^^ ~~~(this.y <<< 1)
        #else
            System.HashCode.Combine(this.x, this.y);
        #endif

    interface System.IComparable<Point> with
        member this.CompareTo(other: Point) =
            let icmp a b =
                sign (a - b)

            match icmp this.x other.x with
            | v when v < 0 -> v
            | v when v > 0 -> v
            | _ -> icmp this.y other.y

    interface System.IComparable with
        member this.CompareTo(obj: obj) =
            match obj with
            | :? Point as other ->
                (this :> System.IComparable<Point>).CompareTo(other)
            | _ -> 
                failwithf "Can't compare point to %A" obj

module CardinalDirection =
    let opposite dir =
        match dir with
        | Up -> Down
        | Down -> Up
        | Left -> Right
        | Right -> Left