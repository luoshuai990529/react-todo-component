import React, { useEffect, useState, useRef } from 'react';
import LeftSvg from '../svg/leftSvg';
import RightSvg from '../svg/rightSvg';
import dayjs from '../utils/dayjs';
interface PropsType {}
const nowTime = dayjs();
export default function DatePicker(props: PropsType) {
    const dateContentRef = useRef<HTMLDivElement>(null);
    const [headerDate, setHeaderDate] = useState(dayjs());
    useEffect(() => {
        console.log(`当前${headerDate.format('M月')}月份有${headerDate.daysInMonth()}天`);
        const dateContentEle = dateContentRef.current;
        if (dateContentEle) {
            dateContentEle.addEventListener('scroll', () => {
                console.log('111');
            });
        }
    }, [headerDate]);

    const nextMonth = () => {
        const nextMonth = headerDate.add(1, 'month');
        setHeaderDate(nextMonth);
    };
    const lastMonth = () => {
        const lastMonth = headerDate.subtract(1, 'month');
        if (lastMonth.isBefore(dayjs().subtract(1, 'month'))) {
            return;
        }
        setHeaderDate(lastMonth);
    };
    const backNowMonth = () => {
        if (headerDate === dayjs()) return;
        setHeaderDate(dayjs());
    };
    const MonthListRender = () => {
        const arr = [1, 2, 3, 4, 5, 6, 7];
        return (
            <React.Fragment>
                {arr.map((item, key) => (
                    <div key={key} className="data-picker-month">
                        <div className="date-picker-month-header">{5 + item}月</div>
                        <div className="calendar">
                            <div className="calendar-week">1 2 3 4</div>
                            <div className="calendar-week">5 6 7 8 9 10 11</div>
                            <div className="calendar-week">12 13 14 15 16 17 18</div>
                            <div className="calendar-week">19 20 21 22 23 24 25</div>
                            <div className="calendar-week">26 27 28 29 30 31</div>
                        </div>
                    </div>
                ))}
            </React.Fragment>
        );
    };
    return (
        <div className="scheduler-date-picker">
            <div className="scheduler-date-picker-header">
                <div className="month">{headerDate.format('M月 YYYY')}</div>
                <div className="actions">
                    <button onClick={lastMonth} className={headerDate.subtract(1, 'month').isBefore(dayjs().subtract(1, 'month')) ? 'disable' : 'btn'}>
                        <LeftSvg />
                    </button>
                    <button onClick={backNowMonth} className={headerDate.subtract(1, 'month').isBefore(dayjs().subtract(1, 'month')) ? 'disable' : 'btn'}>
                        <div>
                            <div className="outline-circle"></div>
                        </div>
                    </button>
                    <button onClick={nextMonth} className="btn">
                        <RightSvg />
                    </button>
                </div>
            </div>
            <div className="scheduler-date-picker-week">
                <div className="week-labels">
                    <div>周一</div>
                    <div>周二</div>
                    <div>周三</div>
                    <div>周四</div>
                    <div>周五</div>
                    <div>周六</div>
                    <div>周日</div>
                </div>
            </div>
            <div className="scheduler-date-picker-content" ref={dateContentRef}>
                {MonthListRender()}
            </div>
        </div>
    );
}
