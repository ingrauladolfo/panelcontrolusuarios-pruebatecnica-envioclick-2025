import type { CardDetailsProps } from '@/common/interfaces/components/Dashboard/Card';
import '@/common/styles/components/Card/CardDetails/index.css';


export const CardDetails = ({ children, user, className, title }: CardDetailsProps) => {
    return (
        <div className={`card-Details ${className}`}>
            <div className="card-Details-content">
                <div className="card-Details-header">
                    <div className="card-Details-info">
                        {title ?? <p className="card-Details-info-text">{title}</p>}

                        <p className="card-Details-info-text">{user.name?.first} {user.name?.last}</p>
                        <div className="card-Details-img-container">
                            <img src={user.picture?.medium} alt={user.name?.first} className="card-Details-image" />
                        </div>
                    </div>
                </div>
                <div className="card-Details-body">
                    {children}
                </div>
            </div>
        </div>
    )
}
