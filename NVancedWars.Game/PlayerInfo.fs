namespace NVancedWars.Game

type PlayerInfo =
    {
        id: PlayerId
        displayName: string
        playerIndex: int
        colorIndex: int
        diplomacy: Map<PlayerId, DiplomacyStatus>
    }