import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineCommandLine } from 'react-icons/hi2'

export default function Terminal({ onCommand, currentBranch, headHash, history }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState([
    { type: 'system', text: 'GitFlow Visualizer Terminal v2.0' },
    { type: 'system', text: 'Type "help" for available commands.\n' },
  ])
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  const allCommands = [
    'commit', 'branch', 'checkout', 'merge', 'rebase',
    'cherry-pick', 'reset', 'undo', 'redo', 'log',
    'status', 'graph', 'help', 'clear', 'reset-all',
  ]

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [output])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const processInput = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const trimmed = input.trim()
    setCommandHistory(prev => [...prev, trimmed])
    setHistoryIndex(-1)

    const newOutput = [...output, { type: 'input', text: `$ ${trimmed}` }]

    if (trimmed === 'clear') {
      setOutput([{ type: 'system', text: 'Terminal cleared.\n' }])
      setInput('')
      return
    }

    const result = onCommand(trimmed)

    if (result.type === 'clear') {
      setOutput([{ type: 'system', text: 'Terminal cleared.\n' }])
      setInput('')
      return
    }

    if (result.type === 'reset-all') {
      setOutput([
        { type: 'system', text: 'GitFlow Visualizer Terminal v2.0' },
        { type: 'system', text: 'Type "help" for available commands.\n' },
        { type: 'success', text: result.message },
      ])
      setInput('')
      return
    }

    if (result.type === 'branch-list') {
      newOutput.push({
        type: 'branch-list',
        branches: result.branches,
      })
    } else if (result.type === 'log') {
      const logLines = result.logs.map((c, i) => {
        const prefix = i === 0 ? '* ' : '  '
        const color = c.branch || ''
        return `${prefix}${c.hash} ${color ? `(${color}) ` : ''}${c.message}`
      })
      newOutput.push({ type: 'output', text: logLines.join('\n') })
    } else if (result.type === 'status') {
      newOutput.push({
        type: 'output',
        text: `On branch ${result.branch}\nHEAD: ${result.head}\nBranches: ${result.branches.join(', ')}`,
      })
    } else if (result.type === 'help') {
      const lines = result.commands.map(c => {
        const cmd = c.alias ? `${c.cmd} (${c.alias})` : c.cmd
        return `  ${cmd.padEnd(32)} ${c.desc}`
      })
      newOutput.push({ type: 'output', text: `Available commands:\n${lines.join('\n')}` })
    } else if (result.success) {
      if (result.commit) {
        newOutput.push({ type: 'success', text: `[${result.commit.branch || 'HEAD'} ${result.commit.hash}] ${result.commit.message}` })
      } else if (result.message) {
        newOutput.push({ type: 'success', text: result.message })
      } else {
        newOutput.push({ type: 'success', text: 'OK' })
      }
    } else {
      newOutput.push({ type: 'error', text: result.error || 'Unknown error' })
    }

    setOutput(newOutput)
    setInput('')
    setShowSuggestions(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
      } else {
        setHistoryIndex(-1)
        setInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const matches = allCommands.filter(c => c.startsWith(input.toLowerCase()))
      if (matches.length === 1) {
        setInput(matches[0] + ' ')
        setShowSuggestions(false)
      } else if (matches.length > 1) {
        setSuggestions(matches)
        setShowSuggestions(true)
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#0a0e14]">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-card/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red/80" />
          <div className="w-3 h-3 rounded-full bg-orange/80" />
          <div className="w-3 h-3 rounded-full bg-green/80" />
        </div>
        <span className="text-xs text-muted font-mono ml-2 flex items-center gap-1.5">
          <HiOutlineCommandLine className="w-3.5 h-3.5" />
          Terminal
        </span>
        <div className="ml-auto flex items-center gap-2">
          {currentBranch && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
              {currentBranch}
            </span>
          )}
          <span className="text-xs text-muted font-mono">{headHash}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm" onClick={() => inputRef.current?.focus()}>
        {output.map((line, i) => (
          <div key={i} className="mb-1 whitespace-pre-wrap">
            {line.type === 'input' && (
              <span className="text-primary">{line.text}</span>
            )}
            {line.type === 'system' && (
              <span className="text-muted">{line.text}</span>
            )}
            {line.type === 'output' && (
              <span className="text-text">{line.text}</span>
            )}
            {line.type === 'success' && (
              <span className="text-green">{line.text}</span>
            )}
            {line.type === 'error' && (
              <span className="text-red">{line.text}</span>
            )}
            {line.type === 'branch-list' && (
              <div className="space-y-1">
                {line.branches.map((b, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <span className={`font-bold ${b.isCurrent ? 'text-green' : 'text-text'}`}>
                      {b.isCurrent ? '* ' : '  '}
                    </span>
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: b.color }} />
                    <span className={`font-medium ${b.isCurrent ? 'text-green' : 'text-text'}`}>
                      {b.name}
                    </span>
                    <span className="text-muted text-xs">({b.head})</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="relative border-t border-border">
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute bottom-full left-0 right-0 bg-card border border-border rounded-t-xl mx-4 mb-0 overflow-hidden"
            >
              {suggestions.map((s, i) => (
                <button
                  key={s}
                  onClick={() => { setInput(s + ' '); setShowSuggestions(false); inputRef.current?.focus() }}
                  className="w-full text-left px-4 py-2 text-sm font-mono text-muted hover:bg-card-hover hover:text-text transition-colors"
                >
                  {s}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <form onSubmit={processInput} className="flex items-center gap-2 px-4 py-3">
          <span className="text-green font-mono text-sm">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setShowSuggestions(false) }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-text font-mono text-sm"
            placeholder="Type a git command... (Tab for suggestions)"
            autoFocus
          />
        </form>
      </div>
    </div>
  )
}
