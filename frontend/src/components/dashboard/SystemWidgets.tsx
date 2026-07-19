import {
  Cpu,
  MemoryStick,
  HardDrive,
  Wifi,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { formatBytes, formatNetworkSpeed } from "../../utils/format";
import type { SystemInfo } from "../../types/system";
import { useState } from "react";

interface SystemWidgetsProps {
    system: SystemInfo;
}

function Gauge({ value, color, size = 54, stroke = 6 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (clamp(value, 0, 100) / 100) * c;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--surface-soft)" strokeWidth={stroke} fill="none" />
      <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 0.6s ease" }} />
    </svg>
  );
}

interface GaugeCardProps {
  Icon: React.ElementType;
  label: string;
  value: number;
  sub: React.ReactNode;

  page?: number;
  total?: number;

  onPrev?: () => void;
  onNext?: () => void;
}

function GaugeCard({
  Icon,
  label,
  value,
  sub,
  page,
  total,
  onPrev,
  onNext,
}: GaugeCardProps) {
  const color = metricColor(value);
  return (
    <div className="dkm-gauge-card">
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Gauge value={value} color={color} />
        <Icon size={16} strokeWidth={2.2} color={color} style={{ position: "absolute" }} />
      </div>
      <div className="dkm-gauge-info">
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <span className="dkm-gauge-label">
                {label}
            </span>

            {total && total > 1 && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 11,
                        color: "var(--text-soft)",
                    }}
                >
                    <ChevronLeft
                        size={14}
                        style={{ cursor: "pointer" }}
                        onClick={onPrev}
                    />

                    <span>
                        {page}/{total}
                    </span>

                    <ChevronRight
                        size={14}
                        style={{ cursor: "pointer" }}
                        onClick={onNext}
                    />
                </div>
            )}
        </div>
        <span className="dkm-gauge-value">{value}%</span>
        <span className="dkm-gauge-sub">{sub}</span>
      </div>
    </div>
  );
}

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
function metricColor(value) {
  if (value >= 88) return "var(--bad)";
  if (value >= 65) return "var(--warn)";
  return "var(--good)";
}

function NetworkCard({ iface }) {
  return (
    <div className="dkm-gauge-card">
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "var(--primary-soft)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Wifi
          size={22}
          color="var(--primary)"
          strokeWidth={2.2}
        />
      </div>

      <div className="dkm-gauge-info">
        <span className="dkm-gauge-label">
          Network
        </span>

        <span className="dkm-gauge-value">
          {iface.iface}
        </span>

        <span className="dkm-gauge-sub">
          ↓ {formatNetworkSpeed(iface.rx_sec)}
          <br />
          ↑ {formatNetworkSpeed(iface.tx_sec)}
        </span>
      </div>
    </div>
  );
}

export default function SystemWidgets({
    system,
}: SystemWidgetsProps) {

    const [diskIndex, setDiskIndex] = useState(0);
    const [networkIndex, setNetworkIndex] = useState(0);

    const iface =
      system.network[networkIndex];

    const disk =
      system.disk[diskIndex];

    return (
        <div className="dkm-widgets">
          <GaugeCard Icon={Cpu} label="CPU" value={Math.round(system.usageCpu)} sub={`${system.cpu.cores} core`} />
          <GaugeCard Icon={MemoryStick} label="Memory" value={Math.round(system.memory.usage)} sub={`${formatBytes(system.memory.used)} / ${formatBytes(system.memory.total)} total`} />
          <GaugeCard
              Icon={HardDrive}
              label="Disk"

              value={Math.round(disk.usage)}

              page={diskIndex + 1}

              total={system.disk.length}

              onPrev={() =>
                  setDiskIndex((prev) =>
                      Math.max(prev - 1, 0)
                  )
              }

              onNext={() =>
                  setDiskIndex((prev) =>
                      Math.min(
                          prev + 1,
                          system.disk.length - 1
                      )
                  )
              }

              sub={
                  <>
                      <strong>{disk.mount}</strong>

                      <br />

                      {formatBytes(disk.used)}

                      {" / "}

                      {formatBytes(disk.size)}
                  </>
              }
          />
          <NetworkCard iface={iface} />
        </div>
    );
}