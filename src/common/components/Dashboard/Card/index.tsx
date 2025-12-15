import { CardNormal } from './CardNormal';
import { CardDetails } from './CardDetails';
import type { CardProps } from '@/common/interfaces/components/Dashboard/Card';
export const Card = ({ title, image, alt, children, onDelete, onView, className, type, user }: CardProps) => {
    const renderCardNormal = type === 'normal' && (
        <CardNormal
            className={className}
            title={title ?? ''}
            image={image ?? ''}
            alt={alt ?? ''}
            onDelete={onDelete}
            onView={onView}
            children={children}
            user={user}
        />
    );

    const renderCardDetails = type === 'detail' && (
        <CardDetails
            children={children}
            user={user}
            className={className}
        />
    );

    return (
        <>
            {renderCardNormal}
            {renderCardDetails}
        </>
    );
};