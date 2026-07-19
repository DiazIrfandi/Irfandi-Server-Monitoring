import { useEffect, useState } from "react";
import { Download, LoaderCircle } from "lucide-react";

import Modal from "../../common/Modal";

import { usePullImage } from "../../../hooks/usePullImage";
import { usePullProgress } from "../../../hooks/usePullProgress";

interface PullImageModalProps {
    open: boolean;
    onClose: () => void;
}

const EXAMPLES = ["nginx:latest", "redis:7", "mysql:8"];

export default function PullImageModal({ open, onClose }: PullImageModalProps) {
    const [repository, setRepository] = useState("");

    const pullMutation = usePullImage();
    const progress = usePullProgress();

    useEffect(() => {
        if (!open) {
            setRepository("");
        }
    }, [open]);

    function handlePull() {
        if (!repository.trim()) {
            return;
        }

        pullMutation.mutate(repository, {
            onSuccess() {
                onClose();
            },
        });
    }

    return (
        <Modal open={open} title="Pull Docker Image" onClose={onClose}>
            <div className="dkm-pull-modal">
                <div>
                    <label htmlFor="dkm-pull-repository">Repository</label>
                    <input
                        id="dkm-pull-repository"
                        className="dkm-input"
                        placeholder="nginx:latest"
                        value={repository}
                        onChange={(e) => setRepository(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handlePull()}
                        autoFocus
                    />
                </div>

                <div className="dkm-pull-examples">
                    <span>Examples:</span>
                    {EXAMPLES.map((example) => (
                        <button
                            key={example}
                            type="button"
                            className="dkm-pull-example-chip dkm-mono"
                            onClick={() => setRepository(example)}
                        >
                            {example}
                        </button>
                    ))}
                </div>

                {progress && (
                    <div className="dkm-pull-progress">
                        <strong>{progress.status}</strong>
                        <small className="dkm-mono">{progress.id}</small>
                    </div>
                )}

                <div className="dkm-modal-actions">
                    <button className="dkm-btn" onClick={onClose}>
                        Cancel
                    </button>

                    <button
                        className="dkm-btn-primary"
                        disabled={pullMutation.isPending}
                        onClick={handlePull}
                    >
                        {pullMutation.isPending ? (
                            <>
                                <LoaderCircle size={16} className="dkm-spin" />
                                Pulling...
                            </>
                        ) : (
                            <>
                                <Download size={16} />
                                Pull Image
                            </>
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
}