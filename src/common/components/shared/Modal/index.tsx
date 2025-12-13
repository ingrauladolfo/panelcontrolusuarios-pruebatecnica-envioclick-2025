// Modal.tsx
import type { ModalProps } from '@/common/interfaces';
import '@/common/styles/components/shared/Modal/index.css';
import type { FC } from 'react';
import { Button } from '@/common/components';

export const Modal: FC<ModalProps> = ({ message, onClose, onConfirm, confirmText, cancelText }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-buttons">
                    {cancelText && (
                        <Button color="negative" onClick={onClose}>
                            {cancelText}
                        </Button>
                    )}
                    {confirmText && (
                        <Button color="positive" onClick={onConfirm}>
                            {confirmText}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};