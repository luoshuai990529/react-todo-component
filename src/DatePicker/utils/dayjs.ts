import dayjs, { Dayjs } from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(calendar);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

export const TOMORROW = dayjs().add(1, 'd').format('YYYY-MM-DD');
export const TODAY = dayjs().format('YYYY-MM-DD');

// 判断当前时间是否是今天
export function isToday(time: Dayjs | string) {
    const date = typeof time === 'string' ? dayjs(time) : time;
    return date.format('YYYY-MM-DD') === TODAY;
}
// 判断当前时间是否是明天
export function isTomorrow(time: Dayjs | string) {
    const date = typeof time === 'string' ? dayjs(time) : time;
    return date.format('YYYY-MM-DD') === TOMORROW;
}
// 通过日期获取星期
export const parseTime2Week = (time: Dayjs) => {
    switch (time.day()) {
        case 1:
            return '周一';
        case 2:
            return '周二';
        case 3:
            return '周三';
        case 4:
            return '周四';
        case 5:
            return '周五';
        case 6:
            return '周六';
        case 0:
            return '周日';
        default:
            break;
    }
};

export const MatchingTypes = [
    'YYYY',
    'YYYYMMDD',
    'YYYY/MM/DD',
    'DD/MM/YYYY',
    'MM/DD',
    'YYYY-MM',
    'M-DD',
    'MM-DD',
    'MM-DD HH:mm',
    'DD',
    'DD HH:mm',
    'YYYY-MM-DD',
    'YYYY-MM-DD HH:mm',
    'YYYY年',
    'YYYY年M月',
    'YYYY年M月D日',
    'YYYY年M月D日 HH',
    'YYYY年M月D日 HH:mm',
    'YYYY年M月DD日',
    'YYYY年M月DD日 HH',
    'YYYY年M月DD日 HH:mm',
    'M月D日',
    'M月D日 HH',
    'M月D日 HH:mm',
    'M月DD日',
    'M月DD日 HH',
    'M月Dd日 HH:mm',
    'M月',
    'D日',
    'D日 HH',
    'D日 HH:mm',
    'YYYY/MM/DD HH',
    'YYYY/MM/DD HH:mm',
    'YYYY/MM/DD HH:mm',
    '明天 HH:mm',
    '今天 HH:mm',
];
// 通过时间和每月天数处理数据
export const parseNumber2List = (n: number, dateTime: Dayjs) => {
    let week = 0;
    let weekMapList = {};
    // @ts-ignore
    weekMapList[week] = [];
    //对长度不满7位的进行填充
    const fillArray = () => {
        // @ts-ignore
        if (weekMapList[week].length !== 7) {
            // @ts-ignore
            week === 0 ? weekMapList[week].unshift('') : weekMapList[week].push('');
            fillArray();
        }
    };
    const loopFormatData = (isToday: boolean) => {
        for (let i = 1; i < n + 1; i++) {
            const timeValue = dateTime.format('YYYY年M月') + i + '日';
            const matchVal = dayjs(timeValue, MatchingTypes, 'es', true);
            const flag = isToday ? dayjs().date() > i : false;
            // @ts-ignore
            flag ? weekMapList[week].push('') : weekMapList[week].push({ day: i, week: matchVal.day() });
            if ((matchVal.day() === 0 && week === 0) || i === n) fillArray();

            if (matchVal.day() === 0) {
                week++;
                // @ts-ignore
                weekMapList[week] = [];
            }
        }
    };
    if (dateTime.format('YYYYMM') === dayjs().format('YYYYMM')) {
        loopFormatData(true);
    } else {
        loopFormatData(false);
    }

    return weekMapList;
};

export default dayjs;
