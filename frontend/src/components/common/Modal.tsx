import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
    open: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
}

export default function Modal({ open, title, children, onClose }: ModalProps) {
    useEffect(() => {
        if (!open) return;

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [open, onClose]);

    if (!open) {
        return null;
    }

    return (
        <div className="dkm-modal-overlay" onClick={onClose}>
            <div className="dkm-modal" onClick={(e) => e.stopPropagation()}>
                <div className="dkm-modal-header">
                    <h3>{title}</h3>
                    <button
                        className="dkm-modal-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="dkm-modal-body">{children}</div>
            </div>
        </div>
    );
}