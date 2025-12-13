// interfaces.ts
export interface ModalProps {
    message: string;
    onClose: () => void;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
}