import styles from './modal.module.css';
import React, {useState, useEffect, ReactNode} from 'react';
import ReactDOM from 'react-dom';
import classNames from "classnames";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    onDataReceive?: (data: any) => void;
}

const Modal: React.FC<ModalProps> = ({
        title, onDataReceive,
        isOpen, onClose, children}) => {
    const [localData, setLocalData] = useState<any>()
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeHandler();
            }
        };

        window.addEventListener('keydown', handleEsc);

        // Убедитесь, что обработчик событий очищается при размонтировании компонента
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);
    const sendData = () => {
        if (onDataReceive) {
            onDataReceive(localData);
        }
        onClose(); // Закрыть модальное окно после отправки данных
    };

    // Обертка для onClose, чтобы добавить вызов afterClose
    const closeHandler = () => {
        onClose();

    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={(classNames(styles["modal-overlay"]))} onClick={closeHandler}>
            <div className={classNames(styles.modal)} onClick={e => e.stopPropagation()}>
                <div className={classNames(styles["modal-header"])}>
                    <div className={classNames(styles["modal-title"], 'text', 'text_type_main-large')}>{title}</div>
                    <span className={styles.close}> <CloseIcon onClick={onClose} type="primary"/></span>
                </div>
                <div className={classNames(styles["modal-body"])}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;