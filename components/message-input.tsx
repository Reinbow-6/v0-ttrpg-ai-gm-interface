"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send, Dices, ChevronDown, Sparkles, Bot, Cpu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const models = [
  { id: "gpt-4o", name: "ChatGPT 4o", icon: Sparkles },
  { id: "claude-haiku", name: "Claude Haiku 4.5", icon: Bot },
  { id: "llama-70b", name: "Llama 3.3 70B", icon: Cpu },
]

interface MessageInputProps {
  onSendMessage: (content: string) => void
  onRollDice: () => void
}

export function MessageInput({ onSendMessage, onRollDice }: MessageInputProps) {
  const [input, setInput] = useState("")
  const [selectedModel, setSelectedModel] = useState(models[0])

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

  const ModelIcon = selectedModel.icon

  return (
    <footer className="border-t border-border bg-background p-4">
      <div className="mx-auto max-w-3xl">
        <form onSubmit={handleSubmit}>
          {/* Main input container */}
          <div className="rounded-2xl border border-border bg-input p-3">
            {/* Textarea */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What do you do next?"
              className="min-h-[60px] w-full resize-none bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              rows={2}
            />

            {/* Bottom bar with controls */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                {/* Model selector */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1.5 rounded-lg px-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      <ModelIcon className="h-4 w-4" />
                      <span className="text-xs font-medium">{selectedModel.name}</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {models.map((model) => {
                      const Icon = model.icon
                      return (
                        <DropdownMenuItem
                          key={model.id}
                          onClick={() => setSelectedModel(model)}
                          className="gap-2"
                        >
                          <Icon className="h-4 w-4" />
                          <span>{model.name}</span>
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Dice roll button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onRollDice}
                  className="h-8 w-8 rounded-lg p-0 text-muted-foreground hover:bg-dice/20 hover:text-dice"
                  title="Roll dice"
                >
                  <Dices className="h-4 w-4" />
                  <span className="sr-only">Roll dice</span>
                </Button>
              </div>

              {/* Send button */}
              <Button
                type="submit"
                size="sm"
                className="h-8 w-8 rounded-lg bg-primary p-0 text-primary-foreground transition-opacity hover:bg-primary/90 disabled:opacity-40"
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </footer>
  )
}
