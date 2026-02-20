# AI Prototyping for Designers
**A practical guide to building real things with Claude Code + Cursor**
*From the Savvy Design Team*

---

## Prerequisites — Before you start

This section isn't part of the learning curve. It's just logistics. Get these sorted before you dive into the guide and you won't hit any surprise blockers later.

### Step 1: Request company access

Some of these tools require a paid seat or company account. Before doing anything else, reach out to Monica and ask for access to:

- **Claude** (claude.ai) — Anthropic's AI assistant, used throughout this guide
- **Claude Code** — Anthropic's AI coding tool that runs in Terminal
- **Cursor** — AI-powered code editor
- **Vercel** — deployment platform for sharing your prototypes

Ping Monica in Slack and she'll get you sorted. Don't skip this step — you'll need it before Day 1.

---

### Step 2: Create a GitHub account

**What GitHub is and why you need it**

GitHub is where code lives. Think of it the way you think of Figma for design files — it's a shared home for your projects, with version history built in.

When you build a prototype, your code lives in a **repository** (or "repo") — a folder that GitHub tracks. Every time you save a meaningful change, you create a **commit** — a snapshot of your project at that moment. This means you can always go back to an earlier version if something breaks. You can also share a repo with a teammate, and they can pick up where you left off.

You need GitHub for two reasons in this workflow. First, it's where your prototype code is stored, safe and versioned. Second, Vercel (the tool that gives your prototype a real URL) connects directly to GitHub — whenever you push code to GitHub, Vercel automatically redeploys your prototype. That's the deployment pipeline: GitHub stores your code, Vercel publishes it.

You don't need to deeply understand GitHub to use it in this workflow. There are really only three actions you'll use regularly:

- **Clone** — download a repo to your computer so you can work on it
- **Commit** — save a snapshot of your changes with a short description
- **Push** — send your local changes up to GitHub

Claude Code and Cursor can both do all three of these for you through conversation. You won't need to memorize commands.

**Create your account:**
1. Go to [github.com](https://github.com)
2. Click "Sign up" and create an account with your Savvy email
3. Choose the free plan — it's all you need for prototyping
4. Verify your email

---

### Step 3: Create a Vercel account

**What Vercel is and why you need it**

Right now, your prototypes only exist on your laptop. When you run `npm run dev`, you're visiting `localhost:3000` — a website that only lives on your machine. No one else can see it.

Vercel solves that. It takes your code from GitHub and publishes it to the internet, giving you a real URL like `my-prototype.vercel.app` that you can share with anyone — a stakeholder in a meeting, a PM on Slack, a user you're testing with. No installation, no special access required on their end. Just a link.

The deployment process is almost invisible once it's set up. You push code to GitHub, Vercel detects the change, rebuilds your app, and updates the live URL — usually in under a minute. This is called **continuous deployment**, and it means your shareable prototype always reflects your latest work.

Vercel is free for personal projects and prototyping. You won't need a paid plan for anything in this guide.

**Create your account:**
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose **Continue with GitHub** — this links your accounts automatically
3. Authorize Vercel to access your GitHub repositories
4. You're in. No project setup needed yet — you'll do that in Day 5.

---

### Step 4: Create a Cursor account

**What Cursor is** (you'll learn more in section 6, but you need the account now)

Cursor is a code editor — the app you'll use to read and write code — with AI built directly into it. It's where a lot of the hands-on prototype work happens.

**Install and create your account:**
1. Go to [cursor.com](https://cursor.com)
2. Download and install the Mac app
3. Open Cursor and sign up for an account (the Hobby plan is free and sufficient to start)
4. You'll be asked to connect your AI — you can skip this for now, you'll configure it in section 6

---

### Your prerequisites checklist

Before moving on, confirm you have all of these:

- [ ] Received company access to Claude, Claude Code, Cursor, and Vercel from Monica
- [ ] GitHub account created at github.com with your Savvy email
- [ ] Vercel account created at vercel.com, connected to GitHub
- [ ] Cursor downloaded, installed, and account created

Once these are checked off, you're ready. Start with section 1.

---

✨ **We'll cover the rest on Tuesday!**

The remaining sections of this guide will be unlocked in our Tuesday session together. Between now and then, your only job is to get through the checklist above. See you then.

---

<!-- LOCKED_CONTENT_START -->

## 1. Why we're going deeper than Figma

Figma is still home base. This isn't about replacing it.

But Figma prototypes have a ceiling. They can't show real data loading in from an API. They can't demonstrate what happens when a client has 47 accounts, or how a table behaves when a column is empty, or what a form actually feels like to tab through. And every time we hand a clickable prototype to an engineer, something gets lost in translation.

AI-assisted code prototypes close that gap. With Claude Code or Cursor, you can go from idea to a working, shareable URL in under an hour — no engineering sprint required. The output isn't production code, but it's real enough to test, share with stakeholders, and hand off with confidence.

There's a learning curve. We're not going to pretend otherwise. But you don't need to become an engineer. You need to get comfortable with a few new tools and a new mental model — and that's exactly what this guide is for.

---

## 2. Mental models before we start

Two concepts will make everything else in this guide click.

### Web app vs. desktop app

A **desktop app** is software installed on your computer — like Figma, Slack, or Spotify. It lives in your Applications folder.

A **web app** is software that runs in a browser — like Gmail, Notion, or the Savvy client dashboard. It lives at a URL.

When we build prototypes, we're building web apps. That means the output is a URL you can share with anyone, on any device, with no installation required. It also means the code runs in a browser, which shapes everything about how we build it.

### What "running locally" means

When you run a prototype on your own computer, you're spinning up a tiny pretend server. Your browser visits that server at a special address: `localhost:3000` (or similar). It looks and behaves like a real website — but it only exists on your machine.

This is called a **local development environment**. It sounds intimidating, but the mental model is simple: you're running a mini website on your laptop. When you're done, you stop the server and it goes away. Nothing is published to the internet.

When you're ready to share with someone else, you can deploy it to a real URL (Vercel makes this one command). But for prototyping, local is fine.

---

## 3. Getting comfortable with Terminal

Terminal is just a text-based way to talk to your computer. Instead of clicking icons, you type commands. That's it.

Most designers feel a flash of anxiety the first time they open it. The black screen, the blinking cursor, the lack of any visual affordance for what to do next. This is normal. It passes quickly once you know the six commands you'll actually use.

### Open Terminal
On Mac: `Cmd + Space` → type "Terminal" → Enter

### The 6 commands you need

| Command | What it does | Example |
|---|---|---|
| `pwd` | "Where am I?" Shows your current folder | `pwd` |
| `ls` | Lists everything in the current folder | `ls` |
| `cd` | Navigate into a folder | `cd Desktop` |
| `cd ..` | Go up one level | `cd ..` |
| `npm install` | Installs a project's dependencies | `npm install` |
| `npm run dev` | Starts your local development server | `npm run dev` |

**To stop a running server:** `Ctrl + C`

### How to read an error message

Errors look alarming. They're usually not. When something goes wrong in Terminal, read the last 2–3 lines first — that's almost always where the actual problem is described. Copy the error, paste it into Claude or Google. Engineers do this constantly.

### Try it now

Open Terminal and do this:
1. Type `pwd` and hit Enter. You'll see your current location.
2. Type `cd Desktop` and hit Enter. You've moved to your Desktop.
3. Type `ls` and hit Enter. You'll see everything on your Desktop.
4. Type `mkdir my-first-prototype` and hit Enter. You just created a folder.
5. Type `cd my-first-prototype` and hit Enter. You're inside it.

You just used Terminal. That's the hardest part — the first time.

---

## 4. Setting up your environment

Do this once. You won't have to do it again.

### Step 1: Install Node.js

Node.js is what lets your computer run JavaScript outside of a browser. You need it to run React projects locally.

Go to [nodejs.org](https://nodejs.org) and download the LTS version. Install it like any other Mac app. When it's done, verify it worked:

```
node --version
```

You should see something like `v20.11.0`. If you see a version number, you're good.

### Step 2: Install Claude Code

Claude Code is Anthropic's AI coding tool that runs directly in Terminal. It can read your files, write code, run commands, and iterate — all through a conversation interface.

```
npm install -g @anthropic-ai/claude-code
```

Once installed, navigate to a project folder and run:

```
claude
```

You'll be prompted to log in with your Anthropic account. After that, you're in.

### Step 3: Or install Cursor

Cursor is a code editor (like VS Code) with AI built in. It gives you a visual interface alongside the AI — you can see your files, preview changes, and chat with the AI in a sidebar panel.

Download from [cursor.com](https://cursor.com). Install like any Mac app. Open a project folder by dragging it onto the Cursor icon.

**Cursor vs. Claude Code: which should you use?**

Use **Claude Code** when you want to move fast and stay in Terminal — great for generating a full prototype from scratch.

Use **Cursor** when you want more visual control, want to see and navigate your files, or are making targeted edits to an existing prototype.

You'll probably end up using both.

### Step 4: Create your first project

In Terminal, navigate to where you want your project to live (e.g., your Desktop or a Projects folder), then run:

```
npx create-react-app my-prototype
cd my-prototype
npm run dev
```

Open your browser and go to `localhost:3000`. You should see the default React welcome page. You now have a working local development environment.

---

## 5. Building your first prototype with Claude Code

Let's build something real. We'll use a Savvy-flavored example: a client portfolio summary card.

### Starting a session

Navigate to your project folder in Terminal, then run:

```
claude
```

Claude Code will read your project files and be ready to help.

### How to prompt effectively

Claude Code works best when you give it context upfront. Don't just say what you want — tell it who you're building for, what the interface should feel like, and any constraints.

**Weak prompt:**
> Make a portfolio card component.

**Strong prompt:**
> I'm building a prototype for a wealth management platform. I need a client portfolio summary card component in React. It should show: client name, total portfolio value, YTD performance (positive/negative with color), and a list of 3 top holdings with ticker symbols and allocation percentages. Use a clean, minimal design with a white background, neutral typography, and a subtle border. No external UI libraries — just CSS modules or inline styles.

The more context you give, the closer the first output will be to what you want.

### Iterating through conversation

Once Claude Code generates something, keep the conversation going:

- *"The typography feels too large — scale everything down and add more breathing room between sections."*
- *"The negative performance should use a muted red, not a bright red. Something like #C0392B at 80% opacity."*
- *"Add a sparkline chart using only CSS — no chart libraries."*

You don't need to understand the code it writes. You need to be able to describe what's wrong and what you want instead — which is exactly what designers are already good at.

### Saving your work

Claude Code edits files directly. Your changes are saved automatically. To see updates in the browser, your dev server needs to be running (`npm run dev` in a separate Terminal window). React will hot-reload — the browser updates automatically when files change.

---

## 6. Cursor as your IDE

If Terminal-only feels like too much at first, Cursor gives you a visual layer on top.

### Opening a project

Open Cursor, then drag your project folder onto the app icon (or use File → Open Folder). You'll see your file tree on the left, just like Finder.

### The Composer panel

This is your main interface with the AI. Open it with `Cmd + I`. Type your request in natural language — Cursor will propose changes to your files, which you can review and accept or reject before they're applied.

This review step is Cursor's biggest advantage over Claude Code in Terminal: you can see exactly what's changing before it happens.

### Useful Cursor habits

- **Highlight code before prompting** — select a specific component or function, then open Composer. The AI will focus on just that selection.
- **Use `@filename`** — reference specific files in your prompt so Cursor knows what you're talking about.
- **Check the diff** — before accepting a change, scroll through the red/green diff view. You'll start to recognize patterns in the code even without fully understanding it.

---

## 7. Connecting Claude Code to Figma

This is where things get genuinely exciting. By connecting Claude Code to Figma via MCP (Model Context Protocol), you can point Claude at a specific Figma frame and ask it to turn that design into a working React component — with the right layout, colors, typography, and spacing pulled directly from your file.

### What MCP is (briefly)

MCP is a protocol that lets AI tools connect to external services. When you set up the Figma MCP, you're giving Claude Code permission to read your Figma files. It can then reference your actual designs when generating code — not just work from your text description.

### Step 1: Get your Figma access token

In Figma: go to your profile icon → Settings → Account → Personal access tokens → Generate new token. Copy it and keep it somewhere safe (like 1Password).

### Step 2: Configure the MCP connection

In your project folder, create a file called `.mcp.json`:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--figma-api-key=YOUR_TOKEN_HERE", "--stdio"]
    }
  }
}
```

Replace `YOUR_TOKEN_HERE` with the token you copied from Figma.

### Step 3: Restart Claude Code

Stop any running Claude Code session (`Ctrl + C`) and restart it in your project folder:

```
claude
```

You should see it confirm the Figma MCP is connected.

### Step 4: Point Claude at a Figma frame

Copy the link to a specific frame in Figma (right-click the frame → Copy link). Then in Claude Code:

> Here's a Figma frame I want to turn into a React component: [paste link]. Build me a pixel-accurate React component from this design. Use CSS modules for styling. Match the typography, spacing, and colors exactly.

Claude will read the Figma frame and generate a component based on what it sees.

### Setting honest expectations

The output won't be pixel-perfect on the first pass — especially for complex layouts. Think of it as a strong first draft that gets you 70–80% of the way there. You iterate from there, the same way you would with any Claude output.

Also: this works best with well-structured Figma files. Auto-layout frames, named layers, and defined styles all help Claude understand your design intent.

### A full workflow example

1. Design a client dashboard card in Figma with proper auto-layout and named layers
2. Copy the frame link
3. In Claude Code: *"Turn this Figma frame into a React component — [link]"*
4. Claude generates the component. Run `npm run dev` to see it in the browser.
5. Iterate: *"The padding on the inner container is too tight — add 8px more on all sides"*
6. When you're happy: deploy to Vercel with `npx vercel` and share the URL

Start to shareable prototype: under an hour.

---

## 8. Prompting patterns for designers

Copy, adapt, and make these your own.

### Generate a component from scratch
> I'm building a [type of interface] for [audience]. Create a React component for [specific element]. It should [describe behavior/content]. Design it to feel [aesthetic direction — clean/minimal/dense/etc.]. Use [white background / our brand colors / etc.]. No external libraries.

### Match an existing design system
> Here's the color palette and typography we use: [paste your tokens or describe them]. Generate a [component] that matches this system exactly. Use these exact hex values and font sizes.

### Add interactivity
> The component currently shows a static list. Add the ability to click any row to expand it and show [additional content]. Use a smooth CSS transition for the expand/collapse.

### Debug something that's broken
> This component isn't rendering correctly — [describe what's wrong]. Here's the current code: [paste code]. What's wrong and how do I fix it?

### Translate a Figma description to code
> I have a Figma component with the following properties: [describe layers, spacing, colors]. Build a React component that matches this structure. Use CSS modules.

---

## 9. When things break

Things will break. This is normal. Here's how to handle it.

### "Port 3000 is already in use"
Another dev server is running somewhere. Either stop it (`Ctrl + C` in the Terminal window running it) or run your new project on a different port: `npm run dev -- --port 3001`

### "Module not found" or "Cannot find package"
A dependency isn't installed. Run `npm install` in your project folder and try again.

### Claude generated code that won't compile
Copy the error from Terminal and paste it directly into your Claude Code session: *"I'm getting this error — [paste error]. How do I fix it?"* Claude will usually solve it immediately.

### The Figma MCP isn't connecting
Double-check your `.mcp.json` file — the token needs to be pasted exactly, no extra spaces. Make sure you've restarted Claude Code after creating the file.

### The output looks nothing like my Figma design
Your Figma file may not be structured clearly enough for Claude to read. Check that you're using auto-layout, that layers are named descriptively, and that you're linking to a specific frame (not a whole page). Try adding more context in your prompt about the design intent.

### I have no idea what I'm looking at in the code
That's fine. You don't need to understand every line. Describe what you want to change in plain English and let Claude handle the code. Over time, you'll start to recognize patterns — but that's a side effect, not a prerequisite.

---

## 10. Your first week

Low pressure. Concrete steps.

**Day 1 — Environment**
Get your environment running. Install Node.js, install Claude Code or Cursor, create a React project, and see `localhost:3000` in your browser. That's the whole goal.

**Day 2 — First component**
Ask Claude Code to build one component from scratch. Use a real Savvy use case — a data table, a summary card, a form. Don't aim for perfection. Just get something in the browser.

**Day 3 — Figma connection**
Set up the Figma MCP. Take one frame from a current project and ask Claude to turn it into a component. Compare what it generates with your design.

**Day 4 — Iterate**
Take whatever you built on Day 2 or 3 and spend 30 minutes improving it through conversation. Practice describing visual changes in words.

**Day 5 — Share**
Deploy your prototype to Vercel (`npx vercel` — it'll walk you through setup) and share the URL in #design. You built a real, shareable web app. That's worth celebrating.

---

## 11. Using AI tools efficiently — credits and model selection

AI coding tools aren't free to run. Every prompt you send uses credits, and the more powerful the model, the more credits it costs. Learning to use the right model for the right job — and to structure your prompts efficiently — will make your credits go a lot further.

### Understanding the model tiers

Both Claude and Cursor give you access to different models at different capability (and cost) levels. Think of them like tools in a toolbox — you wouldn't use a sledgehammer to hang a picture frame.

**Opus** is the most powerful and the most expensive. It's built for hard thinking — complex architecture decisions, understanding an unfamiliar codebase, debugging a gnarly problem you can't figure out, or generating a large feature from scratch with a lot of moving parts. Use it when you're stuck or when the task genuinely requires reasoning through something complicated. Don't burn Opus on simple tasks.

**Sonnet** is the sweet spot for most prototyping work. Fast, capable, and significantly cheaper than Opus. Use it for building components, iterating on layouts, making a series of targeted changes, or any task where you have a clear idea of what you want and just need it executed well.

**Haiku** (or equivalent lightweight models) is best for simple, mechanical tasks — updating a hex color value, changing a text string, reformatting a file, fixing a typo in code. If the task requires almost no judgment, use the cheapest model available.

**A simple rule of thumb:** if you could explain the task to a junior engineer in one sentence and they'd get it right, use a fast model. If you'd need to sit down and walk through it together, use Opus.

### How to switch models in Cursor

In the Composer panel, there's a model selector dropdown at the bottom of the input field. Click it to switch between Claude Opus, Sonnet, or Haiku before sending your prompt. Get in the habit of glancing at this before you hit Enter — it takes two seconds and can save a lot of credits over a week.

### How to switch models in Claude Code

In a Claude Code session, you can specify the model with a flag when you start:

```
claude --model claude-opus-4-5
claude --model claude-sonnet-4-5
claude --model claude-haiku-4-5
```

Or switch mid-session by typing `/model` and selecting from the list.

### Structuring prompts to use fewer credits

**Go big upfront.** The most expensive thing you can do is send five small prompts to do what one thorough prompt could have accomplished. Before you start a session, write out everything you want — all the changes, all the constraints, all the context — and send it as one prompt. Cursor and Claude Code both perform better with more context anyway.

**Tell it not to ask questions.** By default, AI tools will sometimes pause and check in. Add "don't ask clarifying questions, make reasonable decisions" to any big prompt and it'll complete the whole task in one pass.

**Highlight before prompting in Cursor.** Select only the code you want to change before opening Composer. If you don't highlight anything, Cursor scans your entire project for context — which costs more and can introduce noise. Scoping your selection keeps the AI focused and your credit usage low.

**Batch small changes.** Instead of sending three separate prompts to update a font size, change a border color, and adjust padding, combine them into one: "Make these three changes to the sidebar component — [list them]." Three prompts versus one is a 3x credit difference for the same outcome.

**Use Tab autocomplete for tiny edits.** In Cursor, if you're making a small code change — tweaking a number, updating a string — just start typing and let Tab autocomplete finish the line. This is free and instant. Reserve AI prompts for things that actually need reasoning.

**Don't re-explain context.** Claude Code maintains context within a session. If you've already told it what you're building and what the design system looks like, you don't need to repeat it every prompt. Just describe the change you want. Starting a new session does reset the context, so try to batch related work into a single session when you can.

### A practical credit budget mindset

Think of each session like a working meeting. Open it with a clear agenda (your big upfront prompt), use the right tool for each agenda item (model selection), and don't schedule five meetings to do what one could accomplish (batching). Close the session when you're done rather than leaving it idle.

Over time you'll develop an intuition for when something warrants Opus versus when Sonnet will nail it. When in doubt, start with Sonnet — you can always escalate to Opus if the output isn't quite right.

---

*Questions? Drop them in #design or tag Monica.*

<!-- LOCKED_CONTENT_END -->
