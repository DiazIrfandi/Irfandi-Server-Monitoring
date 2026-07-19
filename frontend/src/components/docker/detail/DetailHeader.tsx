import { Box, CheckCircle2, XCircle } from "lucide-react";

interface DetailHeaderProps {
    name: string;
    image: string;
    running: boolean;
}

export default function DetailHeader({
    name,
    image,
    running,
}: DetailHeaderProps) {
    return (
        <div className="dkm-detail-header">

            <div className="dkm-detail-icon">
                <Box size={22} />
            </div>

            <div style={{ flex: 1 }}>

                <h2>{name}</h2>

                <div className="dkm-card-image">
                    {image}
                </div>

            </div>

            <div
                className="dkm-status-pill"
                style={{
                    color: running
                        ? "var(--good)"
                        : "var(--bad)",

                    background: running
                        ? "var(--good-soft)"
                        : "var(--bad-soft)",
                }}
            >
                {running
                    ? <CheckCircle2 size={12}/>
                    : <XCircle size={12}/>
                }

                {running
                    ? "Running"
                    : "Stopped"}
            </div>

        </div>
    );
}