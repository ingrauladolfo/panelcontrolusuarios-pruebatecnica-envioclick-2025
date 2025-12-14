// Card.tsx
import '@/common/styles/components/Card/index.css';
import { FaTrash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';

interface CardProps {
    title: string;
    image: string;
    alt: string;
}

export const Card = ({ title, image, alt }: CardProps) => {
    return (
        <div className="card">
            <div className="card-content">
                <div className="card-header">
                    <div className="card-info">
                        <p className="card-info-text">{title}</p>
                        <div className="card-img-container">
                            <img src={image} alt={alt} className="card-image" />
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="card-action-section left">
                        <span className="card-action-icon">
                            <FaTrash className='card-icon' color='#fff' />
                        </span>
                        <span className="card-action-text">Borrar</span>
                    </div>
                    <div className="card-action-section right">
                        <span className="card-action-icon">
                            <FaEye className='card-icon' color='#fff' />
                        </span>
                        <span className="card-action-text">Ver</span>
                    </div>
                </div>
            </div>
        </div>
    );
};