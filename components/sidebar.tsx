"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, ChevronLeft, ScrollText, Sword, Shield, User, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const recentCampaigns = [
  { id: "1", name: "The Cursed Crypts", lastPlayed: "2 hours ago" },
  { id: "2", name: "Dragon's Bane", lastPlayed: "Yesterday" },
  { id: "3", name: "Whispers in the Dark", lastPlayed: "3 days ago" },
  { id: "4", name: "The Lost Kingdom", lastPlayed: "1 week ago" },
]

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-0 overflow-hidden",
      )}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Sword className="h-5 w-5 text-primary" />
          <span className="font-semibold text-sidebar-foreground">Quest Master</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Collapse sidebar</span>
        </Button>
      </div>

      <div className="px-3 pb-2">
        <Button className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <PlusCircle className="h-4 w-4" />
          New Session
        </Button>
      </div>

      <div className="px-3 py-2">
        <h3 className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Recent Campaigns
        </h3>
        <ScrollArea className="h-[calc(100vh-320px)]">
          <div className="space-y-1">
            {recentCampaigns.map((campaign) => (
              <button
                key={campaign.id}
                className="flex w-full flex-col items-start gap-0.5 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-sidebar-accent"
              >
                <div className="flex items-center gap-2 text-sidebar-foreground">
                  <ScrollText className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{campaign.name}</span>
                </div>
                <span className="pl-6 text-xs text-muted-foreground">{campaign.lastPlayed}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="mt-auto border-t border-sidebar-border p-3">
        <div className="space-y-1">
          <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent">
            <Shield className="h-4 w-4 text-muted-foreground" />
            Character Settings
          </button>
          <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent">
            <User className="h-4 w-4 text-muted-foreground" />
            User Profile
          </button>
          <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent">
            <Settings className="h-4 w-4 text-muted-foreground" />
            Settings
          </button>
        </div>
      </div>
    </aside>
  )
}
