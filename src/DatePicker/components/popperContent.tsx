import React, { useState, useEffect } from 'react';
import ClearSvg from '../svg/clearSvg';
import DatePicker from './datePicker';
import FilterResult from './filterResult';
import SuggestOpts from './suggestOpts';
import dayjs, { MatchingTypes } from '../utils/dayjs';
const widowWidth = document.body.clientWidth;
const widowHeight = document.body.clientHeight;

interface PropsType {
    pickerLeft: number;
    pickerTop: number;
    btnRef: React.ReactNode;
    scheduleTime: string;
    onSave: (x: string) => void;
    setIsOpen: (x: boolean) => void;
    getScheduleTime: (x: string) => void;
}

export default function PickerModal(props: PropsType) {
    const [currentInputTime, setCurrentInputTime] = useState('');
    const [translate, setTranslate] = useState({ translateX: 0, translateY: 0 });
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
        const currentTranslate = { translateX: 0, translateY: 0 };
        //@ts-ignore
        const btnWidth = btnRef.current.clientWidth + 3;

        if (widowWidth > 768) {
            pickerLeft - 250 > 0 ? (currentTranslate.translateX = pickerLeft - 250) : (currentTranslate.translateX = pickerLeft + btnWidth);
            currentTranslate.translateY = pickerTop - 100 > 0 ? 10 : pickerTop;
            if (pickerTop > 400) {
                currentTranslate.translateY = 110;
            }
        } else {
            currentTranslate.translateX = pickerLeft;
            currentTranslate.translateY = pickerTop + 32;
        }
        setTranslate(currentTranslate);
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

    const onSave = (x: string) => {
        props.onSave(x);
        props.setIsOpen(false);
        props.getScheduleTime(x);
    };
    return (
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
                {currentInputTime && <FilterResult scheduleTime={scheduleTime} />}
                <SuggestOpts onSave={onSave} />
                <DatePicker />
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
    );
}
