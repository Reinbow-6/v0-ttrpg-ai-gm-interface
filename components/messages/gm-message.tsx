import { Sparkles } from "lucide-react"

interface GMMessageProps {
  content: string
}

export function GMMessage({ content }: GMMessageProps) {
  // Simple markdown-like parsing for bold and lists
  const parseContent = (text: string) => {
    const lines = text.split("\n")

    return lines.map((line, idx) => {
      // Handle list items
      if (line.startsWith("- ")) {
        const listContent = line.slice(2)
        return (
          <li key={idx} className="ml-4 list-disc">
            {parseBold(listContent)}
          </li>
        )
      }

      // Handle empty lines as paragraph breaks
      if (line.trim() === "") {
        return <br key={idx} />
      }

      return (
        <p key={idx} className="mb-2 last:mb-0">
          {parseBold(line)}
        </p>
      )
    })
  }

  const parseBold = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g)
    return parts.map((part, idx) => {
      if (idx % 2 === 1) {
        return (
          <strong key={idx} className="font-semibold text-primary">
            {part}
          </strong>
        )
      }
      return part
    })
  }

  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Sparkles className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1 text-sm leading-relaxed text-foreground">{parseContent(content)}</div>
    </div>
  )
}
