import React, { useState, useEffect, useMemo } from 'react';
import ClearSvg from './svg/clearSvg';
import DatePicker from './DatePicker';
import TodaySvg from './svg/todaySvg';
import TomorrowSvg from './svg/tomorrowSvg';
import SundaySvg from './svg/SundaySvg';
import NoneSvg from './svg/noneSvg';
import { useImmer } from 'use-immer';
import type { DateItem } from './index';
import dayjs, { MatchingTypes, parseTime2Week, TODAY, isToday, isTomorrow } from './utils/dayjs';
import { Dayjs } from 'dayjs';
const widowWidth = document.body.clientWidth;

interface PropsType {
    btnRef: any;
    scheduleTime: string;
    dateList: Array<DateItem>;
    onSave?: (x: string) => void;
    setIsOpen: (x: boolean) => void;
    getScheduleTime: (x: string) => void;
    tipsRender?: React.ReactNode;
    value?: Date | string | Dayjs;
}
interface TranslateType {
    translateX: number;
    translateY: number;
}
const NotUpdate = React.memo(
    ({ children }: any) => (typeof children === 'function' ? children() : children),
    () => true,
);

export default function PickerModal(props: PropsType) {
    const [currentInputTime, setCurrentInputTime] = useState('');
    const [translate, setTranslate] = useImmer<TranslateType>({ translateX: -1, translateY: -1 });
    const [scheduleTime, setScheduleTime] = useState('');
    useEffect(() => {
        props.scheduleTime && parseString2Date(props.scheduleTime);
        initPickerPosition();
        return () => {
            document.querySelector('div.popper-overlay')?.remove();
            const body = document.querySelector('body');
            if (body) body.style.overflowY = 'auto';
        };
    }, []);
    /**
     * 初始化picker弹窗的位置
     *
     * */
    const initPickerPosition = () => {
        const { btnRef } = props;
        const pickerTop = btnRef.current.topDif;
        const pickerLeft = btnRef.current.leftDif;
        let translateX: number;
        let translateY: number;
        //@ts-ignore
        const btnWidth = btnRef.current.clientWidth + 3;
        if (widowWidth > 768) {
            translateX = pickerLeft - 250 > 0 ? pickerLeft - 250 : pickerLeft + btnWidth;
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
    const parseString2Date = useMemo(
        () => (x: string) => {
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
                const isBefore = dayjs(TODAY).isSameOrBefore(MatchResult);
                if (!isBefore) {
                    MatchResult = dayjs(MatchResult).add(1, 'y').format('YYYY-MM-DD HH:mm');
                }
                if (x.includes('明天')) {
                    MatchResult = dayjs(MatchResult).add(1, 'd').format('YYYY-MM-DD HH:mm');
                }
                setScheduleTime(MatchResult);
            }
        },
        [],
    );

    /**
     *
     * @param scheduleTime
     * @returns
     * 将时间转换为更易读的格式
     */
    const formatTimeStr = useMemo(
        () => (scheduleTime: string) => {
            const time = dayjs(scheduleTime);
            let time2 = parseTime2Week(time);
            if (isToday(time)) {
                time2 = '今天';
            }
            if (isTomorrow(time)) {
                time2 = '明天';
            }
            const str = scheduleTime ? time.format('YYYY年MM月DD日') + ` ${time2}` : '';
            return str;
        },
        [],
    );
    const clickSave = () => {
        if (!scheduleTime) {
            return;
        }
        onSave(scheduleTime);
    };
    const onSave = (x: string) => {
        props.onSave && props.onSave(x);
        props.setIsOpen(false);
        props.getScheduleTime(x);
    };

    const selectDate = (date: string) => {
        const value = dayjs(date, MatchingTypes, 'es', true).format('YYYY-MM-DD HH:mm');
        onSave(value);
    };

    const inputDateHandle = useMemo(
        () => (x: any) => {
            parseString2Date(x.target.value);
        },
        [],
    );
    return (
        <React.Fragment>
            {(translate.translateX !== -1 || translate.translateY !== -1) && (
                <div className="date-picker-modal" style={{ transform: `translate(${translate.translateX}px, ${translate.translateY}px)` }}>
                    <div className="scheduler">
                        <div className="scheduler-input">
                            <input type="text" placeholder="输入一个截止日期" value={currentInputTime} onChange={inputDateHandle} />
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
                                        <div className="date-result" onClick={clickSave}>
                                            {formatTimeStr(scheduleTime)}
                                        </div>
                                        <div className="task-tips">{props.tipsRender}</div>
                                    </React.Fragment>
                                )}
                                {!formatTimeStr(scheduleTime) && <div className="tips">您可以输入 例：2021-05-29 15:00 或者 2021年5月29日 15:00 以及此类时间格式的内容来指定截止时间</div>}
                            </div>
                        )}
                        <NotUpdate>
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
                        </NotUpdate>
                        <DatePicker scheduleTime={props.scheduleTime} selectDate={selectDate} dateList={props.dateList} />
                        <div className="scheduler-footer">
                            <button className={!scheduleTime ? 'right disable' : 'right'} onClick={clickSave}>
                                保存
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}
