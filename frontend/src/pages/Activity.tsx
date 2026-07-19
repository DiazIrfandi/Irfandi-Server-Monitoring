import ActivityCard from "../components/docker/events/ActivityCard";
import { useDockerEvents } from "../hooks/useDockerEvents";
import { useEvents } from "../hooks/useEvents";

export default function Activity() {
    const { data, isLoading } = useEvents();

    useDockerEvents();

    return (
        <div className="dkm-activity-page">
            <div className="dkm-activity-page-header">
                <h1>Activity</h1>
                {data && <span className="dkm-activity-page-count">{data.length} events</span>}
            </div>

            <div className="dkm-activity-list">
                {isLoading && (
                    <div className="dkm-page-state">
                        <div className="dkm-spinner" />
                        <span>Loading activity…</span>
                    </div>
                )}

                {!isLoading && data?.length === 0 && (
                    <div className="dkm-empty">No activity yet.</div>
                )}

                {!isLoading &&
                    data?.map((event, index) => (
                        <ActivityCard
                            key={`${event.time}-${event.type}-${event.action}-${event.name}-${index}`}
                            event={event}
                        />
                    ))}
            </div>
        </div>
    );
}