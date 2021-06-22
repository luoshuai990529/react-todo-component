import React, { useEffect } from 'react';
import dayjs, { parseTime2Week } from '../utils/dayjs';

interface PropsType {
    scheduleTime: string;
}
export default function FilterResult(props: PropsType) {
    const { scheduleTime } = props;
    useEffect(() => {}, []);

    /**
     *
     * @param scheduleTime
     * @returns
     * 将时间转换为更易读的格式
     */
    const formatTimeStr = (scheduleTime: string) => {
        const time = dayjs(scheduleTime);
        let time2 = parseTime2Week(time);
        if (time.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')) {
            time2 = '今天';
        }
        if (time.format('YYYY-MM-DD') === dayjs().add(1, 'd').format('YYYY-MM-DD')) {
            time2 = '明天';
        }
        const str = scheduleTime ? time.format('YYYY年MM月DD日') + ` ${time2}` : '';
        return str;
    };

    return (
        <div className="scheduler-preview">
            {formatTimeStr(scheduleTime) && (
                <React.Fragment>
                    <div className="date-result">{formatTimeStr(scheduleTime)}</div>
                    <div className="task-tips">没有任务</div>
                </React.Fragment>
            )}
            {!formatTimeStr(scheduleTime) && <div className="tips">您可以输入 例：2021-05-29 15:00 或者 2021年5月29日 15:00 以及此类时间格式的内容来指定截止时间</div>}
        </div>
    );
}
