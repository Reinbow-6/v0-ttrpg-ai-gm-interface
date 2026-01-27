"use client"

import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Menu, Sparkles } from "lucide-react"
import { UserMessage } from "./messages/user-message"
import { GMMessage } from "./messages/gm-message"
import { DiceRollCard } from "./messages/dice-roll-card"
import type { Message } from "@/lib/types"

interface ChatAreaProps {
  messages: Message[]
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export function ChatArea({ messages, sidebarOpen, onToggleSidebar }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        {!sidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="h-8 w-8 text-foreground hover:bg-secondary"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open sidebar</span>
          </Button>
        )}
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">The Rusty Tankard</h1>
        </div>
      </header>

      <ScrollArea className="flex-1 px-4" ref={scrollRef}>
        <div className="mx-auto max-w-3xl space-y-4 py-6">
          {messages.map((message) => {
            switch (message.type) {
              case "user":
                return <UserMessage key={message.id} content={message.content} />
              case "gm":
                return <GMMessage key={message.id} content={message.content} />
              case "system":
                return <DiceRollCard key={message.id} title={message.content} diceResult={message.diceResult!} />
              default:
                return null
            }
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
