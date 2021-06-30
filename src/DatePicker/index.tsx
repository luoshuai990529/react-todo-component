import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import dayjs, { parseNumber2List } from './utils/dayjs';
import produce from 'immer';
import DateSvg from './svg/dateSvg';
import PopperContent from './PopperContent';
import { Dayjs } from 'dayjs';
interface PropsType {
    defaultText?: string;
    onSave: (v: string) => string | void;
}
interface ModalProps {
    children: React.ReactNode;
}
export interface DateItem {
    time: Dayjs;
    days: number;
    dateInfo?: any;
}
export default function DatePicker(props: PropsType) {
    const btnRef = useRef(null);
    const { defaultText, onSave } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [pickerLeft, setPickerLeft] = useState<number>(-1);
    const [pickerTop, setPickerTop] = useState<number>(-1);
    const [scheduleTime, setScheduleTime] = useState('');
    const [dateList, setDateList] = useState<Array<DateItem>>([]);
    useEffect(() => {
        const nextList = produce(dateList, (draftState: Array<DateItem>) => {
            for (let i = 0; i < 600; i++) {
                const current = dayjs().add(i, 'M');
                if (i < 15) {
                    // 提前处理dateInfo数据
                    draftState.push({ time: current, days: current.daysInMonth(), dateInfo: parseNumber2List(current.daysInMonth(), current) });
                } else {
                    draftState.push({ time: current, days: current.daysInMonth() });
                }
            }
        });
        setDateList(nextList);
    }, []);

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
                    <PopperContent {...{ pickerLeft, pickerTop, btnRef, scheduleTime, dateList }} getScheduleTime={getScheduleTime} setIsOpen={setIsOpen} onSave={onSave} />
                </Modal>
            )}
            <button className="date-picker-btn" onClick={openPickeHandle} ref={btnRef}>
                <DateSvg />
                {scheduleTime ? scheduleTime : btnTextRender()}
            </button>
        </div>
    );
}
