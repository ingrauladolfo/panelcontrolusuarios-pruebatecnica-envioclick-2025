import type { ButtonProps } from '@/common/interfaces';
import type { FC } from 'react';
import "@/common/styles/components/shared/Button/index.css";

export const Button: FC<ButtonProps> = ({ children, onClick, bgColor, color, type, href, className }) => {
    const classes = [type, className || ''].filter(Boolean).join(' ');
    const style = bgColor || color ? { ...(bgColor ? { backgroundColor: bgColor } : {}), ...(color ? { color } : {}), } : undefined;

    if (href) {
        return (
            <a href={href} className={classes} style={style}>
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={classes} style={style} onClick={onClick}        >
            {children}
        </button>
    );
};
