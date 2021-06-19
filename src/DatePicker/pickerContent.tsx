import React, { useState, useContext, useEffect } from 'react';
import ClearSvg from './svg/clearSvg';
import { AppContext } from './index';
import DatePicker from './components/datePicker';
const widowWidth = document.body.clientWidth;
const widowHeight = document.body.clientHeight;

export default function PickerModal() {
    const { pickerLeft, pickerTop } = useContext(AppContext);
    const [scheduleTime, setScheduleTime] = useState('');
    const [translate, setTranslate] = useState({ translateX: 0, translateY: 0 });

    useEffect(() => {
        initPickerPosition();
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
    return (
        <div className="date-picker-modal" style={{ transform: `translate(${translate.translateX}px, ${translate.translateY}px)` }}>
            <div className="scheduler">
                <div className="scheduler-input">
                    <input type="text" placeholder="输入一个截止日期" value={scheduleTime} onChange={(x) => setScheduleTime(x.target.value)} />
                    {scheduleTime && (
                        <span className="clear" onClick={() => setScheduleTime('')}>
                            <ClearSvg />
                        </span>
                    )}
                </div>
                <div className="scheduler-preview">筛选结果</div>
                <div className="scheduler-suggestions">建议</div>
                <DatePicker />
                <div className="scheduler-footer">脚部</div>
            </div>
        </div>
    );
}
