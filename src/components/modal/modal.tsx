import styles from './modal.module.css';
import React, {useState, useEffect, ReactNode} from 'react';
import ReactDOM from 'react-dom';
import classNames from "classnames";
interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}
const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
    console.log(isOpen,'modal')
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={(classNames(styles["modal-overlay"]))} onClick={onClose}>
            <div className={classNames(styles.modal)} onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                    <button onClick={onClose} aria-label="Close">
                        ×
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;