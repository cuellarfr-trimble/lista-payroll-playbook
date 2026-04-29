# Trimble Construction AI Prototyping Playbook
**A practical guide to building real things with Cursor**

---

## Prerequisites — Before you start

This section isn't part of the learning curve. It's just logistics. Get these sorted before you dive into the guide and you won't hit any surprise blockers later.

### Step 1: Request company access

Some of these tools require a paid seat or company account. Before doing anything else, [reach out to the Cloud team and ask for access](https://trimblecloudops.atlassian.net/servicedesk/customer/portal/6/create/731) to:

- **Cursor** — AI-powered code editor

You will receive a confirmation email once your manager approves the request. 

---

### Step 2: Create a GitHub account

**What GitHub is and why you need it**

GitHub is where code lives. Think of it the way you think of Figma for design files — it's a shared home for your projects, with version history built in.

When you build a prototype, your code lives in a **repository** (or "repo") — a folder that GitHub tracks. Every time you save a meaningful change, you create a **commit** — a snapshot of your project at that moment. This means you can always go back to an earlier version if something breaks. You can also share a repo with a teammate, and they can pick up where you left off.

You need GitHub for two reasons in this workflow. First, it's where your prototype code is stored, safe and versioned. Second, Netlify (the tool that gives your prototype a real URL) connects directly to GitHub — whenever you push code to GitHub, Netlify automatically redeploys your prototype. That's the deployment pipeline: GitHub stores your code, Netlify publishes it.

You don't need to deeply understand GitHub to use it in this workflow. There are really only three actions you'll use regularly:

- **Clone** — download a repo to your computer so you can work on it
- **Commit** — save a snapshot of your changes with a short description
- **Pull** — download the latest changes from Github to your computer
- **Push** — send your local changes up to GitHub

Cursor can do all four of these for you through conversation. You won't need to memorize commands.

**Create your account:**
1. Go to [github.com](https://github.com)
2. Click "Sign up" and create an account with your Trimble email
3. Choose the free plan — it's all you need for prototyping
4. Verify your email

---

### Step 3: Create a Netlify account

**What Netlify is and why you need it**

Right now, your prototypes only exist on your laptop. When you run `npm run dev`, you're visiting `localhost:3000` — a website that only lives on your machine. No one else can see it.

Netlify solves that. It takes your code from GitHub and publishes it to the internet, giving you a real URL like `my-prototype.netlify.app` that you can share with anyone — a stakeholder in a meeting, a PM on Slack, a user you're testing with. No installation, no special access required on their end. Just a link.

The deployment process is almost invisible once it's set up. You push code to GitHub, Netlify detects the change, rebuilds your app, and updates the live URL — usually in under a minute. This is called **continuous deployment**, and it means your shareable prototype always reflects your latest work.

Netlify is free for personal projects and prototyping. You won't need a paid plan for anything in this guide.

**Create your account:**
1. Go to [netlify.com](https://netlify.com)
2. Click "Sign Up" and choose **GitHub** — this links your accounts automatically
3. Authorize Netlify to access your GitHub repositories
4. You're in. No project setup needed yet — you'll do that later.

---

### Step 4: Create a Cursor account

**What Cursor is** (you'll learn more in section 6, but you need the account now)

Cursor is a code editor — the app you'll use to read and write code — with AI built directly into it. It's where a lot of the hands-on prototype work happens.

**Install and create your account:**
1. Go to [cursor.com](https://cursor.com)
2. Download and install the Mac app
3. Open Cursor and use your email to sign in. This will redirect you to Okta for authentication.
4. You'll be asked to connect your AI — you can skip this for now, you'll configure it in section 6

---

### Your prerequisites checklist

Before moving on, confirm you have all of these:

- [ ] Received company access to Cursor
- [ ] GitHub account created at github.com with your Trimble email
- [ ] Netlify account created at netlify.com, connected to GitHub
- [ ] Cursor downloaded, installed, and account created

Once these are checked off, you're ready. Start with section 1.

---

## 1. Why we're going deeper than Figma

Figma is still home base. This isn't about replacing it.

But Figma prototypes have a ceiling. They can't show real data loading in from an API. They can't demonstrate what happens when a client has 47 accounts, or how a table behaves when a column is empty, or what a form actually feels like to tab through. And every time we hand a clickable prototype to an engineer, something gets lost in translation.

AI-assisted code prototypes close that gap. With Cursor, you can go from idea to a working, shareable URL in under an hour — no engineering sprint required. The output isn't production code, but it's real enough to test, share with stakeholders, and hand off with confidence.

There's a learning curve. We're not going to pretend otherwise. But you don't need to become an engineer. You need to get comfortable with a few new tools and a new mental model — and that's exactly what this guide is for.

---

## 2. Mental models before we start

One concept will make everything else in this guide click.

### What "running locally" means

When you run a prototype on your own computer, you're spinning up a tiny pretend server. Your browser visits that server at a special address: `localhost:3000` (or similar). It looks and behaves like a real website — but it only exists on your machine.

This is called a **local development environment**. It sounds intimidating, but the mental model is simple: you're running a mini website on your laptop. When you're done, you stop the server and it goes away. Nothing is published to the internet.

When you're ready to share with someone else, you can deploy it to a real URL (Netlify makes this easy). But for prototyping, local is fine.

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

Errors look alarming. They're usually not. When something goes wrong in Terminal, read the last 2–3 lines first — that's almost always where the actual problem is described. Copy the error, paste it into Gemini. Engineers do this constantly.

---

## 4. Setting up your environment

Do this once. You won't have to do it again.

### Step 1: Install Homebrew

Homebrew is a package manager for Mac — think of it as an app store you control from Terminal. It's the most reliable way to install developer tools like Node.js, and once it's set up, future installs are a single command.

In Terminal, paste this and hit Enter:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

This will take 2–3 minutes. It may ask for your Mac password — type it and hit Enter (you won't see the characters as you type, that's normal). Wait for it to finish before doing anything else.

When it's done, verify it worked:

```
brew --version
```

You should see something like `Homebrew 5.1.0`. If you do, you're good.

### Step 2: Install Node.js via Homebrew

Node.js is what lets your computer run JavaScript outside of a browser. You need it to run React projects locally.

```
brew install node
```

This takes about a minute. When it's done, verify:

```
node --version
```

You should see something like `v20.11.0`. If you see a version number, you're good.


### Step 3 Install Cursor

Cursor is a code editor (like VS Code) with AI built in. It gives you a visual interface alongside the AI — you can see your files, preview changes, and chat with the AI in a sidebar panel.

Download from [cursor.com](https://cursor.com). Install like any Mac app. Open a project folder by dragging it onto the Cursor icon.


---

## 5. Building your first prototype with Cursor

Let's build something real. But first, let's configure Cursor with the Modus design system so your prototypes look and feel like Trimble products from the start.

### Setting up Modus in Cursor (one-step setup)

The [Modus design system](https://modus.trimble.com) provides a one-step setup that automatically configures Cursor with everything you need to build Trimble-styled prototypes. A single prompt — pasted into Cursor — installs three things:

**1. Modus Docs MCP** — an MCP server that gives Cursor's AI direct access to Modus Web Components documentation. Instead of guessing how components work, the AI can look up the real API. The MCP config that gets added to your `~/.cursor/mcp.json` looks like this:

```json
{
  "mcpServers": {
    "modus-docs": {
      "command": "npx",
      "args": ["-y", "@trimble-oss/moduswebcomponents-mcp@latest"]
    }
  }
}
```

**2. Modus Rules** — seven rule files installed as Cursor user rules (in `~/.cursor/rules/`). These teach the AI how to write code that follows Trimble's standards:

| Rule file | What it covers |
|---|---|
| `modus-essentials.mdc` | Core checklist — packages, styles, theme, events, UX |
| `modus-wc-integration.mdc` | Cross-stack pitfalls — shadow DOM, events, MCP |
| `modus-setup.mdc` | Long-form patterns, examples, and checklists |
| `modus-accessibility.mdc` | WCAG 2.1 AA compliance and inclusive UX |
| `modus-typography.mdc` | Typography component usage and tokens |
| `modus-layout.mdc` | Card layouts, spacing, and multi-card pages |
| `modus-nextjs.mdc` | Next.js App Router integration |

**3. Modus Skills** — seven skill folders installed in `~/.cursor/skills/`, each with a `SKILL.md` file. Skills give the AI step-by-step workflows for specific component patterns:

| Skill folder | What it does |
|---|---|
| `modus-wc-autocomplete` | Autocomplete component setup |
| `modus-wc-chart-colors` | Chart color tokens for light and dark themes |
| `modus-wc-icons-setup` | Icon setup and usage |
| `modus-wc-mcp` | MCP integration patterns |
| `modus-wc-nextjs` | Next.js-specific patterns |
| `modus-wc-react-slotted-hosts` | React slotted host components |
| `modus-wc-side-navigation` | Side navigation component |

**How to run the one-step setup:**

1. Open Cursor and press `Cmd + I` to open Composer
2. Make sure you're in **Agent** mode (check the dropdown at the bottom of Composer)
3. Go to the [Modus AI Training — One-Step Setup](https://modus.trimble.com/modus-ai/ai-training/create-prototypes/one-step-setup) page
4. Click **Copy One-Step Setup Prompt**
5. Paste the prompt into Cursor's Composer and hit Enter
6. Cursor's AI will handle the rest — installing the MCP server, downloading rules, and setting up skills

When it finishes, restart Cursor so the MCP connection initializes. You can verify the setup by going to **Cursor → Settings → Cursor Settings → Tools & MCP** and confirming that **modus-docs** is listed and connected.

> **Important:** Node.js must be installed before running the one-step setup (you did this in section 4). The MCP server uses `npx` to run, which comes with Node.

### Also recommended: Playwright MCP

While you're setting up MCP servers, add **Playwright** to your `~/.cursor/mcp.json`. Playwright gives Cursor the ability to open a browser, navigate your prototype, take screenshots, click elements, and fill in forms — essentially letting the AI see and test what it builds.

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

With Playwright connected, you can ask Cursor things like *"Open the prototype in a browser and check if the sidebar navigation works"* or *"Take a screenshot of the dashboard and tell me if anything looks off."* It's especially useful for catching layout issues and testing interactive flows without switching to the browser yourself.

### Also recommended: Context7 MCP

**Context7** gives Cursor access to up-to-date documentation for any library or framework you're using. Instead of relying on the AI's training data (which can be months out of date), Context7 pulls the latest docs on demand — React, Next.js, Tailwind, or any other package.

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {}
    }
  }
}
```

This is useful when Cursor generates code using a deprecated API or an outdated pattern. With Context7, the AI can look up the current docs and get it right the first time.

---

### Your first prompt

Now that Modus is configured, let's build something. We'll use a Trimble-flavored example: a client portfolio summary card.

Open Cursor and press `Cmd + I` to open Composer. Try this prompt:

> Build a new React + Vite analytics dashboard app. Use Modus web components and use the Modus Docs MCP, Modus Essential Rules, Modus Layout Rules, Modus Setup Rules, Modus Side Nav Skill, and Modus Icon Skill to implement. Run dev server when app is ready.

This is the recommended first prompt from the Modus AI training. It tells Cursor to use the rules, skills, and MCP you just installed. Cursor will scaffold a complete app, install dependencies, and start the dev server for you.

### How to prompt effectively

Cursor works best when you give it context upfront. Don't just say what you want — tell it who you're building for, what the interface should feel like, and any constraints.

**Weak prompt:**
> Make a portfolio card component.

**Strong prompt:**
> I'm building a prototype for a wealth management platform. I need a client portfolio summary card component in React. It should show: client name, total portfolio value, YTD performance (positive/negative with color), and a list of 3 top holdings with ticker symbols and allocation percentages. Use Modus web components for the card and typography. Follow the Modus layout rules for spacing.

The more context you give, the closer the first output will be to what you want.

### Iterating through conversation

Once Cursor generates something, keep the conversation going:

- *"The typography feels too large — scale everything down and add more breathing room between sections."*
- *"The negative performance should use a muted red, not a bright red. Something like #C0392B at 80% opacity."*
- *"Add a sparkline chart using the Modus chart colors skill."*

You don't need to understand the code it writes. You need to be able to describe what's wrong and what you want instead — which is exactly what designers are already good at.

### Saving your work

Cursor edits files directly. Your changes are saved automatically. To see updates in the browser, your dev server needs to be running (`npm run dev` in a separate Terminal window or in Cursor's built-in terminal). React will hot-reload — the browser updates automatically when files change.

---

## 6. Cursor as your IDE

Cursor gives you a visual layer alongside the AI — you can see your files, preview changes, and chat with the AI in a sidebar panel.

### Opening a project

Open Cursor, then drag your project folder onto the app icon (or use File → Open Folder). You'll see your file tree on the left, just like Finder.

### The Composer panel

This is your main interface with the AI. Open it with `Cmd + I`. Type your request in natural language — Cursor will propose changes to your files, which you can review and accept or reject before they're applied.

This review step is Cursor's biggest advantage: you can see exactly what's changing before it happens.

### Useful Cursor habits

- **Highlight code before prompting** — select a specific component or function, then open Composer. The AI will focus on just that selection.
- **Use `@filename`** — reference specific files in your prompt so Cursor knows what you're talking about.
- **Check the diff** — before accepting a change, scroll through the red/green diff view. You'll start to recognize patterns in the code even without fully understanding it.

---

## 7. Connecting Cursor to Figma

This is where things get exciting. By connecting Cursor to Figma, you can go straight from a Figma design to working code — paste a frame link into Cursor, and the AI reads your layers, spacing, colors, and components to generate a matching React component.

This is a one-way connection: Figma → Code. You can pull designs into Cursor, but you can't push code back to Figma. That's fine for prototyping — the goal is to get from design to a working, shareable URL as fast as possible.

### Setting up the Figma MCP server

Figma has a built-in plugin that makes setup easy — no API tokens or config files to edit manually.

1. Open Cursor's command palette: `Cmd + Shift + P`
2. Search for **"Open chat"** and select it
3. Type `/add-plugin figma` and hit Enter
4. Click **Add Plugin** to install
5. Open the command palette again (`Cmd + Shift + P`) and search for **"Cursor Settings"**
6. Select **Tools & MCP**
7. Under "Installed MCP Servers," find **Figma** and click **Connect** to authenticate

That's it. Cursor now has access to your Figma files.

> **Note:** If your organization requires the Desktop version instead of the Remote server, see [Figma's setup guide](https://help.figma.com/hc/en-us/articles/39889260656407-Cursor-and-Figma-Set-up-the-MCP-server) for the Desktop MCP option, which runs locally through the Figma desktop app.

---

### Using Figma designs in your prototypes

With the connection active, you can now reference Figma designs directly in Cursor. Copy a frame link from Figma and paste it into your prompt:

> Build a React component from this Figma frame — [paste frame link]. Use Modus web components and follow our design system tokens.

Cursor reads the design and generates code. Run `npm start` to see it in the browser.

### A typical Figma-to-code workflow

1. Design a component in Figma with auto-layout and named layers
2. Copy the frame link from Figma
3. In Cursor: *"Build a React component from this Figma frame — [paste frame link]"*
4. Cursor reads the design and generates code. Run `npm start` to see it in the browser.
5. Iterate in Cursor: *"The padding feels tight — add 8px on all sides and soften the border radius"*
6. Deploy to Netlify and share the URL

Design to shareable prototype: under an hour.

### Tips for better Figma-to-code results

- **Use auto-layout** — Cursor translates auto-layout into flexbox, which produces much cleaner code than absolute positioning.
- **Name your layers descriptively** — "Header", "Sidebar", "ClientCard" are far more useful than "Frame 47" or "Group 12".
- **Link to a specific frame** — don't link to an entire Figma page. The more focused the frame, the better the output.
- **Add context in your prompt** — tell Cursor what the component is for and how it should behave, not just what it looks like.

---

### Troubleshooting

**The Figma server doesn't appear after setup** — open the command palette (`Cmd + Shift + P`), search for "Cursor Settings," go to Tools & MCP, and check if Figma is listed. Try clicking Connect again or restart Cursor.

**Authentication failed** — make sure you're signed into Figma in your browser. The Connect flow opens a browser tab for OAuth. If it times out, try again.

**Cursor can't read a specific Figma file** — check that you have at least view access to the file in Figma. The MCP server uses your Figma account permissions.

---

## 8. Prompting patterns for designers

Copy, adapt, and make these your own.

### Generate a component from scratch
> I'm building a [type of interface] for [audience]. Create a React component for [specific element]. It should [describe behavior/content]. Design it to feel [aesthetic direction — clean/minimal/dense/etc.]. Use Modus web components and follow Modus layout rules. No additional external UI libraries.

### Match an existing design system
> Here's the color palette and typography we use: [paste your tokens or describe them]. Generate a [component] that matches this system exactly. Use these exact hex values and font sizes.

### Add interactivity
> The component currently shows a static list. Add the ability to click any row to expand it and show [additional content]. Use a smooth CSS transition for the expand/collapse.

### Debug something that's broken
> This component isn't rendering correctly — [describe what's wrong]. Here's the current code: [paste code]. What's wrong and how do I fix it?

### Translate a Figma description to code
> I have a Figma component with the following properties: [describe layers, spacing, colors]. Build a React component that matches this structure. Use Modus web components where possible.

---

## 9. When things break

Things will break. This is normal. Here's how to handle it.

### "Port 3000 is already in use"
Another dev server is running somewhere. Either stop it (`Ctrl + C` in the Terminal window running it) or run your new project on a different port: `npm run dev -- --port 3001`

### "Module not found" or "Cannot find package"
A dependency isn't installed. Run `npm install` in your project folder and try again.

### Cursor generated code that won't compile
Copy the error from Terminal and paste it directly into Cursor's Composer: *"I'm getting this error — [paste error]. How do I fix it?"* Cursor will usually solve it immediately.

### The Figma MCP isn't connecting
Double-check your `~/.cursor/mcp.json` file — the URL and token need to be correct, no extra spaces. Make sure you've restarted Cursor after editing the file.

### The Modus MCP isn't working
Go to **Cursor → Settings → Cursor Settings → Tools & MCP** and check that **modus-docs** is listed and connected. If it's erroring, make sure Node.js is installed (`node --version` in Terminal). Try restarting Cursor.

### The output looks nothing like my Figma design
Your Figma file may not be structured clearly enough for the AI to read. Check that you're using auto-layout, that layers are named descriptively, and that you're linking to a specific frame (not a whole page). Try adding more context in your prompt about the design intent.

### I have no idea what I'm looking at in the code
That's fine. You don't need to understand every line. Describe what you want to change in plain English and let Cursor handle the code. Over time, you'll start to recognize patterns — but that's a side effect, not a prerequisite.

---

## 10. Using AI tools efficiently — credits and model selection

AI coding tools aren't free to run. Every prompt you send uses credits, and the more powerful the model, the more credits it costs. Learning to use the right model for the right job — and to structure your prompts efficiently — will make your credits go a lot further.

### Understanding the model tiers

Cursor gives you access to different models at different capability (and cost) levels. Think of them like tools in a toolbox — you wouldn't use a sledgehammer to hang a picture frame.

**Composer 2** is Cursor's own model, tuned specifically for multi-file edits and agent-style runs. It's the default for a reason — fast, capable, and optimized for the kinds of tasks you'll do most: building components, iterating on layouts, wiring up pages. For most prototyping work, this is the one to use.

**Composer 2 Fast** is the lightweight version of Composer 2. Use it for simple, mechanical tasks — updating a hex color value, changing a text string, reformatting a file, fixing a typo. If the task requires almost no judgment, this saves credits without losing quality.

**Claude Opus** (Anthropic) is the most powerful reasoning model available in Cursor. It's built for hard thinking — complex architecture decisions, debugging gnarly problems you can't figure out, or generating a large feature from scratch with a lot of moving parts. Use it when you're stuck or when the task genuinely requires reasoning through something complicated. Don't burn Opus on simple tasks.

**Claude Sonnet** (Anthropic) sits between Composer 2 and Opus. Strong reasoning and instruction-following with generous context. Good for careful refactors, large-diff review, and spec-to-code work when you want the model to read deeply before it edits.

**GPT-5.5** (OpenAI) is another high-capability option. Broad coding knowledge and solid tool use — useful as an alternative perspective when Composer 2 or Sonnet output isn't quite landing, or when your team standardizes on OpenAI models.

**Auto mode** lets Cursor pick the model for you based on the complexity of your prompt. It routes simple tasks to fast models and complex tasks to stronger ones. This is a good default if you don't want to think about model selection — it won't always be optimal, but it prevents the most common mistake (burning expensive models on trivial edits).

**A simple rule of thumb:** if you could explain the task to a junior engineer in one sentence and they'd get it right, use Composer 2 Fast or Auto. If you'd need to sit down and walk through it together, use Opus.

### How to switch models in Cursor

In the Composer panel, there's a model selector dropdown at the bottom of the input field. Click it to switch between models before sending your prompt. Get in the habit of glancing at this before you hit Enter — it takes two seconds and can save a lot of credits over a week. If you're unsure, set it to **Auto** and let Cursor decide.

Over time you'll develop an intuition for when something warrants Opus versus when Composer 2 will nail it. When in doubt, start with Auto or Composer 2 — you can always escalate to Opus if the output isn't quite right.

---

## 11. Git basics for designers

You've been using Git without realizing it. Every time Cursor commits your changes or you push code to GitHub, you're using Git. This section gives you just enough understanding to work confidently — not to become a Git expert.

### The mental model

Think of Git like a timeline for your project. Every commit is a snapshot — a save point you can always go back to. A branch is an alternate timeline where you can try things without affecting the original.

```
main        ● ─── ● ─── ● ─── ● ─── ●
                         \           ↗
feature      	           ● ─── ● ─
```

The `main` branch is the stable version of your project. When you start working on something new, you create a branch — a copy where your changes live in isolation. When you're happy with the work, you merge the branch back into `main`.

### Key concepts

**Commit** — a save point. Each commit has a short message describing what changed. Think of it like "Save As" but smarter — Git only stores what's different, and you can go back to any previous commit.

**Branch** — a parallel version of your project. You work on a branch so your experiments don't break the stable version. The naming convention is usually descriptive: `feature/dashboard-cards`, `fix/mobile-layout`.

**Pull Request (PR)** — a request to merge your branch into `main`. This is where teammates can review your changes before they go live. Even if you're working solo, PRs create a clean history of what changed and why.

**Merge** — combining your branch back into `main`. If two people changed the same file, Git will ask you to resolve the conflict (pick which version to keep). Cursor can help with this.

### How Cursor handles Git for you

You don't need to memorize commands. In Cursor's Composer, you can say:

- *"Create a new branch called feature/payroll-dashboard"*
- *"Commit my changes with the message 'Add employee summary card'"*
- *"Push my changes to GitHub"*
- *"Create a pull request for this branch"*

Cursor also has a built-in **Source Control** panel (click the branch icon in the left sidebar) where you can see changed files, stage changes, and commit — all with clicks, no Terminal required.

### A safe workflow

1. **Before starting new work:** Make sure you're on `main` and pull the latest changes
2. **Create a branch** for each feature or experiment
3. **Commit often** — small, frequent commits are safer than one giant save at the end
4. **Push to GitHub** regularly — this is your backup
5. **Open a PR** when the work is ready for review or when you want to deploy

If something goes wrong on a branch, `main` is untouched. You can always start a fresh branch. This safety net is why branching matters — it makes experimentation free.

---

## 12. Deploying your prototype to Netlify

You've built something on your laptop. Now let's put it on the internet so anyone can see it.

### First-time setup: connect GitHub to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub** and authorize Netlify if you haven't already
4. Select your prototype's repository from the list
5. Netlify will auto-detect the build settings. For a React app, confirm:
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
6. Click **Deploy site**

Netlify will build your project and give you a URL like `random-name-1234.netlify.app`. You can customize this under **Site settings → Domain management → Custom domains** to something like `my-prototype.netlify.app`.

### Automatic deploys

Once connected, every time you push code to the `main` branch on GitHub, Netlify automatically rebuilds and updates your live URL. You don't need to do anything — push your code, wait about a minute, and the live site reflects your latest changes.

This is why the Git workflow from section 11 matters: push to `main` and your prototype is live.

### Deploy previews for branches

Netlify also creates **deploy previews** for pull requests. When you open a PR on GitHub, Netlify builds that branch and gives it a temporary URL. This is incredibly useful — you can share a preview link with a stakeholder before merging, so they see exactly what they're approving.

### Manual deploys from Cursor

If you want to deploy without pushing to GitHub first, you can use the Netlify CLI. In Cursor's terminal or Composer:

```
npx netlify-cli deploy --prod --dir=build
```

The first time you run this, it'll ask you to log in and link your site. After that, it's a one-command deploy.

### Common deployment issues

**Build fails on Netlify but works locally** — usually a case sensitivity issue. Mac file systems are case-insensitive (`Header.js` and `header.js` are the same file), but Netlify's Linux build is case-sensitive. Check your import statements.

**Site deploys but shows a blank page** — check that your `build` directory contains an `index.html`. For Create React App projects, make sure the `homepage` field in `package.json` is set correctly (or remove it entirely for Netlify).

---

## 13. Connecting to Azure DevOps or Jira

When you're building prototypes for a real project, the requirements already live somewhere — usually Azure DevOps or Jira. Instead of re-typing context into Cursor, you can pull work items directly into your prompts.

### The concept

Project management tools store structured information about features: user stories, acceptance criteria, priority, linked designs. Giving this context to Cursor means the AI understands not just *what* to build, but *why* — who the user is, what the edge cases are, and what "done" looks like.

### Connecting Azure DevOps via MCP

The best approach is to give Cursor direct access to Azure DevOps through an MCP server. This lets the AI read your work items, search backlogs, and pull context automatically — no copy-pasting needed.

Add the Azure DevOps MCP entry to your `~/.cursor/mcp.json` file, inside the existing `mcpServers` object:

```json
{
  "mcpServers": {
    "ado": {
      "command": "npx",
      "args": ["-y", "@azure-devops/mcp", "ViewpointVSO", "-d", "core", "search", "work", "work-items"]
    }
  }
}
```

Restart Cursor after saving. You can verify the connection in **Cursor → Settings → Cursor Settings → Tools & MCP** — look for **ado** in the server list.

Once connected, you can reference work items directly in your prompts:

> Look up user story #4521 in Azure DevOps. Build a React component for it using Modus web components. Follow the Modus layout rules.

Cursor will pull the story title, description, and acceptance criteria from Azure DevOps and use them as context for generating the prototype.

### Using Jira issues

If your team uses Jira instead, copy the issue details — summary, description, acceptance criteria, and any linked design notes — and paste them into Cursor's Composer as part of your prompt. Jira's structured fields translate naturally into AI context.

> Here's the user story I'm working on:
>
> **As a** construction business owner **I want to** see a summary of upcoming payroll obligations **so that** I can plan cash flow for the week.
>
> Acceptance criteria:
> - Show next payroll date and estimated total
> - Show breakdown by W-2 vs 1099 workers
> - Flag any employees with missing tax info
>
> Build a React component for this using Modus web components. Follow the Modus layout rules.

### Tips for better results

- **Include the persona** — if your work item references a specific user type, include that context. "Sandra is a bookkeeper managing payroll for multiple clients" gives the AI much better judgment about UI density and workflow.
- **Include acceptance criteria** — these translate directly into UI states and edge cases the prototype should handle.
- **Reference related items** — if a story depends on another feature, mention it so the AI understands the broader context.
- **Don't paste the entire epic** — focus on the specific story or task you're prototyping. Too much context dilutes the prompt.

---

## 14. Running accessibility audits

Every prototype should be usable by everyone. Accessibility isn't a nice-to-have — it's a Trimble standard. The good news: if you set up Modus in section 5, you already have the `modus-accessibility.mdc` rule installed, which means Cursor's AI is already writing more accessible code by default.

But rules alone aren't enough. Running a quick audit after each prototype catches issues early, before they get baked into the final product.

### Ask Cursor to audit your prototype

The simplest approach — paste this into Composer after building a feature:

> Run an accessibility audit on this prototype. Check for:
> - Missing alt text on images
> - Color contrast ratios (WCAG 2.1 AA minimum)
> - Keyboard navigation (can I tab through all interactive elements?)
> - Missing form labels
> - Correct heading hierarchy (h1 → h2 → h3, no skipped levels)
> - ARIA attributes where needed
>
> Fix any issues you find and explain what you changed.

Cursor will scan the code, identify problems, and fix them in one pass. Review the changes in the diff view to understand what was wrong.

### Use your browser's built-in tools

Chrome and Edge have accessibility auditing built in. No extensions needed.

1. Open your prototype in the browser (`localhost:3000`)
2. Open DevTools (`Cmd + Option + I`)
3. Go to the **Lighthouse** tab
4. Check only **Accessibility** and click **Analyze page load**
5. You'll get a score out of 100 and a list of specific issues with links to explanations

A score of 90+ is the target. Common issues for prototypes:
- Missing `alt` attributes on images
- Low color contrast on text
- Buttons or links without accessible names
- Form inputs without associated labels

### The quick checklist

Run through this after each major feature:

- [ ] Can you navigate the entire UI using only the keyboard (Tab, Enter, Escape)?
- [ ] Does every image have meaningful alt text (or `alt=""` for decorative images)?
- [ ] Is the color contrast ratio at least 4.5:1 for normal text and 3:1 for large text?
- [ ] Do all form inputs have visible labels?
- [ ] Is the heading structure logical (no skipped levels)?
- [ ] Do interactive elements have visible focus indicators?

### Why this matters for prototypes specifically

It's tempting to skip accessibility on something that's "just a prototype." But prototypes shape the final product. If the prototype has accessibility baked in, the production code inherits it. If it doesn't, those issues tend to persist — engineers implement what they see, and retro-fitting accessibility is always harder than building it in.

The Modus design system handles a lot of this automatically (color tokens meet contrast ratios, components include ARIA attributes), which is another reason the one-step setup from section 5 pays off.

---

*Questions? [Join the Cursor Users group on Google Chat](https://chat.google.com/room/AAQA3co-ZvQ?cls=7)*

