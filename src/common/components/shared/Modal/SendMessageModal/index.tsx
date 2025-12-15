// SendMessageModal.tsx
import type { SendMessageModalProps } from "@/common/interfaces";
import { useState } from "react";
import { FaX } from "react-icons/fa6";
import "@/common/styles/components/shared/Modal/SendMessageModal/index.css";
import { useSendMessageStore } from "@/common/stores/components/Modal";

export const SendMessageModal = ({ user, onClose }: SendMessageModalProps) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { sendMessage } = useSendMessageStore();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        sendMessage(user.login.uuid, { title, content, date: new Date() });
        onClose();
    };

    return (
        <div className="sendMessageModal-overlay">
            <div className="sendMessageModal-content" role="dialog" aria-modal="true" aria-label={`Enviar mensaje a ${user?.name?.first ?? ''}`}>
                <button
                    className="close-button"
                    onClick={onClose}
                    aria-label="Cerrar"
                    type="button"
                >
                    <FaX />
                </button>

                <h2 className="modal-title">Enviar mensaje a {user?.name?.first} {user?.name?.last}</h2>

                <form className="sendMessage-form" onSubmit={handleSubmit}>
                    <label className="sendMessage-label" htmlFor="msg-title">Título</label>
                    <input
                        id="msg-title"
                        className="sendMessage-input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Asunto del mensaje"
                        required
                    />

                    <label className="sendMessage-label" htmlFor="msg-content">Contenido</label>
                    <textarea
                        id="msg-content"
                        className="sendMessage-textarea"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                        rows={6}
                        required
                    />

                    <div className="sendMessage-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn-primary">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};