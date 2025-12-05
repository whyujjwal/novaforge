# NovaForge Project Documentation

## Overview
NovaForge is a custom IDE built on top of the Visual Studio Code (VS Code) open-source repository. It integrates a custom Ad System and an AI Agent workflow directly into the workbench.

## Key Features

### 1. Branding
-   **Name**: NovaForge
-   **Identity**: Custom product configuration in `product.json` and `package.json`.

### 2. Ad System
A non-intrusive, context-aware ad system integrated into the IDE's auxiliary bar.
-   **Ad Banner Component**: A React-based component (`AdBanner`) that renders ads safely within a sandboxed iframe.
-   **Visibility Logic**: The ad banner is only visible when the AI Agent is actively running a task, ensuring a distraction-free coding experience when not using agent features.
-   **Mock Ad Server**: A local Node.js server (`scripts/mock-ads-server.js`) that serves ad content for testing purposes.

### 3. AI Agent Integration
A built-in AI agent capable of executing tasks and streaming logs to the UI.
-   **Agent Service**: A core service (`IAgentService`) that manages task execution and state.
-   **Agent View**: A dedicated view in the Sidebar ("Agent Logs") that displays real-time logs from the agent.
-   **Command**: "Run Agent Task" command available in the Command Palette to trigger agent actions.

## Architecture & Modified Files

### Core Configuration
-   `product.json`: Updated branding metadata.
-   `package.json`: Updated package metadata and dependencies.
-   `src/tsconfig.json`: Configured for React/JSX support.

### Ad System (`src/vs/workbench/contrib/ads`)
-   `browser/adBanner.tsx`: The React component for the ad banner.
-   `browser/ads.contribution.ts`: Registers the "Ads" view in the Auxiliary Bar and handles visibility logic using Context Keys (`novaforge.agent.isRunning`).

### AI Agent (`src/vs/workbench/contrib/agent`)
-   `browser/agentService.ts`: Implements the agent logic and state management.
-   `browser/agentView.ts`: Implements the log streaming view.
-   `browser/agent.contribution.ts`: Registers the "Agent Logs" view and the "Run Agent Task" command.
-   `src/vs/platform/agent/common/agentService.ts`: Defines the service interface.

## How to Run

1.  **Start the Ad Server**:
    ```bash
    node scripts/mock-ads-server.js
    ```
2.  **Run the IDE**:
    (Requires a working VS Code build environment)
    ```bash
    npm run watch
    ```

## Verification
-   Open the "Agent Logs" view in the Sidebar.
-   Run the command "Run Agent Task".
-   Observe the "Sponsored" ad banner appearing in the Auxiliary Bar while the task is running.
