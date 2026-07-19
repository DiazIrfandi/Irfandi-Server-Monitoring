import { useEffect, useRef, useState } from "react";
import { useContainerLogs } from "../../../../hooks/useContainerLogs";

interface LogsTabProps {
    containerId: string;
}

function logLevelClass(line: string): string {
    const upper = line.toUpperCase();
    if (upper.includes("ERROR") || upper.includes("FATAL")) return "error";
    if (upper.includes("WARN")) return "warn";
    return "";
}

export default function LogsTab({ containerId }: LogsTabProps) {
    const { data: logs, isLoading } = useContainerLogs(containerId, true);
    const lines = logs?.logs ?? [];

    const [autoScroll, setAutoScroll] = useState(true);
    const [copied, setCopied] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (autoScroll) {
            bottomRef.current?.scrollIntoView({ block: "end" });
        }
    }, [lines, autoScroll]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(lines.join("\n"));
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // clipboard not available, silently ignore
        }
    };

    if (isLoading) {
        return (
            <div className="dkm-drawer-state">
                <div className="dkm-spinner" />
                <span>Loading logs…</span>
            </div>
        );
    }

    return (
        <div className="dkm-logs-panel">
            <div className="dkm-logs-toolbar">
                <span className="dkm-logs-count">{lines.length} lines</span>

                <div className="dkm-logs-toolbar-actions">
                    <button
                        className={`dkm-logs-btn ${autoScroll ? "active" : ""}`}
                        onClick={() => setAutoScroll((v) => !v)}
                    >
                        ⬇ Auto-scroll
                    </button>
                    <button
                        className="dkm-logs-btn"
                        onClick={handleCopy}
                        disabled={lines.length === 0}
                    >
                        {copied ? "Copied ✓" : "Copy"}
                    </button>
                </div>
            </div>

            <div className="dkm-logs-body">
                {lines.length === 0 ? (
                    <div className="dkm-empty">No logs available</div>
                ) : (
                    <>
                        {lines.map((line: string, index: number) => (
                            <div
                                key={index}
                                className={`dkm-log-line ${logLevelClass(line)}`}
                            >
                                <span className="dkm-log-line-no">{index + 1}</span>
                                <span className="dkm-log-line-text">{line}</span>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </>
                )}
            </div>
        </div>
    );
}