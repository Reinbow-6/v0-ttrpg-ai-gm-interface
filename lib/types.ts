export interface DiceResult {
  roll: number
  modifier: number
  total: number
  success: boolean
  dc: number
}

export interface Message {
  id: string
  type: "user" | "gm" | "system"
  content: string
  diceResult?: DiceResult
}
