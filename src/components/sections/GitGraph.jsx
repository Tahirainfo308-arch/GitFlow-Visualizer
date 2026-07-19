import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMagnifyingGlassPlus, HiOutlineMagnifyingGlassMinus, HiOutlineArrowsPointingOut } from 'react-icons/hi2'

const NODE_RADIUS = 14
const MERGE_RADIUS = 10

export default function GitGraph({ graph, onNodeClick }) {
  const svgRef = useRef(null)
  const containerRef = useRef(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const panStart = useRef({ x: 0, y: 0 })
  const panOffset = useRef({ x: 0, y: 0 })
  const [hoveredNode, setHoveredNode] = useState(null)
  const [tooltip, setTooltip] = useState(null)

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setPan({ x: 0, y: 0 })
    }
  }, [graph])

  const handleWheel = useCallback((e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setZoom(prev => Math.min(3, Math.max(0.2, prev + delta)))
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  const handleMouseDown = (e) => {
    if (e.target.closest('.node-interactive')) return
    setIsPanning(true)
    panStart.current = { x: e.clientX, y: e.clientY }
    panOffset.current = { ...pan }
  }

  const handleMouseMove = (e) => {
    if (!isPanning) return
    const dx = e.clientX - panStart.current.x
    const dy = e.clientY - panStart.current.y
    setPan({ x: panOffset.current.x + dx, y: panOffset.current.y + dy })
  }

  const handleMouseUp = () => {
    setIsPanning(false)
  }

  const handleZoomIn = () => setZoom(prev => Math.min(3, prev + 0.2))
  const handleZoomOut = () => setZoom(prev => Math.max(0.2, prev - 0.2))
  const handleReset = () => { setZoom(1); setPan({ x: 0, y: 0 }) }

  const handleNodeHover = (node, e) => {
    setHoveredNode(node.id)
    const rect = containerRef.current.getBoundingClientRect()
    setTooltip({
      x: e.clientX - rect.left + 16,
      y: e.clientY - rect.top - 10,
      node,
    })
  }

  const handleNodeLeave = () => {
    setHoveredNode(null)
    setTooltip(null)
  }

  if (!graph || !graph.nodes || graph.nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted text-sm">
        <p>No commits yet. Run <code className="text-primary font-mono">commit</code> to start.</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ cursor: isPanning ? 'grabbing' : 'grab' }}>
      <div
        ref={containerRef}
        className="w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          className="select-none"
        >
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            <g>
              {graph.edges.map((edge, i) => {
                const isCurved = Math.abs(edge.fromX - edge.toX) > 5
                if (isCurved) {
                  const midY = (edge.fromY + edge.toY) / 2
                  const d = `M ${edge.fromX} ${edge.fromY} C ${edge.fromX} ${midY}, ${edge.toX} ${midY}, ${edge.toX} ${edge.toY}`
                  return (
                    <g key={`edge-${i}`}>
                      <path
                        d={d}
                        fill="none"
                        stroke={edge.color}
                        strokeWidth="2.5"
                        strokeOpacity="0.15"
                        strokeLinecap="round"
                      />
                      <path
                        d={d}
                        fill="none"
                        stroke={edge.color}
                        strokeWidth="2"
                        strokeOpacity="0.8"
                        strokeLinecap="round"
                      />
                    </g>
                  )
                }
                return (
                  <g key={`edge-${i}`}>
                    <line
                      x1={edge.fromX}
                      y1={edge.fromY}
                      x2={edge.toX}
                      y2={edge.toY}
                      stroke={edge.color}
                      strokeWidth="2.5"
                      strokeOpacity="0.15"
                    />
                    <line
                      x1={edge.fromX}
                      y1={edge.fromY}
                      x2={edge.toX}
                      y2={edge.toY}
                      stroke={edge.color}
                      strokeWidth="2"
                      strokeOpacity="0.8"
                    />
                  </g>
                )
              })}
            </g>

            <g>
              {graph.nodes.map((node) => {
                const isHovered = hoveredNode === node.id
                const isMerge = node.parents.length > 1
                const r = isMerge ? MERGE_RADIUS : NODE_RADIUS

                return (
                  <g
                    key={node.id}
                    className="node-interactive"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => handleNodeHover(node, e)}
                    onMouseLeave={handleNodeLeave}
                    onClick={() => onNodeClick?.(node)}
                  >
                    {node.isHead && (
                      <>
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={r + 8}
                          fill="none"
                          stroke={node.branchColor}
                          strokeWidth="2"
                          strokeOpacity="0.3"
                          strokeDasharray="4 4"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from={`0 ${node.x} ${node.y}`}
                            to={`360 ${node.x} ${node.y}`}
                            dur="8s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={r + 4}
                          fill={node.branchColor}
                          fillOpacity="0.15"
                        />
                      </>
                    )}

                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={r}
                      fill={isHovered ? node.branchColor : '#161B22'}
                      stroke={node.branchColor}
                      strokeWidth={isHovered ? 3 : 2.5}
                      style={{
                        filter: isHovered ? `drop-shadow(0 0 8px ${node.branchColor}40)` : 'none',
                        transition: 'all 0.2s ease',
                      }}
                    />

                    {isMerge ? (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={r - 5}
                        fill={node.branchColor}
                        fillOpacity="0.6"
                      />
                    ) : (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={4}
                        fill={node.branchColor}
                      />
                    )}

                    <text
                      x={node.x + r + 10}
                      y={node.y + 4}
                      fill="#8B949E"
                      fontSize="10"
                      fontFamily="'JetBrains Mono', monospace"
                    >
                      {node.hash}
                    </text>

                    <text
                      x={node.x + r + 56}
                      y={node.y + 4}
                      fill="#8B949E"
                      fontSize="10"
                      fontFamily="'Inter', sans-serif"
                      style={{ maxWidth: '200px' }}
                    >
                      {node.message.length > 30 ? node.message.slice(0, 30) + '...' : node.message}
                    </text>

                    {node.branchLabel && (
                      <g>
                        <rect
                          x={node.x - 4}
                          y={node.y - r - 24}
                          width={node.branchLabel.length * 7.5 + 16}
                          height={20}
                          rx={10}
                          fill={node.branchColor}
                          fillOpacity="0.15"
                          stroke={node.branchColor}
                          strokeWidth="1"
                          strokeOpacity="0.4"
                        />
                        <text
                          x={node.x + 4}
                          y={node.y - r - 10}
                          fill={node.branchColor}
                          fontSize="10"
                          fontWeight="600"
                          fontFamily="'Inter', sans-serif"
                        >
                          {node.branchLabel}
                        </text>
                      </g>
                    )}

                    {node.isHead && (
                      <g>
                        <rect
                          x={node.x + r + (node.message.length > 30 ? 256 : node.message.length * 6.5 + 66)}
                          y={node.y - 10}
                          width={44}
                          height={20}
                          rx={10}
                          fill="#F85149"
                          fillOpacity="0.15"
                          stroke="#F85149"
                          strokeWidth="1"
                          strokeOpacity="0.4"
                        />
                        <text
                          x={node.x + r + (node.message.length > 30 ? 264 : node.message.length * 6.5 + 74)}
                          y={node.y + 4}
                          fill="#F85149"
                          fontSize="10"
                          fontWeight="600"
                          fontFamily="'Inter', sans-serif"
                        >
                          HEAD
                        </text>
                      </g>
                    )}
                  </g>
                )
              })}
            </g>
          </g>
        </svg>
      </div>

      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute pointer-events-none z-50 px-3 py-2 rounded-lg bg-card border border-border shadow-xl text-xs"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tooltip.node.branchColor }} />
              <span className="font-mono text-primary">{tooltip.node.hash}</span>
              {tooltip.node.isHead && <span className="text-red font-medium">HEAD</span>}
            </div>
            <p className="text-text font-medium">{tooltip.node.message}</p>
            <p className="text-muted mt-0.5">{tooltip.node.author} &middot; {new Date(tooltip.node.timestamp).toLocaleTimeString()}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-muted hover:text-text hover:border-muted transition-colors"
        >
          <HiOutlineMagnifyingGlassMinus className="w-4 h-4" />
        </button>
        <span className="px-2 py-1 rounded-lg bg-card border border-border text-xs text-muted font-mono min-w-[48px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-muted hover:text-text hover:border-muted transition-colors"
        >
          <HiOutlineMagnifyingGlassPlus className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-muted hover:text-text hover:border-muted transition-colors"
        >
          <HiOutlineArrowsPointingOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
