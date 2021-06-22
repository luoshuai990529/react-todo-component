import dayjs, { Dayjs } from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(calendar);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

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
    'M月D日',
    'M月D日 HH',
    'M月D日 HH:mm',
    'M月',
    'D日',
    'D日 HH',
    'D日 HH:mm',
    'YYYY年M月D日',
    'YYYY/MM/DD HH',
    'YYYY/MM/DD HH:mm',
    'YYYY/MM/DD HH:mm',
    '明天 HH:mm',
    '今天 HH:mm',
];

export default dayjs;
