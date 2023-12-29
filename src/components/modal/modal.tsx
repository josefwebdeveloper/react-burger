import React, {FC, ReactNode, useEffect} from 'react';
import {ModalOverlay} from "./modal-overlay/modal-overlay";
import styles from './modal.module.css';
import classNames from "classnames";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import {useFullScreen} from "../../hooks/fulllscreen-hook";

interface ModalProps {
    title: string;
    onClose: () => void;
    children: ReactNode;
}

export const Modal: FC<ModalProps> = ({title, onClose, children}) => {
    const { ref, isFullScreen, toggleFullScreen } = useFullScreen();
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }   , [onClose]);

    return ReactDOM.createPortal((
            <>
                <ModalOverlay onClose={onClose}/>
                <div ref={ref} className={styles.modal}>
                    <div className={classNames(styles["modal-header"])}>
                        <div className={classNames(styles["modal-title"], 'text', 'text_type_main-large')}>{title}</div>
                        <span className={styles.close}> <CloseIcon onClick={onClose} type="primary"/></span>
                        {/*TODO finish fullscreen*/}
                        {/*<button onClick={toggleFullScreen}>*/}
                        {/*    {isFullScreen*/}
                        {/*        ? "Закрыть полноэкранный режим"*/}
                        {/*        : "Открыть в полноэкранном режиме"}*/}
                        {/*</button>*/}
                    </div>
                    <div className={classNames(styles["modal-body"])}>
                        {children}
                    </div>
                </div>
            </>
        ), document.getElementById("modals") as HTMLElement
    );
};
