interface UserMessageProps {
  content: string
}

export function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-secondary px-4 py-3 text-secondary-foreground">
        <p className="text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  )
}
