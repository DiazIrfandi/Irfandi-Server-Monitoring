import { useEffect, useRef, useState } from "react";
import { Lock, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useScreenLockStore } from "../../stores/screen-lock.store";

export default function LockScreen() {
    const [pin, setPin] = useState("");
    const [showPin, setShowPin] = useState(false);
    const [error, setError] = useState(false);
    const [verifying, setVerifying] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const verify = useScreenLockStore((state) => state.verify);
    const unlock = useScreenLockStore((state) => state.unlock);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleUnlock = async () => {
        if (!pin || verifying) return;

        setVerifying(true);
        setError(false);

        const ok = await verify(pin);

        if (!ok) {
            setError(true);
            setVerifying(false);
            setPin("");
            inputRef.current?.focus();
            return;
        }

        unlock();
    };

    return (
        <div className="dkm-lock-overlay">
            <div className="dkm-lock-card">
                <div className="dkm-lock-icon">
                    <Lock size={22} />
                </div>

                <h2 className="dkm-lock-title">Dashboard Locked</h2>
                <p className="dkm-lock-subtitle">Enter your PIN to continue</p>

                <div className={`dkm-lock-input-wrap ${error ? "error" : ""}`}>
                    <input
                        ref={inputRef}
                        className="dkm-lock-input"
                        type={showPin ? "text" : "password"}
                        value={pin}
                        onChange={(e) => {
                            setPin(e.target.value);
                            setError(false);
                        }}
                        onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                        placeholder="PIN"
                        autoComplete="off"
                        inputMode="numeric"
                    />
                    <button
                        type="button"
                        className="dkm-lock-toggle"
                        onClick={() => setShowPin((v) => !v)}
                        tabIndex={-1}
                        aria-label={showPin ? "Hide PIN" : "Show PIN"}
                    >
                        {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>

                {error && <div className="dkm-lock-error">Incorrect PIN. Try again.</div>}

                <button
                    className="dkm-lock-button"
                    onClick={handleUnlock}
                    disabled={!pin || verifying}
                >
                    {verifying ? (
                        <>
                            <LoaderCircle size={16} className="dkm-spin" />
                            Verifying...
                        </>
                    ) : (
                        "Unlock"
                    )}
                </button>
            </div>
        </div>
    );
}