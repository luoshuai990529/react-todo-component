import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import DateSvg from './svg/dateSvg';
import PopperContent from './PopperContent';
interface PropsType {
    defaultText?: string;
    onSave: (v: string) => string | void;
}
interface ModalProps {
    children: React.ReactNode;
}

export default function DatePicker(props: PropsType) {
    const btnRef = useRef(null);
    const { defaultText, onSave } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [pickerLeft, setPickerLeft] = useState<number>(-1);
    const [pickerTop, setPickerTop] = useState<number>(-1);
    const [scheduleTime, setScheduleTime] = useState('');
    useEffect(() => {}, []);

    const Modal = (props: ModalProps) => {
        const body = document.querySelector('body');
        const popperOverlay = document.createElement('div');
        popperOverlay.className = 'popper-overlay';
        popperOverlay.addEventListener('click', (e) => {
            if (e.target === popperOverlay) {
                if (body) body.style.overflowY = 'auto';
                setIsOpen(false);
                popperOverlay.remove();
            }
        });
        if (body) {
            body.style.overflowY = 'hidden';
            body.appendChild(popperOverlay);
        }
        return ReactDOM.createPortal(props.children, popperOverlay);
    };

    const openPickeHandle = (e: any) => {
        const pickerEleTop = e.currentTarget.getBoundingClientRect().top;
        const pickerEleLeft = e.currentTarget.offsetLeft;
        setPickerLeft(pickerEleLeft);
        setPickerTop(pickerEleTop);
        setIsOpen(true);
    };

    const btnTextRender = () => {
        const result = defaultText ? defaultText : '日程安排';
        return result;
    };

    const getScheduleTime = (v: string) => {
        setScheduleTime(v);
    };
    return (
        <div className="date-picker">
            {isOpen && (
                <Modal>
                    <PopperContent {...{ pickerLeft, pickerTop, btnRef, scheduleTime }} getScheduleTime={getScheduleTime} setIsOpen={setIsOpen} onSave={onSave} />
                </Modal>
            )}
            <button className="date-picker-btn" onClick={openPickeHandle} ref={btnRef}>
                <DateSvg />
                {scheduleTime ? scheduleTime : btnTextRender()}
            </button>
        </div>
    );
}
