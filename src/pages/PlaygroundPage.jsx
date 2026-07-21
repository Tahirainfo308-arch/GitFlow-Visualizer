import { useState, useCallback, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { createGitEngine } from '../services/gitEngine'
import GitGraph from '../components/sections/GitGraph'
import Terminal from '../components/sections/Terminal'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { staggerContainer, staggerItem } from '../animations/variants'
import {
  HiOutlineArrowPath,
  HiOutlinePlay,
  HiOutlineCommandLine,
  HiOutlineQuestionMarkCircle,
  HiOutlineCodeBracket,
} from 'react-icons/hi2'

const QUICK_COMMANDS = [
  { label: 'Commit', cmd: 'commit "New feature"', color: 'text-green', bg: 'bg-green/10', border: 'border-green/20' },
  { label: 'Branch', cmd: 'branch feature', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  { label: 'Checkout', cmd: 'checkout feature', color: 'text-orange', bg: 'bg-orange/10', border: 'border-orange/20' },
  { label: 'Merge', cmd: 'merge feature', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  { label: 'Rebase', cmd: 'rebase main', color: 'text-orange', bg: 'bg-orange/10', border: 'border-orange/20' },
  { label: 'Cherry-pick', cmd: 'cherry-pick feature', color: 'text-red', bg: 'bg-red/10', border: 'border-red/20' },
  { label: 'Reset', cmd: 'reset', color: 'text-red', bg: 'bg-red/10', border: 'border-red/20' },
  { label: 'Undo', cmd: 'undo', color: 'text-muted', bg: 'bg-muted/10', border: 'border-muted/20' },
  { label: 'Log', cmd: 'log', color: 'text-green', bg: 'bg-green/10', border: 'border-green/20' },
  { label: 'Status', cmd: 'status', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  { label: 'Help', cmd: 'help', color: 'text-muted', bg: 'bg-muted/10', border: 'border-muted/20' },
]

export default function PlaygroundPage() {
  const engine = useMemo(() => createGitEngine(), [])
  const [graphState, setGraphState] = useState(() => engine.getState())
  const [graphLayout, setGraphLayout] = useState(() => engine.getGraphLayout())
  const [selectedNode, setSelectedNode] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const refreshGraph = useCallback(() => {
    setGraphState(engine.getState())
    setGraphLayout(engine.getGraphLayout())
  }, [engine])

  const handleCommand = useCallback((input) => {
    const result = engine.executeCommand(input)
    if (result.type !== 'clear' && result.type !== 'help') {
      refreshGraph()
    }
    return result
  }, [engine, refreshGraph])

  const handleNodeClick = useCallback((node) => {
    setSelectedNode(node)
  }, [])

  const handleReset = () => {
    engine.executeCommand('reset-all')
    refreshGraph()
    setSelectedNode(null)
  }

  const handleQuickCommand = (cmd) => {
    handleCommand(cmd)
  }

  const stats = useMemo(() => ({
    commits: Object.keys(graphState.commits).length,
    branches: Object.keys(graphState.branches).length,
    currentBranch: graphState.currentBranch || 'detached',
  }), [graphState])

  return (
    <div className="min-h-screen">
      <section className="pt-2 pb-6 lg:pb-8 bg-grid bg-radial border-b border-border">
        <div className="px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge color="blue" dot>Interactive</Badge>
                </div>
                <h1 className="font-poppins text-2xl sm:text-3xl font-bold">
                  Git <span className="gradient-text">Playground</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border">
                <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
                <span className="text-xs text-muted font-mono">{stats.commits} commits</span>
                <span className="text-border">|</span>
                <span className="text-xs text-muted font-mono">{stats.branches} branches</span>
                <span className="text-border">|</span>
                <span className="text-xs text-primary font-medium">{stats.currentBranch}</span>
              </div>
              <Button variant="secondary" size="sm" onClick={handleReset} icon={HiOutlineArrowPath}>
                Reset
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="h-[calc(100vh-180px)]">
        <div className="h-full flex flex-col lg:flex-row">
          <div className="flex-1 flex flex-col min-w-0 border-r border-border">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-card/30">
              <HiOutlineCodeBracket className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Git Graph</span>
              <span className="text-xs text-muted ml-auto font-mono">Scroll to zoom &middot; Drag to pan</span>
            </div>
            <div className="flex-1 bg-surface">
              <GitGraph graph={graphLayout} onNodeClick={handleNodeClick} />
            </div>
          </div>

          <div className="w-full lg:w-[420px] flex flex-col border-t lg:border-t-0 border-border bg-card/20">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-card/30 flex-shrink-0">
              <HiOutlineCommandLine className="w-4 h-4 text-green" />
              <span className="text-sm font-medium">Quick Commands</span>
            </div>

            <div className="px-3 py-3 border-b border-border flex-shrink-0">
              <div className="flex flex-wrap gap-1.5">
                {QUICK_COMMANDS.map((qc) => (
                  <button
                    key={qc.label}
                    onClick={() => handleQuickCommand(qc.cmd)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${qc.bg} ${qc.color} ${qc.border} hover:opacity-80 transition-opacity cursor-pointer`}
                  >
                    {qc.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 min-h-0">
              <Terminal
                onCommand={handleCommand}
                currentBranch={graphState.currentBranch}
                headHash={graphState.HEAD?.ref?.replace('c', '0').padStart(7, '0').slice(0, 7) || '0000000'}
                history={[]}
              />
            </div>

            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-border p-4 bg-card/50 flex-shrink-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted">Selected Commit</span>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="text-xs text-muted hover:text-text"
                  >
                    Close
                  </button>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedNode.branchColor }} />
                    <span className="font-mono text-sm text-primary">{selectedNode.hash}</span>
                    {selectedNode.isHead && <Badge color="red" size="xs">HEAD</Badge>}
                    {selectedNode.branchLabel && <Badge color="blue" size="xs">{selectedNode.branchLabel}</Badge>}
                  </div>
                  <p className="text-sm">{selectedNode.message}</p>
                  <p className="text-xs text-muted">
                    {selectedNode.author} &middot; {new Date(selectedNode.timestamp).toLocaleTimeString()}
                  </p>
                  <p className="text-xs text-muted font-mono">
                    Parents: {selectedNode.parents.length > 0 ? selectedNode.parents.join(', ') : 'none'}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
