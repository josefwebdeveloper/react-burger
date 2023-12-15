import React from 'react';

interface ModalOverlayProps {
    onClick: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClick }) => (
    <div className="modal-overlay" onClick={onClick} />
);

export default ModalOverlay;