
import styles from './modal-overlay.module.css';
import React, { FC } from 'react';

interface ModalOverlayProps {
  onClose: () => void;
}

export const ModalOverlay: FC<ModalOverlayProps> = ({ onClose }) => (
  <div className={styles["modal-overlay"]} onClick={onClose}></div>
);