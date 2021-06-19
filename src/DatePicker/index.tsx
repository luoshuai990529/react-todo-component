import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import DateSvg from './svg/dateSvg';
import PickerContent from './pickerContent';

type ContextType = { pickerLeft: number; pickerTop: number };
export const AppContext = React.createContext<ContextType>({ pickerLeft: 0, pickerTop: 0 });
const { Provider } = AppContext;

interface PropsType {}
interface ModalProps {
    children: React.ReactNode;
}

export default function DatePicker(props: PropsType) {
    const [isOpen, setIsOpen] = useState(false);
    const [pickerLeft, setPickerLeft] = useState<number>(0);
    const [pickerTop, setPickerTop] = useState<number>(0);
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

    return (
        <div className="date-picker">
            <Provider value={{ pickerLeft, pickerTop }}>
                {isOpen && (
                    <Modal>
                        <PickerContent />
                    </Modal>
                )}
                <button className="date-picker-btn" onClick={openPickeHandle}>
                    <DateSvg />
                    日程安排
                </button>
            </Provider>
        </div>
    );
}
