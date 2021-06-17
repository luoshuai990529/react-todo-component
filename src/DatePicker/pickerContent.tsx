import React,{useState} from 'react';
import ClearSvg from './svg/clearSvg';

export default function PickerModal() {
    const [scheduleTime, setScheduleTime] = useState('');
    const clickHandle = (e:any)=>{
        console.log(e);
        
    }
    return (
        <div className="date-picker-modal" onClick={clickHandle}>
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
            </div>
        </div>
    );
}
