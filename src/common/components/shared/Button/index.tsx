// Button.tsx
import type { ButtonProps } from '@/common/interfaces';
import type { FC } from 'react';
import "@/common/styles/components/shared/Button/index.css"
export const Button: FC<ButtonProps> = ({ children, onClick, color, type, href }) => {
    if (href) {
        return (
            <a href={href} className={`button ${color ? `button-${color}` : ''}`}>
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={`button ${color ? `button-${color}` : ''}`} onClick={onClick}>
            {children}
        </button>
    );
};