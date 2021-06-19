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
            <div className="scheduler-date-picker-day">
                <div className="content">123456</div>
            </div>
        </div>
    );
}
