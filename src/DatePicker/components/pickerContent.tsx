import React, { useState, useContext, useEffect } from 'react';
import ClearSvg from '../svg/clearSvg';
import { AppContext } from '../index';
import DatePicker from './datePicker';
import FilterResult from './filterResult';
import dayjs, { MatchingTypes } from '../utils/dayjs';
const widowWidth = document.body.clientWidth;
const widowHeight = document.body.clientHeight;

interface PropsType {
    onSave: (x: string) => void;
    setIsOpen: (x: boolean) => void;
}

export default function PickerModal(props: PropsType) {
    const { pickerLeft, pickerTop } = useContext(AppContext);
    const [currentInputTime, setCurrentInputTime] = useState('');
    const [translate, setTranslate] = useState({ translateX: 0, translateY: 0 });
    const [scheduleTime, setScheduleTime] = useState('');

    useEffect(() => {
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
        const currentTranslate = { translateX: 0, translateY: 0 };
        if (widowWidth > 768) {
            pickerLeft - 250 > 0 ? (currentTranslate.translateX = pickerLeft - 250) : (currentTranslate.translateX = pickerLeft + 91);
            currentTranslate.translateY = pickerTop - 100 > 0 ? pickerTop - 100 : pickerTop;
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
                const time = dayjs().format('YYYY-MM-DD');
                setScheduleTime(time);
            }
            if (x === '明天') {
                const time = dayjs(new Date().getTime() + 1000 * 60 * 60 * 24).format('YYYY-MM-DD');
                setScheduleTime(time);
            }
            setScheduleTime('');
        } else {
            const isBefore = dayjs(dayjs().format('YYYY-MM-DD')).isSameOrBefore(MatchResult);
            if (!isBefore) {
                MatchResult = dayjs(MatchResult).add(1, 'y').format('YYYY-MM-DD HH:mm');
            }
            setScheduleTime(MatchResult);
        }
    };

    const onSave = (x: string) => {
        props.onSave(x);
        props.setIsOpen(false);
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
                <FilterResult scheduleTime={scheduleTime} />
                <div className="scheduler-suggestions">建议</div>
                <DatePicker />
                <div className="scheduler-footer">
                    <div className="left"></div>
                    <div className="right" onClick={() => onSave(scheduleTime)}>
                        保存
                    </div>
                </div>
            </div>
        </div>
    );
}
