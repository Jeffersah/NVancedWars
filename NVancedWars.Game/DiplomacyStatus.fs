namespace NVancedWars.Game

type DiplomacyStatus =
    | Enemy
    | Neutral
    | Allied


module DiplomacyStatus =
    let leastFriendly (a: DiplomacyStatus) (b: DiplomacyStatus) = min a b 
    let mostFriendly (a: DiplomacyStatus) (b: DiplomacyStatus) = max a b 
    
    let allowMoveThrough =
        function
        | Enemy
        | Neutral -> false
        | Allied -> true
        
    let allowSharedLos =
        function
        | Enemy
        | Neutral -> false
        | Allied -> true
    
    let allowAttack =
        function
        | Enemy -> true
        | Neutral
        | Allied -> false