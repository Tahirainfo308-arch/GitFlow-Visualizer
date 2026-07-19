const BRANCH_COLORS = [
  '#58A6FF', '#3FB950', '#F1502F', '#F85149',
  '#D2A8FF', '#FF7B72', '#79C0FF', '#56D364',
  '#FFA657', '#FF9ECE', '#A5D6FF', '#7EE787',
]

let idCounter = 0
function nextId() {
  return `c${++idCounter}`
}

function shortHash(id) {
  return id.replace('c', '').padStart(7, '0').slice(0, 7)
}

export function createGitEngine() {
  const initialState = () => {
    idCounter = 0
    const firstId = nextId()
    const firstCommit = {
      id: firstId,
      hash: shortHash(firstId),
      message: 'Initial commit',
      author: 'You',
      timestamp: Date.now(),
      parents: [],
      branch: 'main',
    }
    return {
      commits: { [firstId]: firstCommit },
      branches: { main: { name: 'main', head: firstId, color: BRANCH_COLORS[0] } },
      HEAD: { type: 'branch', name: 'main', ref: firstId },
      currentBranch: 'main',
      colorIndex: 1,
      history: [],
      undoStack: [],
    }
  }

  let state = initialState()

  function snapshot() {
    state.undoStack.push(JSON.parse(JSON.stringify({
      commits: state.commits,
      branches: state.branches,
      HEAD: state.HEAD,
      currentBranch: state.currentBranch,
      colorIndex: state.colorIndex,
    })))
    state.history.push(JSON.parse(JSON.stringify({
      commits: state.commits,
      branches: state.branches,
      HEAD: state.HEAD,
      currentBranch: state.currentBranch,
    })))
  }

  function getHeadCommitId() {
    return state.HEAD.ref
  }

  function getHeadCommit() {
    return state.commits[getHeadCommitId()]
  }

  function addCommit(message) {
    snapshot()
    const parentId = getHeadCommitId()
    const id = nextId()
    const commit = {
      id,
      hash: shortHash(id),
      message: message || `Commit ${id}`,
      author: 'You',
      timestamp: Date.now(),
      parents: [parentId],
      branch: state.currentBranch,
    }
    state.commits[id] = commit
    state.HEAD.ref = id
    if (state.currentBranch) {
      state.branches[state.currentBranch].head = id
    }
    return { success: true, commit }
  }

  function createBranch(name) {
    if (state.branches[name]) {
      return { success: false, error: `Branch '${name}' already exists.` }
    }
    snapshot()
    const headId = getHeadCommitId()
    const color = BRANCH_COLORS[state.colorIndex % BRANCH_COLORS.length]
    state.colorIndex++
    state.branches[name] = { name, head: headId, color }
    return { success: true, branch: name }
  }

  function checkout(branchOrHash) {
    if (state.branches[branchOrHash]) {
      snapshot()
      state.currentBranch = branchOrHash
      state.HEAD = { type: 'branch', name: branchOrHash, ref: state.branches[branchOrHash].head }
      return { success: true }
    }
    const commit = Object.values(state.commits).find(
      c => c.hash === branchOrHash || c.id === branchOrHash
    )
    if (commit) {
      snapshot()
      state.currentBranch = null
      state.HEAD = { type: 'detached', name: null, ref: commit.id }
      return { success: true, detached: true }
    }
    return { success: false, error: `Branch or commit '${branchOrHash}' not found.` }
  }

  function merge(branchName) {
    const target = state.branches[branchName]
    if (!target) {
      return { success: false, error: `Branch '${branchName}' not found.` }
    }
    if (!state.currentBranch) {
      return { success: false, error: 'HEAD is detached. Cannot merge.' }
    }
    const currentHead = getHeadCommitId()
    if (currentHead === target.head) {
      return { success: false, error: `Already up to date.` }
    }
    snapshot()
    const id = nextId()
    const commit = {
      id,
      hash: shortHash(id),
      message: `Merge '${branchName}' into ${state.currentBranch}`,
      author: 'You',
      timestamp: Date.now(),
      parents: [currentHead, target.head],
      branch: state.currentBranch,
    }
    state.commits[id] = commit
    state.HEAD.ref = id
    state.branches[state.currentBranch].head = id
    return { success: true, commit }
  }

  function rebase(branchName) {
    const target = state.branches[branchName]
    if (!target) {
      return { success: false, error: `Branch '${branchName}' not found.` }
    }
    if (!state.currentBranch) {
      return { success: false, error: 'HEAD is detached. Cannot rebase.' }
    }
    const currentHead = getHeadCommitId()
    if (currentHead === target.head) {
      return { success: false, error: 'Already up to date.' }
    }
    snapshot()
    const id = nextId()
    const commit = {
      id,
      hash: shortHash(id),
      message: `Rebase '${state.currentBranch}' onto '${branchName}'`,
      author: 'You',
      timestamp: Date.now(),
      parents: [target.head],
      branch: state.currentBranch,
    }
    state.commits[id] = commit
    state.HEAD.ref = id
    state.branches[state.currentBranch].head = id
    return { success: true, commit }
  }

  function cherryPick(branchName) {
    const target = state.branches[branchName]
    if (!target) {
      return { success: false, error: `Branch '${branchName}' not found.` }
    }
    if (!state.currentBranch) {
      return { success: false, error: 'HEAD is detached. Cannot cherry-pick.' }
    }
    const targetCommit = state.commits[target.head]
    if (!targetCommit) {
      return { success: false, error: 'Target commit not found.' }
    }
    const currentHead = getHeadCommitId()
    if (currentHead === target.head) {
      return { success: false, error: 'Cannot cherry-pick same commit.' }
    }
    snapshot()
    const id = nextId()
    const commit = {
      id,
      hash: shortHash(id),
      message: `Cherry-pick from '${branchName}': ${targetCommit.message}`,
      author: 'You',
      timestamp: Date.now(),
      parents: [currentHead],
      branch: state.currentBranch,
    }
    state.commits[id] = commit
    state.HEAD.ref = id
    state.branches[state.currentBranch].head = id
    return { success: true, commit }
  }

  function reset(mode = 'mixed') {
    if (!state.currentBranch) {
      return { success: false, error: 'HEAD is detached. Cannot reset.' }
    }
    const currentHead = getHeadCommitId()
    const commit = state.commits[currentHead]
    if (!commit || commit.parents.length === 0) {
      return { success: false, error: 'Cannot reset: already at root commit.' }
    }
    snapshot()
    const parentId = commit.parents[0]
    state.HEAD.ref = parentId
    state.branches[state.currentBranch].head = parentId
    return { success: true, message: `Reset to ${shortHash(parentId)} (${mode})` }
  }

  function undo() {
    if (state.undoStack.length === 0) {
      return { success: false, error: 'Nothing to undo.' }
    }
    const prev = state.undoStack.pop()
    state.commits = prev.commits
    state.branches = prev.branches
    state.HEAD = prev.HEAD
    state.currentBranch = prev.currentBranch
    state.colorIndex = prev.colorIndex
    return { success: true, message: 'Undone.' }
  }

  function redo() {
    if (state.history.length === 0) {
      return { success: false, error: 'Nothing to redo.' }
    }
    const next = state.history.pop()
    snapshot()
    state.commits = next.commits
    state.branches = next.branches
    state.HEAD = next.HEAD
    state.currentBranch = next.currentBranch
    return { success: true, message: 'Redone.' }
  }

  function getState() {
    return {
      commits: { ...state.commits },
      branches: { ...state.branches },
      HEAD: { ...state.HEAD },
      currentBranch: state.currentBranch,
    }
  }

  function getGraphLayout() {
    const commitList = Object.values(state.commits)
    if (commitList.length === 0) return { nodes: [], edges: [] }

    const sorted = [...commitList].sort((a, b) => a.timestamp - b.timestamp)

    const nodeX = {}
    const columns = []
    const nodes = []
    const edges = []

    const NODE_Y_SPACING = 70
    const NODE_X_SPACING = 80
    const PADDING_X = 60
    const PADDING_Y = 60

    sorted.forEach((commit, index) => {
      let col = 0
      while (columns[col] && columns[col] > commit.timestamp - 1000) {
        col++
      }
      columns[col] = commit.timestamp

      const x = PADDING_X + col * NODE_X_SPACING
      const y = PADDING_Y + index * NODE_Y_SPACING

      nodeX[commit.id] = { x, y, col }
      const isHead = state.HEAD.ref === commit.id
      const isDetachedHead = state.HEAD.type === 'detached' && isHead

      let branchLabel = null
      Object.values(state.branches).forEach(branch => {
        if (branch.head === commit.id) {
          branchLabel = branch.name
        }
      })

      let onBranchLine = null
      Object.values(state.branches).forEach(branch => {
        if (branch.head === commit.id) {
          onBranchLine = branch.name
        }
      })

      nodes.push({
        id: commit.id,
        hash: commit.hash,
        message: commit.message,
        x,
        y,
        col,
        isHead,
        isDetachedHead,
        branchLabel,
        branchColor: commit.branch ? (state.branches[commit.branch]?.color || BRANCH_COLORS[0]) : BRANCH_COLORS[0],
        parents: commit.parents,
        author: commit.author,
        timestamp: commit.timestamp,
      })

      commit.parents.forEach(parentId => {
        if (nodeX[parentId]) {
          edges.push({
            from: parentId,
            to: commit.id,
            fromX: nodeX[parentId].x,
            fromY: nodeX[parentId].y,
            toX: x,
            toY: y,
            color: commit.branch ? (state.branches[commit.branch]?.color || BRANCH_COLORS[0]) : BRANCH_COLORS[0],
            isMerge: commit.parents.length > 1,
          })
        }
      })
    })

    const maxX = Math.max(...nodes.map(n => n.x), 0) + PADDING_X * 2
    const maxY = Math.max(...nodes.map(n => n.y), 0) + PADDING_Y * 2

    return { nodes, edges, width: maxX, height: maxY }
  }

  function executeCommand(input) {
    const parts = input.trim().split(/\s+/)
    const cmd = parts[0]?.toLowerCase()

    switch (cmd) {
      case 'git':
        return executeCommand(parts.slice(1).join(' '))
      case 'commit':
      case 'c': {
        const msg = parts.slice(1).join(' ').replace(/^["']|["']$/g, '') || `Commit ${Date.now().toString(36)}`
        return addCommit(msg)
      }
      case 'branch':
      case 'b': {
        const name = parts[1]
        if (!name) {
          const branchList = Object.values(state.branches).map(b => ({
            name: b.name,
            isCurrent: b.name === state.currentBranch,
            head: shortHash(b.head),
            color: b.color,
          }))
          return { success: true, type: 'branch-list', branches: branchList }
        }
        return createBranch(name)
      }
      case 'checkout':
      case 'co': {
        const target = parts[1]
        if (!target) return { success: false, error: 'Usage: checkout <branch|commit>' }
        return checkout(target)
      }
      case 'merge':
      case 'm': {
        const target = parts[1]
        if (!target) return { success: false, error: 'Usage: merge <branch>' }
        return merge(target)
      }
      case 'rebase':
      case 'rb': {
        const target = parts[1]
        if (!target) return { success: false, error: 'Usage: rebase <branch>' }
        return rebase(target)
      }
      case 'cherry-pick':
      case 'cp': {
        const target = parts[1]
        if (!target) return { success: false, error: 'Usage: cherry-pick <branch>' }
        return cherryPick(target)
      }
      case 'reset': {
        const mode = parts[1] || 'mixed'
        return reset(mode)
      }
      case 'undo':
        return undo()
      case 'redo':
        return redo()
      case 'log':
      case 'lg': {
        const headId = getHeadCommitId()
        const logs = []
        const visited = new Set()
        const queue = [headId]
        while (queue.length > 0 && logs.length < 20) {
          const id = queue.shift()
          if (visited.has(id)) continue
          visited.add(id)
          const c = state.commits[id]
          if (c) {
            logs.push(c)
            c.parents.forEach(p => queue.push(p))
          }
        }
        return { success: true, type: 'log', logs }
      }
      case 'status':
      case 'st': {
        return {
          success: true,
          type: 'status',
          branch: state.currentBranch || 'HEAD detached',
          head: shortHash(getHeadCommitId()),
          branches: Object.keys(state.branches),
        }
      }
      case 'graph':
      case 'g':
        return { success: true, type: 'graph' }
      case 'help':
      case 'h':
        return {
          success: true,
          type: 'help',
          commands: [
            { cmd: 'commit <msg>', alias: 'c', desc: 'Create a new commit' },
            { cmd: 'branch <name>', alias: 'b', desc: 'Create a branch (or list branches)' },
            { cmd: 'checkout <target>', alias: 'co', desc: 'Switch branch or commit' },
            { cmd: 'merge <branch>', alias: 'm', desc: 'Merge a branch' },
            { cmd: 'rebase <branch>', alias: 'rb', desc: 'Rebase onto branch' },
            { cmd: 'cherry-pick <branch>', alias: 'cp', desc: 'Cherry-pick from branch' },
            { cmd: 'reset', desc: 'Reset to parent commit' },
            { cmd: 'undo', desc: 'Undo last operation' },
            { cmd: 'redo', desc: 'Redo last undone operation' },
            { cmd: 'log', alias: 'lg', desc: 'View commit history' },
            { cmd: 'status', alias: 'st', desc: 'Show current status' },
            { cmd: 'graph', alias: 'g', desc: 'Refresh graph' },
            { cmd: 'clear', desc: 'Clear terminal' },
            { cmd: 'reset-all', desc: 'Reset to initial state' },
          ],
        }
      case 'clear':
        return { success: true, type: 'clear' }
      case 'reset-all':
        state = initialState()
        return { success: true, type: 'reset-all', message: 'Reset to initial state.' }
      default:
        return { success: false, error: `Unknown command: '${cmd}'. Type 'help' for available commands.` }
    }
  }

  return {
    executeCommand,
    getState,
    getGraphLayout,
  }
}
