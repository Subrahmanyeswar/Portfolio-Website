"use client";

import { useEffect, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import styles from "./Terminal.module.css";

type LogEntry = {
  type: "command" | "output" | "error" | "scan";
  content: string;
};



/* ── Component ── */
export default function Terminal() {
  const [history, setHistory] = useState<LogEntry[]>([
    { type: "output", content: "AI System Terminal v1.0.4\nType 'help' to see available commands." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const addLog = (type: LogEntry["type"], content: string) => {
    setHistory(prev => [...prev, { type, content }]);
  };

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    setCmdHistory(prev => [cmd, ...prev]);
    setHistoryIdx(-1);
    addLog("command", `subbu@ai-engineer ~ $ ${cmd}`);

    const parts = cleanCmd.split(" ");
    const base = parts[0];

    switch (base) {
      case "help":
        addLog("output", "Available commands:\n  help         - Show this menu\n  whoami       - User identity\n  projects     - List major works\n  skills --ai  - AI/ML technical stack\n  skills --llm - GenAI/LLM technical stack\n  experience   - Professional history\n  achievements - Key milestones\n  contact      - Communication channels\n  scan         - System capability audit\n  aeternum     - Deep dive into core engine\n  clear        - Flush terminal buffer");
        break;

      case "whoami":
        addLog("output", `Identity: ${portfolioData.personal.name}\nRole: ${portfolioData.personal.title}\nLocation: ${portfolioData.personal.location}\nTagline: ${portfolioData.personal.tagline}`);
        break;

      case "projects":
        const projList = portfolioData.projects.map(p => `• ${p.name}: ${p.tagline}`).join("\n");
        addLog("output", projList);
        break;

      case "skills":
        if (parts[1] === "--ai") {
          const aiSkills = portfolioData.skills.find(s => s.category.includes("AI"))?.skills.join(", ");
          addLog("output", `AI/ML Arsenal: ${aiSkills}`);
        } else if (parts[1] === "--llm") {
          const llmSkills = portfolioData.skills.find(s => s.category.includes("LLM"))?.skills.join(", ");
          addLog("output", `LLM/GenAI Arsenal: ${llmSkills}`);
        } else {
          addLog("error", "Usage: skills [--ai | --llm]");
        }
        break;

      case "experience":
        const exp = portfolioData.experience[0];
        addLog("output", `${exp.role} @ ${exp.company} (${exp.period})\n${exp.bullets.join("\n")}`);
        break;

      case "achievements":
        const ach = portfolioData.achievements.map(a => `[${a.year}] ${a.title}`).join("\n");
        addLog("output", ach);
        break;

      case "contact":
        addLog("output", `Email: ${portfolioData.personal.email}\nGitHub: ${portfolioData.personal.github}\nLinkedIn: ${portfolioData.personal.linkedin}`);
        break;

      case "clear":
        setHistory([]);
        break;

      case "scan":
        addLog("scan", "");
        setTimeout(() => {
          addLog("output", "SCAN COMPLETE: Systems Optimal.\n- Edge AI Throughput: 447 FPS [VERIFIED]\n- Neural Acc: 95% [STABLE]\n- Production Ready: YES");
        }, 2600);
        break;

      case "aeternum":
        const aet = portfolioData.projects.find(p => p.name.toLowerCase().includes("aeternum"));
        if (aet) {
          // Adjusting indices to match the specific project's metrics:
          // Latency: 0, Accuracy: 1, GPU Speedup: 2, Detection: 3 ...
          addLog("output", `AETERNUM HUB CORE STATISTICS:\n- FPS: ${aet.metrics[3]?.value || "N/A"}\n- Accuracy: ${aet.metrics[1]?.value || "N/A"}\n- Latency: ${aet.metrics[0]?.value || "N/A"}\n- Privacy: 100% Local\n- Architecture: Microservices/TensorRT`);
        } else {
          addLog("error", "Aeternum Hub system manifest not found.");
        }
        break;

      case "":
        break;

      default:
        addLog("error", `command not found: ${base}. Type 'help' for available commands.`);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(inputValue);
      setInputValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIdx < cmdHistory.length - 1) {
        const newIdx = historyIdx + 1;
        setHistoryIdx(newIdx);
        setInputValue(cmdHistory[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInputValue(cmdHistory[newIdx]);
      } else {
        setHistoryIdx(-1);
        setInputValue("");
      }
    }
  };

  return (
    <div className={styles.terminalSection}>
      <span className={styles.label}>[ INTERACTIVE SYSTEM ]</span>
      
      <div className={styles.window} onClick={() => inputRef.current?.focus()}>
        {/* Title Bar */}
        <div className={styles.titleBar}>
          <div className={styles.controls}>
            <div className={`${styles.dot} ${styles.red}`} />
            <div className={`${styles.dot} ${styles.yellow}`} />
            <div className={`${styles.dot} ${styles.green}`} />
          </div>
          <span className={styles.promptPath}>subbu@ai-engineer ~ $</span>
        </div>

        {/* Console Area */}
        <div className={styles.content} ref={scrollRef}>
          {history.map((entry, idx) => (
            <div key={idx} className={styles.historyLine}>
              {entry.type === "command" && (
                <div className={styles.commandInputLine}>{entry.content}</div>
              )}
              {entry.type === "output" && (
                <div className={styles.output}>{entry.content}</div>
              )}
              {entry.type === "error" && (
                <div className={`${styles.output} ${styles.red}`} style={{ color: "#FF5F56" }}>
                  {entry.content}
                </div>
              )}
              {entry.type === "scan" && (
                <div className={styles.progressWrapper}>
                  <span>Scanning local AI pipelines...</span>
                  <div className={styles.progressContainer}>
                    <div className={styles.progressBar} />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Current Input Line */}
          <div className={styles.inputLine}>
            <span className={styles.prompt}>subbu@ai-engineer ~ $</span>
            <input
              ref={inputRef}
              type="text"
              className={styles.inputField}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
            />
            {inputValue === "" && <div className={styles.cursor} />}
          </div>
        </div>
      </div>
    </div>
  );
}
