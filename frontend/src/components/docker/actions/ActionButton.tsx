import type { ButtonHTMLAttributes } from "react";

interface ActionButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {

    label: string;
}

export default function ActionButton({
    label,
    ...props
}: ActionButtonProps) {

    return (
        <button
            className="dkm-action-btn"
            {...props}
        >
            {label}
        </button>
    );

}