import React, { useEffect } from 'react';
import LeftSvg from '../svg/leftSvg';
import RightSvg from '../svg/rightSvg';

interface PropsType {}
export default function DatePicker(props: PropsType) {
    useEffect(() => {}, []);
    return (
        <div className="scheduler-date-picker">
            <div className="scheduler-date-picker-header">
                <div className="month">6月 2021</div>
                <div className="actions">
                    <button>
                        <LeftSvg />
                    </button>
                    <button>
                        <div>
                            <div className="outline-circle"></div>
                        </div>
                    </button>
                    <button>
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
            <div className="scheduler-date-picker-content">
                <div className="data-picker-month">
                    <div className="date-picker-month-header">6月</div>
                    <div className="calendar">
                        <div className="calendar-week">1 2 3 4</div>
                        <div className="calendar-week">5 6 7 8 9 10 11</div>
                        <div className="calendar-week">12 13 14 15 16 17 18</div>
                        <div className="calendar-week">19 20 21 22 23 24 25</div>
                        <div className="calendar-week">26 27 28 29 30 31</div>
                    </div>
                </div>
                <div className="data-picker-month">
                    <div className="date-picker-month-header">7月</div>
                    <div className="calendar">
                        <div className="calendar-week">1 2 3 4</div>
                        <div className="calendar-week">5 6 7 8 9 10 11</div>
                        <div className="calendar-week">12 13 14 15 16 17 18</div>
                        <div className="calendar-week">19 20 21 22 23 24 25</div>
                        <div className="calendar-week">26 27 28 29 30 31</div>
                    </div>
                </div>
                <div className="data-picker-month">
                    <div className="date-picker-month-header">8月</div>
                    <div className="calendar">
                        <div className="calendar-week">1 2 3 4</div>
                        <div className="calendar-week">5 6 7 8 9 10 11</div>
                        <div className="calendar-week">12 13 14 15 16 17 18</div>
                        <div className="calendar-week">19 20 21 22 23 24 25</div>
                        <div className="calendar-week">26 27 28 29 30 31</div>
                    </div>
                </div>
                <div className="data-picker-month">
                    <div className="date-picker-month-header">9月</div>
                    <div className="calendar">
                        <div className="calendar-week">1 2 3 4</div>
                        <div className="calendar-week">5 6 7 8 9 10 11</div>
                        <div className="calendar-week">12 13 14 15 16 17 18</div>
                        <div className="calendar-week">19 20 21 22 23 24 25</div>
                        <div className="calendar-week">26 27 28 29 30 31</div>
                    </div>
                </div>
                <div className="data-picker-month">
                    <div className="date-picker-month-header">10月</div>
                    <div className="calendar">
                        <div className="calendar-week">1 2 3 4</div>
                        <div className="calendar-week">5 6 7 8 9 10 11</div>
                        <div className="calendar-week">12 13 14 15 16 17 18</div>
                        <div className="calendar-week">19 20 21 22 23 24 25</div>
                        <div className="calendar-week">26 27 28 29 30 31</div>
                    </div>
                </div>
                <div className="data-picker-month">
                    <div className="date-picker-month-header">11月</div>
                    <div className="calendar">
                        <div className="calendar-week">1 2 3 4</div>
                        <div className="calendar-week">5 6 7 8 9 10 11</div>
                        <div className="calendar-week">12 13 14 15 16 17 18</div>
                        <div className="calendar-week">19 20 21 22 23 24 25</div>
                        <div className="calendar-week">26 27 28 29 30 31</div>
                    </div>
                </div>
                <div className="data-picker-month">
                    <div className="date-picker-month-header">12月</div>
                    <div className="calendar">
                        <div className="calendar-week">1 2 3 4</div>
                        <div className="calendar-week">5 6 7 8 9 10 11</div>
                        <div className="calendar-week">12 13 14 15 16 17 18</div>
                        <div className="calendar-week">19 20 21 22 23 24 25</div>
                        <div className="calendar-week">26 27 28 29 30 31</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
