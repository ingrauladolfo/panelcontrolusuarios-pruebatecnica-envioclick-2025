import type { ReactNode } from "react";

export interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    color?: string;
    type?: 'submit' | 'reset' | 'button';
    href?: string;
}
