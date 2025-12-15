import type { ReactNode } from "react";

export interface CardDetailsProps { title?: string; user: any; children: ReactNode; className?: string; }
export interface CardProps { title?: string; image?: string; alt?: string; children?: ReactNode; onDelete?: () => void; onView?: () => void; className?: string; type: string; user?: any; }
export interface CardNormalProps {
    title: string;
    image: string;
    alt: string;
    children?: ReactNode;
    onDelete?: () => void;
    onView?: () => void;
    className?: string;
    user?: any;
}
