export const modules = [
  {
    id: 'fundamentals',
    title: 'Git Fundamentals',
    description: 'Learn the core concepts: repos, commits, branches, and the staging area.',
    level: 'Beginner',
    color: 'green',
    icon: '🌱',
    lessons: [
      {
        id: 'what-is-git',
        title: 'What is Git?',
        content: [
          { type: 'text', value: 'Git is a distributed version control system created by Linus Torvalds in 2005. It tracks changes in source code during software development.' },
          { type: 'heading', value: 'Why Git?' },
          { type: 'text', value: 'Git lets you track every change, collaborate with others, and revert mistakes. It\'s the most widely used version control system in the world.' },
          { type: 'code', value: '# Check your Git version\ngit --version' },
          { type: 'text', value: 'Every Git project has a .git directory that stores all the history and configuration. This is what makes Git a "distributed" system — every clone is a full backup.' },
          { type: 'callout', value: '💡 Git is NOT the same as GitHub. Git is the tool; GitHub is a hosting service for Git repositories.' },
        ],
        xp: 25,
      },
      {
        id: 'init-and-clone',
        title: 'Init & Clone',
        content: [
          { type: 'text', value: 'There are two ways to start using Git: initialize a new repository or clone an existing one.' },
          { type: 'heading', value: 'git init' },
          { type: 'code', value: '# Create a new repository\nmkdir my-project\ncd my-project\ngit init\n\n# This creates a .git directory' },
          { type: 'heading', value: 'git clone' },
          { type: 'code', value: '# Clone an existing repository\ngit clone https://github.com/user/repo.git\n\n# Clone into a specific directory\ngit clone https://github.com/user/repo.git my-folder' },
          { type: 'text', value: 'Use git init for new projects and git clone for existing ones.' },
          { type: 'callout', value: '💡 Cloning downloads the entire history — all branches, all commits.' },
        ],
        xp: 25,
      },
      {
        id: 'staging-area',
        title: 'The Staging Area',
        content: [
          { type: 'text', value: 'Git has three main areas: Working Directory, Staging Area, and Repository. The staging area is where you prepare changes before committing.' },
          { type: 'heading', value: 'Why Stage?' },
          { type: 'text', value: 'Staging lets you craft precise commits. You can select which changes to include, creating clean, meaningful commit history.' },
          { type: 'code', value: '# Stage a specific file\ngit add file.js\n\n# Stage all changes\ngit add .\n\n# Stage part of a file (interactive)\ngit add -p' },
          { type: 'heading', value: 'Three States of Git' },
          { type: 'text', value: '1. Modified — Changed but not staged\n2. Staged — Ready to commit\n3. Committed — Saved to repository' },
          { type: 'callout', value: '💡 Use "git status" to see which files are in which state.' },
        ],
        xp: 25,
      },
      {
        id: 'commits',
        title: 'Making Commits',
        content: [
          { type: 'text', value: 'A commit is a snapshot of your staged changes. Every commit has a unique hash, a message, and points to its parent(s).' },
          { type: 'code', value: '# Basic commit\ngit commit -m "Add login page"\n\n# Stage and commit all tracked files\ngit commit -am "Fix bug in auth"\n\n# Amend the last commit\ngit commit --amend -m "Updated message"' },
          { type: 'heading', value: 'Writing Good Commit Messages' },
          { type: 'text', value: '• Use imperative mood ("Add feature" not "Added feature")\n• Keep first line under 50 characters\n• Add details in the body if needed\n• Reference issues: "Fix #123"' },
          { type: 'callout', value: '💡 Each commit should be one logical change. Don\'t mix unrelated changes.' },
        ],
        xp: 25,
      },
      {
        id: 'git-log',
        title: 'Viewing History with Log',
        content: [
          { type: 'text', value: 'The git log command shows the commit history. There are many ways to format and filter it.' },
          { type: 'code', value: '# Basic log\ngit log\n\n# Compact one-line format\ngit log --oneline\n\n# Graph view\ngit log --oneline --graph --all\n\n# Show last 5 commits\ngit log -5\n\n# Show changes per commit\ngit log -p' },
          { type: 'heading', value: 'Filtering Log' },
          { type: 'code', value: '# By author\ngit log --author="John"\n\nBy date\ngit log --since="2024-01-01"\ngit log --after="1 week ago"\n\n# By file\ngit log -- src/index.js' },
          { type: 'callout', value: '💡 "git log --oneline --graph --all" is the most useful for visualizing branches.' },
        ],
        xp: 25,
      },
      {
        id: 'gitignore',
        title: 'Gitignore',
        content: [
          { type: 'text', value: 'The .gitignore file tells Git which files to ignore. This keeps sensitive data and build artifacts out of your repository.' },
          { type: 'code', value: '# .gitignore example\nnode_modules/\n.env\n*.log\ndist/\n.DS_Store' },
          { type: 'heading', value: 'Common Patterns' },
          { type: 'code', value: '# Ignore all .txt files\n*.txt\n\n# But keep important.txt\n!important.txt\n\n# Ignore everything in build/\nbuild/\n\n# Ignore all .log files in any directory\n**/*.log' },
          { type: 'callout', value: '💡 Create .gitignore at the start of your project. It\'s harder to remove tracked files later.' },
          { type: 'text', value: 'If you already committed files you want to ignore:\ngit rm --cached file.txt\ngit commit -m "Remove tracked file"' },
        ],
        xp: 25,
      },
    ],
  },
  {
    id: 'branching',
    title: 'Branching & Merging',
    description: 'Master branch creation, merging strategies, and conflict resolution.',
    level: 'Beginner',
    color: 'primary',
    icon: '🌿',
    lessons: [
      {
        id: 'what-are-branches',
        title: 'What are Branches?',
        content: [
          { type: 'text', value: 'Branches are independent lines of development. They let you work on features without affecting the main codebase.' },
          { type: 'code', value: '# List branches\ngit branch\n\n# Create a branch\ngit branch feature-login\n\n# Create and switch\ngit checkout -b feature-login\n\n# Modern syntax\ngit switch -c feature-login' },
          { type: 'heading', value: 'HEAD' },
          { type: 'text', value: 'HEAD is a pointer to the current branch (or commit). When you checkout a branch, HEAD moves to that branch\'s latest commit.' },
          { type: 'callout', value: '💡 Always create branches for new features. Keep main clean and deployable.' },
        ],
        xp: 25,
      },
      {
        id: 'switching-branches',
        title: 'Switching Branches',
        content: [
          { type: 'text', value: 'Switching branches changes your working directory to match the target branch. You need a clean working tree (no uncommitted changes).' },
          { type: 'code', value: '# Switch branches\ngit switch main\n\n# Switch and create\ngit switch -c new-feature\n\n# Old syntax (still works)\ngit checkout main' },
          { type: 'heading', value: 'Stashing Before Switch' },
          { type: 'code', value: '# Save uncommitted changes\ngit stash\n\n# Switch branch\ngit switch other-branch\n\n# Come back and restore\ngit switch main\ngit stash pop' },
          { type: 'callout', value: '💡 Git stashes are like a clipboard for your uncommitted changes.' },
        ],
        xp: 25,
      },
      {
        id: 'merging',
        title: 'Merging Branches',
        content: [
          { type: 'text', value: 'Merging combines the history of two branches. The target branch gets a new commit with both sets of changes.' },
          { type: 'code', value: '# Switch to the target branch\ngit switch main\n\n# Merge the feature branch\ngit merge feature-login\n\n# Merge with a merge commit\ngit merge --no-ff feature-login' },
          { type: 'heading', value: 'Fast-Forward vs Merge Commit' },
          { type: 'text', value: '• Fast-forward: When main hasn\'t changed, Git just moves the pointer\n• Merge commit: Creates a new commit combining both branches\n• --no-ff forces a merge commit even for fast-forwards' },
          { type: 'callout', value: '💡 Use --no-ff to preserve branch history. It makes it easier to understand the development flow.' },
        ],
        xp: 25,
      },
      {
        id: 'merge-conflicts',
        title: 'Resolving Merge Conflicts',
        content: [
          { type: 'text', value: 'Conflicts happen when both branches modify the same lines. Git can\'t decide which change to keep, so it asks you.' },
          { type: 'code', value: '# Conflict markers in file:\n<<<<<<< HEAD\nconst x = 1;\n=======\nconst x = 2;\n>>>>>>> feature\n\n# After resolving, mark as resolved\ngit add file.js\ngit commit' },
          { type: 'heading', value: 'Conflict Resolution Steps' },
          { type: 'text', value: '1. Identify the conflicting files: git status\n2. Open each file and find <<<<<<< markers\n3. Choose the correct code (or combine both)\n4. Remove the conflict markers\n5. Stage and commit' },
          { type: 'callout', value: '💡 Use "git merge --abort" to cancel a merge with conflicts and start over.' },
        ],
        xp: 30,
      },
      {
        id: 'deleting-branches',
        title: 'Deleting Branches',
        content: [
          { type: 'text', value: 'After merging a branch, delete it to keep your repository clean.' },
          { type: 'code', value: '# Delete a merged branch\ngit branch -d feature-login\n\n# Force delete (unmerged)\ngit branch -D feature-login\n\n# Delete remote branch\ngit push origin --delete feature-login' },
          { type: 'heading', value: 'Branch Naming Convention' },
          { type: 'text', value: '• feature/login-page\n• bugfix/header-align\n• hotfix/security-patch\n• release/v1.0.0' },
          { type: 'callout', value: '💡 Always delete branches after merging. Use descriptive names that explain the purpose.' },
        ],
        xp: 25,
      },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced Git',
    description: 'Interactive rebase, cherry-pick, stash, and Git internals.',
    level: 'Advanced',
    color: 'orange',
    icon: '⚡',
    lessons: [
      {
        id: 'interactive-rebase',
        title: 'Interactive Rebase',
        content: [
          { type: 'text', value: 'Interactive rebase lets you rewrite commit history — reorder, squash, edit, or drop commits.' },
          { type: 'code', value: '# Rebase last 3 commits\ngit rebase -i HEAD~3\n\n# In the editor:\npick abc1234 First commit\npick def5678 Second commit\npick ghi9012 Third commit\n\n# Change to:\npick abc1234 First commit\nsquash def5678 Second commit\npick ghi9012 Third commit' },
          { type: 'heading', value: 'Rebase Commands' },
          { type: 'text', value: '• pick — Keep the commit as-is\n• squash — Combine with previous commit\n• fixup — Like squash, discard the message\n• reword — Change the commit message\n• drop — Remove the commit entirely' },
          { type: 'callout', value: '⚠️ Never rebase commits that have been pushed to a shared branch.' },
        ],
        xp: 40,
      },
      {
        id: 'cherry-pick',
        title: 'Cherry Pick',
        content: [
          { type: 'text', value: 'Cherry-pick applies a specific commit from one branch to another. It\'s like copying a single commit.' },
          { type: 'code', value: '# Cherry-pick a commit\ngit cherry-pick abc1234\n\n# Cherry-pick a range\ngit cherry-pick abc1234..def5678\n\n# Cherry-pick without committing\ngit cherry-pick --no-commit abc1234' },
          { type: 'heading', value: 'When to Use' },
          { type: 'text', value: '• Backport a bug fix to an older branch\n• Apply a specific feature without merging everything\n• Recover a commit that was lost' },
          { type: 'callout', value: '💡 Cherry-pick creates a NEW commit with the same changes. The original commit still exists.' },
        ],
        xp: 35,
      },
      {
        id: 'git-stash',
        title: 'Git Stash',
        content: [
          { type: 'text', value: 'Stash temporarily shelves changes so you can work on something else, then come back later.' },
          { type: 'code', value: '# Stash current changes\ngit stash\n\n# Stash with a message\ngit stash push -m "WIP: login form"\n\n# List all stashes\ngit stash list\n\n# Apply most recent stash\ngit stash pop\n\n# Apply specific stash\ngit stash apply stash@{2}\n\n# Delete a stash\ngit stash drop stash@{0}' },
          { type: 'callout', value: '💡 Stashes are local. They\'re not pushed to the remote repository.' },
        ],
        xp: 30,
      },
      {
        id: 'git-reset',
        title: 'Reset & Revert',
        content: [
          { type: 'text', value: 'Reset moves HEAD backward. Revert creates a new commit that undoes changes. They serve different purposes.' },
          { type: 'code', value: '# Soft reset (keep changes staged)\ngit reset --soft HEAD~1\n\n# Mixed reset (keep changes, unstage)\ngit reset HEAD~1\n\n# Hard reset (discard everything)\ngit reset --hard HEAD~1\n\n# Revert (create undo commit)\ngit revert abc1234' },
          { type: 'heading', value: 'When to Use Each' },
          { type: 'text', value: '• reset --soft: Fix the last commit message or contents\n• reset --mixed: Unstage files\n• reset --hard: Discard all changes (dangerous!)\n• revert: Undo a commit on a shared branch safely' },
          { type: 'callout', value: '⚠️ "git reset --hard" is destructive. Use "git revert" for shared branches instead.' },
        ],
        xp: 35,
      },
      {
        id: 'git-reflog',
        title: 'Reflog — Recovery',
        content: [
          { type: 'text', value: 'Git keeps a log of all HEAD movements. Even "lost" commits can be recovered through reflog.' },
          { type: 'code', value: '# View reflog\ngit reflog\n\n# Recover a lost commit\ngit checkout abc1234\n\n# Create a branch from a lost commit\ngit branch recovered abc1234\n\n# Reset to a recovered state\ngit reset --hard abc1234' },
          { type: 'heading', value: 'Reflog is Your Safety Net' },
          { type: 'text', value: 'Reflog entries expire after 90 days by default. Even after a "git reset --hard", your commits still exist in reflog temporarily.' },
          { type: 'callout', value: '💡 "git reflog" is the first thing to try when you\'ve lost commits.' },
        ],
        xp: 30,
      },
    ],
  },
]

export function getModuleProgress(moduleId, completedLessons) {
  const mod = modules.find(m => m.id === moduleId)
  if (!mod) return 0
  const completed = mod.lessons.filter(l => completedLessons.includes(l.id)).length
  return Math.round((completed / mod.lessons.length) * 100)
}

export function getTotalLessons() {
  return modules.reduce((acc, m) => acc + m.lessons.length, 0)
}

export function getLessonById(lessonId) {
  for (const mod of modules) {
    const lesson = mod.lessons.find(l => l.id === lessonId)
    if (lesson) return { lesson, module: mod }
  }
  return null
}
