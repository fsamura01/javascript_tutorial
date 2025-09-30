# Interactive Rebasing

[Beginner’s Guide to Interactive Rebasing](https://hackernoon.com/beginners-guide-to-interactive-rebasing-346a3f9c3a6d)

## First Principle: What is Git tracking?

At its core, Git tracks **a sequence of snapshots** (commits) of your code over time. Each commit is like a node in a chain, pointing to its parent.

```txt
A --- B --- C --- D
```

## First Principle: What is a "rebase"?

**Rebase means "change the base"** - you're taking commits and replaying them on top of a different starting point. Think of it like:

- Picking up a sequence of changes
- Moving them to a new foundation
- Reapplying them one by one

## What you're looking at: Interactive Rebase

The text you shared is an **interactive rebase plan** - a to-do list that Git will execute. Let's decode it:

### The Basic Structure

```txt
pick 962cf72 Added 777. Swap Adjacent in LR String
pick bf6ca1a Added 809. Expressive Words
pick 9c4e4d8 Added leetcode problem 825 friends of appropriate ages
```

This means:

1. **"pick"** = keep this commit as-is
2. **Hash** (962cf72) = unique identifier for that commit
3. **Message** = what that commit did

### The Key Line

```txt
# Rebase 92c996e..9c4e4d8 onto 92c996e (3 commands)
```

This tells you:

- **Starting point**: 92c996e (the base you're rebasing onto)
- **Range**: 92c996e..9c4e4d8 (the commits being moved)
- **Count**: 3 commits will be processed

## Core Concept: Why Interactive?

"Interactive" means **you get to edit the plan before Git executes it**. You can:

### 1. **Reorder commits** (change history sequence)

```txt
pick bf6ca1a Added 809. Expressive Words
pick 962cf72 Added 777. Swap Adjacent in LR String
pick 9c4e4d8 Added leetcode problem 825 friends...
```

### 2. **Squash commits** (combine multiple into one)

```txt
pick 962cf72 Added 777. Swap Adjacent in LR String
squash bf6ca1a Added 809. Expressive Words
```

Result: Both changes in one commit

### 3. **Drop commits** (remove from history)

```txt
pick 962cf72 Added 777. Swap Adjacent in LR String
drop bf6ca1a Added 809. Expressive Words
pick 9c4e4d8 Added leetcode problem 825 friends...
```

### 4. **Edit commits** (pause to modify)

```txt
edit 962cf72 Added 777. Swap Adjacent in LR String
```

Git stops here, letting you change files or split the commit

### 5. **Reword commits** (change the message)

```txt
reword 962cf72 Added 777. Swap Adjacent in LR String
```

Opens editor to change commit message

## Mental Model: The Recipe Analogy

Think of your commits as **steps in a recipe**:

- **pick** = do this step exactly as written
- **reword** = do the step but rename it
- **edit** = pause here so I can adjust ingredients
- **squash** = combine this step with the previous one
- **drop** = skip this step entirely
- **reorder lines** = change the order of steps

## Why Would You Use This?

**Clean up history before sharing**. Example:

Before (messy):

```txt
- Added feature X
- Fixed typo
- Actually fixed feature X
- Fixed another typo
```

After (clean):

```txt
- Added feature X (all fixes squashed in)
```

## What Happens When You Save and Close?

Git executes your plan **line by line, top to bottom**:

1. Starts at the base commit (92c996e)
2. Applies first commit (962cf72)
3. Applies second commit (bf6ca1a)
4. Applies third commit (9c4e4d8)
5. Your branch now points to the new history

## Key Insight: You're Rewriting History

This is powerful but dangerous:

- ✅ Great for **local** commits you haven't shared
- ⚠️ Problematic for commits others are using (breaks their work)

---

Does this help clarify the concept? Would you like me to walk through a specific scenario or explain any of the other commands (exec, merge, etc.)?
