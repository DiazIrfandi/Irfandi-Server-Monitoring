import { useMemo, useState } from "react";
import { Search, Download } from "lucide-react";
import ImageGrid from "../components/docker/image/ImageGrid";
import PullImageModal from "../components/docker/image/PullImageModal";
import { useImages } from "../hooks/useImages";

type FilterKey = "all" | "used" | "unused" | "dangling";

const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "used", label: "Used" },
    { key: "unused", label: "Unused" },
    { key: "dangling", label: "Dangling" },
];

export default function Images() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<FilterKey>("all");
    const [openPull, setOpenPull] = useState(false);

    const { data: images, isLoading } = useImages();

    const counts = useMemo(() => {
        const list = images ?? [];
        return {
            all: list.length,
            used: list.filter((i: any) => i.containers > 0).length,
            unused: list.filter(
                (i: any) => i.containers === 0 && i.repository !== "<none>"
            ).length,
            dangling: list.filter((i: any) => i.repository === "<none>").length,
        };
    }, [images]);

    const filteredImages = useMemo(() => {
        if (!images) return [];

        const keyword = search.toLowerCase();

        return images.filter((image: any) => {
            const matchSearch =
                image.repository.toLowerCase().includes(keyword) ||
                image.tag.toLowerCase().includes(keyword);

            if (!matchSearch) return false;

            switch (filter) {
                case "used":
                    return image.containers > 0;
                case "unused":
                    return image.containers === 0 && image.repository !== "<none>";
                case "dangling":
                    return image.repository === "<none>";
                default:
                    return true;
            }
        });
    }, [images, search, filter]);

    if (isLoading) {
        return (
            <div className="dkm-page-state">
                <div className="dkm-spinner" />
                <span>Loading images…</span>
            </div>
        );
    }

    return (
        <>
            <div className="dkm-page-toolbar">
                <div className="dkm-search">
                    <Search size={15} />
                    <input
                        placeholder="Search images..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <button className="dkm-btn-primary" onClick={() => setOpenPull(true)}>
                    <Download size={15} />
                    Pull Image
                </button>
            </div>

            <div className="dkm-filter-row">
                {FILTERS.map(({ key, label }) => (
                    <button
                        key={key}
                        className={`dkm-filter-chip ${filter === key ? "active" : ""}`}
                        onClick={() => setFilter(key)}
                    >
                        {label}
                        <span className="dkm-filter-chip-count"> {counts[key]}</span>
                    </button>
                ))}
            </div>

            <ImageGrid images={filteredImages} />

            <PullImageModal open={openPull} onClose={() => setOpenPull(false)} />
        </>
    );
}