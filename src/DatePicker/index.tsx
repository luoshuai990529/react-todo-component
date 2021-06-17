import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import DateSvg from './svg/dateSvg';
import PickerContent from './pickerContent';
interface PropsType {}
interface ModalProps {
    children: React.ReactNode;
}

export default function DatePicker(props: PropsType) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {}, []);

    function Modal(props: ModalProps) {
        const body = document.querySelector('body');
        const popperOverlay = document.createElement('div');
        popperOverlay.className = 'popper-overlay';
        popperOverlay.addEventListener(
            'click',
            (e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);
                popperOverlay.remove()
            },
            false,
        );
        body && body.appendChild(popperOverlay);
        return ReactDOM.createPortal(props.children, popperOverlay);
    }

    return (
        <div className="date-picker">
            {isOpen && (
                <Modal>
                    <PickerContent />
                </Modal>
            )}
            <button className="date-picker-btn" onClick={() => setIsOpen(true)}>
                <DateSvg />
                日程安排
            </button>
        </div>
    );
}
