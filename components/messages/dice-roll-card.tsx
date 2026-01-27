import { Dices, CheckCircle2, XCircle } from "lucide-react"
import type { DiceResult } from "@/lib/types"

interface DiceRollCardProps {
  title: string
  diceResult: DiceResult
}

export function DiceRollCard({ title, diceResult }: DiceRollCardProps) {
  const { roll, modifier, total, success, dc } = diceResult
  const isCritical = roll === 20
  const isFumble = roll === 1

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2">
          <div className="flex items-center gap-2">
            <Dices className="h-4 w-4 text-dice" />
            <span className="text-sm font-medium text-card-foreground">{title}</span>
          </div>
          <span className="text-xs text-muted-foreground">DC {dc}</span>
        </div>

        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-mono text-sm text-muted-foreground">
              <span className={isCritical ? "text-success" : isFumble ? "text-destructive" : ""}>d20: {roll}</span>
              <span>+</span>
              <span>{modifier}</span>
            </div>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-card-foreground">{total}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {success ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-sm font-medium text-success">{isCritical ? "Critical!" : "Success"}</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-destructive" />
                <span className="text-sm font-medium text-destructive">{isFumble ? "Fumble!" : "Failed"}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
