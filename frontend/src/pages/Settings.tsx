import { useEffect, useState } from "react";
import { Lock, ShieldCheck, ShieldOff, Copy, Check, Server, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useScreenLockStore } from "../stores/screen-lock.store";
import { useSettingsStore } from "../stores/settings.store";
import { getApiStatus } from "../api/dashboard";

type Feedback = { type: "success" | "error"; text: string } | null;

const APP_INFO = {
    name: "Irfandi Server Monitoring",
    version: "v1.0.1",
    patch: "1.0.1-190726",
    license: "Free",
    developer: "Diaz Irfandi",
};

function ApiInfoBlock({ data, isLoading }: { data: unknown; isLoading: boolean }) {
    const [copied, setCopied] = useState(false);
    const json = JSON.stringify(data, null, 2);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(json);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // clipboard not available, silently ignore
        }
    };

    return (
        <div className="dkm-info-block">
            <div className="dkm-info-block-header">
                <div className="dkm-info-block-title">
                    <Server size={14} />
                    <span>API Info</span>
                </div>
                <button className="dkm-info-copy-btn" onClick={handleCopy} disabled={!data}>
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>

            {isLoading ? (
                <div className="dkm-info-loading">
                    <div className="dkm-spinner" />
                    <span>Loading API status…</span>
                </div>
            ) : (
                <pre className="dkm-info-pre dkm-mono">{json}</pre>
            )}
        </div>
    );
}

export default function Settings() {
    const { config, enable, disable, lock, changePin } = useScreenLockStore();
    const { configSettings: settings, setTheme, setLanguage } = useSettingsStore();

    const [pin, setPin] = useState("");
    const [newPin, setNewPin] = useState("");
    const [feedback, setFeedback] = useState<Feedback>(null);

    const { data, isLoading } = useQuery({
        queryKey: ["api-status"],
        queryFn: getApiStatus,
    });

    useEffect(() => {
        if (!feedback) return;
        const timer = setTimeout(() => setFeedback(null), 3000);
        return () => clearTimeout(timer);
    }, [feedback]);

    function notify(type: "success" | "error", text: string) {
        setFeedback({ type, text });
    }

    async function handleEnable() {
        if (!pin.trim()) {
            notify("error", "Masukkan PIN");
            return;
        }

        await enable(pin);
        notify("success", "Screen Lock berhasil diaktifkan");
        setPin("");
    }

    async function handleChangePin() {
        if (!pin.trim()) {
            notify("error", "Masukkan PIN lama");
            return;
        }

        if (!newPin.trim()) {
            notify("error", "Masukkan PIN baru");
            return;
        }

        const ok = await changePin(pin, newPin);

        if (!ok) {
            notify("error", "PIN lama salah");
            return;
        }

        notify("success", "PIN berhasil diganti");
        setPin("");
        setNewPin("");
    }

    async function handleDisable() {
        if (!pin.trim()) {
            notify("error", "Masukkan PIN");
            return;
        }

        const ok = await disable(pin);

        if (!ok) {
            notify("error", "PIN salah");
            return;
        }

        notify("success", "Screen Lock dinonaktifkan");
        setPin("");
        setNewPin("");
    }

    return (
        <div className="dkm-settings-page">
            <h1 className="dkm-settings-title">Settings</h1>

            {feedback && (
                <div className={`dkm-settings-toast ${feedback.type}`}>{feedback.text}</div>
            )}

            {/* General */}
            <div className="dkm-settings-section">
                <h2>General</h2>

                <div className="dkm-settings-row">
                    <label>Theme</label>
                    <select
                        className="dkm-select"
                        value={settings.general.theme}
                        onChange={(e) => setTheme(e.target.value as any)}
                    >
                        <option value="system">System</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>

                <div className="dkm-settings-row">
                    <label>Language</label>
                    <select
                        className="dkm-select"
                        value={settings.general.language}
                        onChange={(e) => setLanguage(e.target.value as any)}
                    >
                        <option value="en">English</option>
                        <option value="id">Indonesia</option>
                    </select>
                </div>
            </div>

            {/* Screen Lock */}
            <div className="dkm-settings-section">
                <div className="dkm-settings-section-head">
                    <h2>Screen Lock</h2>
                </div>

                {!config.enabled ? (
                    <div className="dkm-settings-form">
                        <div className="dkm-settings-field">
                            <label>PIN</label>
                            <input
                                className="dkm-input"
                                type="password"
                                placeholder="Masukkan PIN"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                            />
                        </div>

                        <button className="dkm-btn-primary" onClick={handleEnable}>
                            <Lock size={15} />
                            Enable Screen Lock
                        </button>
                    </div>
                ) : (
                    <div className="dkm-settings-form">
                        <div className="dkm-settings-field">
                            <label>PIN Lama</label>
                            <input
                                className="dkm-input"
                                type="password"
                                placeholder="PIN Lama"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                            />
                        </div>

                        <div className="dkm-settings-field">
                            <label>PIN Baru</label>
                            <input
                                className="dkm-input"
                                type="password"
                                placeholder="PIN Baru"
                                value={newPin}
                                onChange={(e) => setNewPin(e.target.value)}
                            />
                        </div>

                        <div className="dkm-settings-actions">
                            <button className="dkm-btn-primary" onClick={handleChangePin}>
                                Change PIN
                            </button>
                            <button className="dkm-btn" onClick={lock}>
                                <Lock size={15} />
                                Lock Now
                            </button>
                            <button className="dkm-btn-danger" onClick={handleDisable}>
                                Disable
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* System Information */}
            <div className="dkm-settings-section">
                <h2>System Information</h2>

                <div className="dkm-about-card">
                    <div className="dkm-about-icon">
                        <Sparkles size={18} />
                    </div>
                    <div className="dkm-about-body">
                        <div className="dkm-about-top">
                            <strong>{APP_INFO.name}</strong>
                            <span className="dkm-tag dkm-tag-port dkm-mono">{APP_INFO.version}</span>
                        </div>
                        <div className="dkm-info-row">
                            <span>Patch</span>
                            <strong className="dkm-mono">{APP_INFO.patch}</strong>
                        </div>
                        <div className="dkm-info-row">
                            <span>License</span>
                            <strong>{APP_INFO.license}</strong>
                        </div>
                        <div className="dkm-info-row">
                            <span>Developer</span>
                            <strong>{APP_INFO.developer}</strong>
                        </div>
                    </div>
                </div>

                <div className="dkm-info-block-group">
                    <ApiInfoBlock data={data} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
}