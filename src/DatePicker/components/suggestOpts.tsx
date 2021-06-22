import React, { useEffect } from 'react';
import dayjs, { parseTime2Week } from '../utils/dayjs';
import TodaySvg from '../svg/todaySvg';
import TomorrowSvg from '../svg/tomorrowSvg';
import SundaySvg from '../svg/SundaySvg';
import NoneSvg from '../svg/noneSvg';

interface PropsType {
    onSave: (x: string) => void;
}
export default function suggestOpts(props: PropsType) {
    useEffect(() => {}, []);

    return (
        <div className="scheduler-suggestions">
            <button className="suggestions-item today" onClick={() => props.onSave(dayjs().format('YYYY-MM-DD 00:00'))}>
                <div className="item-icon">
                    <TodaySvg day={dayjs().format('DD')} />
                </div>
                <div className="item-label ">今天</div>
                <div className="item-week">{parseTime2Week(dayjs())}</div>
            </button>
            <button className="suggestions-item tomorrow" onClick={() => props.onSave(dayjs().add(1, 'd').format('YYYY-MM-DD 00:00'))}>
                <div className="item-icon">
                    <TomorrowSvg />
                </div>
                <div className="item-label ">明天</div>
                <div className="item-week">{parseTime2Week(dayjs().add(1, 'd'))}</div>
            </button>
            <button className="suggestions-item sunday" onClick={() => props.onSave(dayjs().day(0).add(1, 'w').format('YYYY-MM-DD 00:00'))}>
                <div className="item-icon">
                    <SundaySvg />
                </div>
                <div className="item-label">周日</div>
                <div className="item-week">{dayjs().day(0).add(1, 'w').format('MM月DD日')}</div>
            </button>
            <button className="suggestions-item none" onClick={() => props.onSave('')}>
                <div className="item-icon">
                    <NoneSvg />
                </div>
                <div className="item-label">没有日期</div>
                <div className="item-week"></div>
            </button>
        </div>
    );
}
