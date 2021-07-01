import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import dayjs, { parseNumber2List, TODAY, TOMORROW, parseTime2Week } from './utils/dayjs';
import produce from 'immer';
import DateSvg from './svg/dateSvg';
import PopperContent from './PopperContent';
import { Dayjs } from 'dayjs';
import classnames from 'classnames';
interface PropsType {
    defaultText?: string;
    onSave?: (v: string) => string | void;
    tipsRender?: React.ReactNode;
    value?: Date | string | Dayjs;
    btnType?: 'default' | 'simple';
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
        console.log('开始渲染');
        initDateList();
        console.log('渲染完毕');
    }, []);

    const initDateList = useMemo(
        () => () => {
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
            const dateValue = props.value ? (typeof props.value === 'string' ? props.value : dayjs(props.value).format('YYYY-MM-DD HH:ss')) : '';
            setScheduleTime(dateValue);
            setDateList(nextList);
        },
        [],
    );

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

    const btnTextRender = (scheduleTime: string) => {
        let result = defaultText ? defaultText : '日程安排';
        if (scheduleTime) {
            const days = dayjs().day() ? 7 - dayjs().day() : 0;
            const showWeek = dayjs(scheduleTime).isBetween(dayjs(), dayjs().add(days, 'd'));
            if (dayjs(scheduleTime).format('YYYY-MM-DD') === TOMORROW) {
                return '明天';
            }
            if (dayjs(scheduleTime).format('YYYY-MM-DD') === TODAY) {
                return '今天';
            }
            const formatTime = dayjs(scheduleTime).year() === dayjs().year() ? dayjs(scheduleTime).format('M月D日 HH:ss') : dayjs(scheduleTime).format('YYYY年M月D日 HH:ss');
            const timeList = formatTime.split(' ');
            result = timeList[1] === '00:00' ? timeList[0] : formatTime;
            result = showWeek ? `${result} ${parseTime2Week(dayjs(scheduleTime))}` : result;
        }
        return result;
    };

    const getScheduleTime = (v: string) => {
        setScheduleTime(v);
    };
    return (
        <div className="date-picker">
            {isOpen && (
                <Modal>
                    <PopperContent {...{ pickerLeft, pickerTop, btnRef, scheduleTime, dateList, ...props }} getScheduleTime={getScheduleTime} setIsOpen={setIsOpen} onSave={onSave} />
                </Modal>
            )}
            <button className={classnames('date-picker-btn', props.btnType ? props.btnType : 'default')} onClick={openPickeHandle} ref={btnRef}>
                <DateSvg />
                {useMemo(
                    () => (
                        <span>{btnTextRender(scheduleTime)}</span>
                    ),
                    [scheduleTime],
                )}
            </button>
        </div>
    );
}
