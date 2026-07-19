import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description: string;
    confirmText?: string;
    loading?: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ConfirmDialog({
    open,
    title,
    description,
    confirmText = "Confirm",
    loading = false,
    onClose,
    onConfirm,
}: ConfirmDialogProps) {
    return (
        <Modal open={open} title={title} onClose={onClose}>
            <div className="dkm-confirm-body">
                <div className="dkm-confirm-icon">
                    <AlertTriangle size={20} />
                </div>
                <p className="dkm-confirm-description">{description}</p>
            </div>

            <div className="dkm-modal-actions">
                <button
                    className="dkm-btn"
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </button>

                <button
                    className="dkm-btn-danger"
                    onClick={onConfirm}
                    disabled={loading}
                >
                    {loading ? "Deleting..." : confirmText}
                </button>
            </div>
        </Modal>
    );
}