"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Dices } from "lucide-react"

interface MessageInputProps {
  onSendMessage: (content: string) => void
  onRollDice: () => void
}

export function MessageInput({ onSendMessage, onRollDice }: MessageInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input.trim())
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <footer className="border-t border-border bg-background p-4">
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl items-end gap-2">
        <div className="relative flex-1">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What do you do next?"
            className="min-h-[52px] resize-none bg-input pr-12 text-foreground placeholder:text-muted-foreground"
            rows={1}
          />
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onRollDice}
          className="h-[52px] w-[52px] shrink-0 border-border bg-secondary text-foreground hover:bg-dice hover:text-dice-foreground"
          title="Roll dice"
        >
          <Dices className="h-5 w-5" />
          <span className="sr-only">Roll dice</span>
        </Button>

        <Button
          type="submit"
          size="icon"
          className="h-[52px] w-[52px] shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={!input.trim()}
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </footer>
  )
}
