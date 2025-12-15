// CardNormal.tsx
import type { CardNormalProps } from '@/common/interfaces/components/Dashboard/Card';
import '@/common/styles/components/Card/CardNormal/index.css';
import { FaTrash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';
import { FaFileCsv } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { Modal } from '@/common/components';
import { useState } from 'react';
import { useUsersStore } from '@/common/stores/pages/Dashboard/Users';
import { SendMessageModal } from '@/common/components/shared/Modal/SendMessageModal';

export const CardNormal = ({ title, image, alt, children, onDelete, onView, className, user }: CardNormalProps) => {
    console.log({ user })
    const [showModal, setShowModal] = useState(false);
    const [showSendMessageModal, setShowSendMessageModal] = useState(false);
    const handleExportUserCSV = useUsersStore(state => state.handleExportUserCSV);
    const handleSendMessage = useUsersStore(state => state.handleSendMessage);

    const handleDelete = () => setShowModal(true);
    const handleConfirmDelete = () => { if (onDelete) onDelete(); setShowModal(false); };
    const handleCancelDelete = () => setShowModal(false);

    const onExport = () => {
        const userId = user?.login?.uuid ?? user?.id?.value ?? user?.email ?? '';
        if (!userId) {
            console.warn('CardNormal: no user id to export');
            return;
        }
        handleExportUserCSV(userId);
    };

    const onSendMessage = (message: { title: string; content: string }) => {
        const userId = user?.login?.uuid ?? user?.id?.value ?? user?.email ?? '';
        if (!userId) {
            console.warn('CardNormal: no user id to send message');
            return;
        }
        handleSendMessage(userId, message);
        setShowSendMessageModal(false);
    };

    return (
        <div className={`card ${className}`}>

            <div className="card-content">
                <div className="card-header">
                    <div className="card-info">
                        <p className="card-info-text">{title}</p>
                        <div className="card-img-container">
                            <img src={image} alt={alt} className="card-image" />
                        </div>
                    </div>
                    <div className="card-export-section" onClick={onExport}>
                        <span className="card-action-icon">
                            <FaFileCsv className='card-icon' color='#fff' />
                        </span>
                        <span className="card-action-text">CSV</span>
                    </div>
                    <div className="card-send-message-section" onClick={() => setShowSendMessageModal(true)}>
                        <span className="card-action-icon">
                            <FaEnvelope className='card-icon' color='#fff' />
                        </span>
                        <span className="card-action-text">Mensaje</span>
                    </div>
                </div>
                {children && <div className="card-body">{children}</div>}
                {(onDelete || onView) && (
                    <div className="card-footer">
                        {onDelete && (
                            <div className="card-action-section left" onClick={handleDelete}>
                                <span className="card-action-icon">
                                    <FaTrash className='card-icon' color='#fff' />
                                </span>
                                <span className="card-action-text">Borrar</span>
                            </div>
                        )}
                        {onView && (
                            <div className="card-action-section right" onClick={onView}>
                                <span className="card-action-icon">
                                    <FaEye className='card-icon' color='#fff' />
                                </span>
                                <span className="card-action-text">Ver</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {showModal && (
                <Modal
                    message={`Seguro que quieres borrar el id ${user.login.uuid} (${title})?`}
                    onClose={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    confirmText="Sí"
                    cancelText="No"
                />
            )}
            {showSendMessageModal && (
                <SendMessageModal user={user} onClose={() => setShowSendMessageModal(false)} onSendMessage={onSendMessage} />
            )}
        </div>
    );
};