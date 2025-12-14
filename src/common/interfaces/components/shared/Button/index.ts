import type { ReactNode } from "react";

export interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    bgColor?: string;
    color?: string;
    type?: 'submit' | 'reset' | 'button';
    href?: string;
    className?: string;
}
