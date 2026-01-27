"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { ChatArea } from "./chat-area"
import { MessageInput } from "./message-input"
import type { Message } from "@/lib/types"

const initialMessages: Message[] = [
  {
    id: "1",
    type: "gm",
    content:
      "Welcome, adventurer. The night is cold, and the **Rusty Tankard** tavern beckons with warmth and the promise of ale. You push open the heavy oak door and step inside. What would you like to do?",
  },
  {
    id: "2",
    type: "user",
    content: "I look around the tavern",
  },
  {
    id: "3",
    type: "gm",
    content:
      "You scan the dimly lit room, taking in your surroundings. The tavern is bustling with activity:\n\n- A **grizzled dwarf** sits alone in the corner, nursing a tankard and occasionally glancing at the door\n- Three **hooded figures** huddle around a table near the fireplace, speaking in hushed tones\n- The **barkeep**, a stout woman with kind eyes, polishes glasses behind the counter\n- A **bard** strums a melancholic tune on a worn lute near the hearth\n\nThe smell of roasted meat and pipe smoke fills the air. A large notice board hangs by the entrance, covered in weathered parchments.",
  },
  {
    id: "4",
    type: "system",
    content: "Perception Check",
    diceResult: {
      roll: 18,
      modifier: 3,
      total: 21,
      success: true,
      dc: 15,
    },
  },
  {
    id: "5",
    type: "gm",
    content:
      "Your keen eyes catch something the casual observer might miss—one of the hooded figures has a **dagger concealed** beneath their cloak, and the dwarf's tankard sits untouched, as if he's only pretending to drink. Something feels... off.",
  },
]

export function GameMasterChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
    }
    setMessages([...messages, newMessage])
  }

  const handleRollDice = () => {
    const roll = Math.floor(Math.random() * 20) + 1
    const modifier = 2
    const total = roll + modifier
    const dc = 12

    const diceMessage: Message = {
      id: Date.now().toString(),
      type: "system",
      content: "Manual Roll",
      diceResult: {
        roll,
        modifier,
        total,
        success: total >= dc,
        dc,
      },
    }
    setMessages([...messages, diceMessage])
  }

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className="flex flex-1 flex-col overflow-hidden">
        <ChatArea messages={messages} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <MessageInput onSendMessage={handleSendMessage} onRollDice={handleRollDice} />
      </main>
    </div>
  )
}
