import React, { useState, useEffect } from 'react';
import ClearSvg from './svg/clearSvg';
import DatePicker from './DatePicker';
import TodaySvg from './svg/todaySvg';
import TomorrowSvg from './svg/tomorrowSvg';
import SundaySvg from './svg/SundaySvg';
import NoneSvg from './svg/noneSvg';
import { useImmer } from 'use-immer';
import type { DateItem } from './index';
import dayjs, { MatchingTypes, parseTime2Week } from './utils/dayjs';
const widowWidth = document.body.clientWidth;
const widowHeight = document.body.clientHeight;

interface PropsType {
    pickerLeft: number;
    pickerTop: number;
    btnRef: React.ReactNode;
    scheduleTime: string;
    dateList: Array<DateItem>;
    onSave: (x: string) => void;
    setIsOpen: (x: boolean) => void;
    getScheduleTime: (x: string) => void;
}
interface TranslateType {
    translateX: number;
    translateY: number;
}
export default function PickerModal(props: PropsType) {
    const [currentInputTime, setCurrentInputTime] = useState('');
    const [translate, setTranslate] = useImmer<TranslateType>({ translateX: -1, translateY: -1 });
    const [scheduleTime, setScheduleTime] = useState('');
    useEffect(() => {
        props.scheduleTime && parseString2Date(props.scheduleTime);
        initPickerPosition();
        return () => {
            document.querySelector('div.popper-overlay')?.remove();
        };
    }, []);

    /**
     * 初始化picker弹窗的位置
     *
     * */
    const initPickerPosition = () => {
        const { pickerLeft, pickerTop, btnRef } = props;
        let translateX: number;
        let translateY: number;
        //@ts-ignore
        const btnWidth = btnRef.current.clientWidth + 3;

        if (widowWidth > 768) {
            pickerLeft - 250 > 0 ? (translateX = pickerLeft - 250) : (translateX = pickerLeft + btnWidth);
            translateY = pickerTop - 100 > 0 ? 10 : pickerTop;
            if (pickerTop > 400) {
                translateY = pickerTop - 400;
            }
        } else {
            translateX = pickerLeft;
            translateY = pickerTop + 32;
        }
        setTranslate((draft) => {
            draft.translateX = translateX;
            draft.translateY = translateY;
        });
    };

    /**
     *
     * @param x
     * 将输入的字符串解析为时间
     */
    const parseString2Date = (x: string) => {
        setCurrentInputTime(x);
        let MatchResult = dayjs(x, MatchingTypes, 'es', true).format('YYYY-MM-DD HH:mm');
        if (MatchResult === 'Invalid Date') {
            // 没有结果
            if (x === '今天') {
                const time = dayjs().format('YYYY-MM-DD 00:00');
                setScheduleTime(time);
                return;
            }
            if (x === '明天') {
                const time = dayjs(new Date().getTime()).add(1, 'd').format('YYYY-MM-DD 00:00');
                setScheduleTime(time);
                return;
            }
            setScheduleTime('');
        } else {
            const isBefore = dayjs(dayjs().format('YYYY-MM-DD')).isSameOrBefore(MatchResult);
            if (!isBefore) {
                MatchResult = dayjs(MatchResult).add(1, 'y').format('YYYY-MM-DD HH:mm');
            }
            if (x.includes('明天')) {
                MatchResult = dayjs(MatchResult).add(1, 'd').format('YYYY-MM-DD HH:mm');
            }
            setScheduleTime(MatchResult);
        }
    };

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

    const onSave = (x: string) => {
        props.onSave(x);
        props.setIsOpen(false);
        props.getScheduleTime(x);
    };
    return (
        <React.Fragment>
            {(translate.translateX !== -1 || translate.translateY !== -1) && (
                <div className="date-picker-modal" style={{ transform: `translate(${translate.translateX}px, ${translate.translateY}px)` }}>
                    <div className="scheduler">
                        <div className="scheduler-input">
                            <input type="text" placeholder="输入一个截止日期" value={currentInputTime} onChange={(x) => parseString2Date(x.target.value)} />
                            {currentInputTime && (
                                <span className="clear" onClick={() => parseString2Date('')}>
                                    <ClearSvg />
                                </span>
                            )}
                        </div>
                        {currentInputTime && (
                            <div className="scheduler-preview">
                                {formatTimeStr(scheduleTime) && (
                                    <React.Fragment>
                                        <div className="date-result">{formatTimeStr(scheduleTime)}</div>
                                        <div className="task-tips">没有任务</div>
                                    </React.Fragment>
                                )}
                                {!formatTimeStr(scheduleTime) && <div className="tips">您可以输入 例：2021-05-29 15:00 或者 2021年5月29日 15:00 以及此类时间格式的内容来指定截止时间</div>}
                            </div>
                        )}
                        <div className="scheduler-suggestions">
                            <button className="suggestions-item today" onClick={() => onSave(dayjs().format('YYYY-MM-DD 00:00'))}>
                                <div className="item-icon">
                                    <TodaySvg day={dayjs().format('DD')} />
                                </div>
                                <div className="item-label ">今天</div>
                                <div className="item-week">{parseTime2Week(dayjs())}</div>
                            </button>
                            <button className="suggestions-item tomorrow" onClick={() => onSave(dayjs().add(1, 'd').format('YYYY-MM-DD 00:00'))}>
                                <div className="item-icon">
                                    <TomorrowSvg />
                                </div>
                                <div className="item-label ">明天</div>
                                <div className="item-week">{parseTime2Week(dayjs().add(1, 'd'))}</div>
                            </button>
                            <button className="suggestions-item sunday" onClick={() => onSave(dayjs().day(0).add(1, 'w').format('YYYY-MM-DD 00:00'))}>
                                <div className="item-icon">
                                    <SundaySvg />
                                </div>
                                <div className="item-label">周日</div>
                                <div className="item-week">{dayjs().day(0).add(1, 'w').format('MM月DD日')}</div>
                            </button>
                            <button className="suggestions-item none" onClick={() => onSave('')}>
                                <div className="item-icon">
                                    <NoneSvg />
                                </div>
                                <div className="item-label">没有日期</div>
                                <div className="item-week"></div>
                            </button>
                        </div>
                        <DatePicker dateList={props.dateList} />
                        <div className="scheduler-footer">
                            <button
                                className={!scheduleTime ? 'right disable' : 'right'}
                                onClick={() => {
                                    if (!scheduleTime) {
                                        return;
                                    }
                                    onSave(scheduleTime);
                                }}
                            >
                                保存
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}
