## DatePicker

Demo1:

```tsx
import React, { useState } from 'react';
import DatePicker from './index.tsx';

export default () => {
    const [value, setValue] = useState('');
    const [dateTime, setDateTime] = useState('');
    const saveDateHandle = (v) => {
        setDateTime(v);
    };
    return (
        <div style={{ height: '240px', postion: 'relative' }}>
            <h3>date的值:{dateTime}</h3>
            <DatePicker onSave={saveDateHandle} />
            <DatePicker onSave={saveDateHandle} />
        </div>
    );
};
```

Demo2:

```tsx
import React, { useState } from 'react';
import DatePicker from './index.tsx';

export default () => {
    const [value, setValue] = useState('');
    const [dateTime, setDateTime] = useState('2021-08-25 00:00');
    const [show, setShow] = useState(false);
    const saveDateHandle = (v) => {
        setDateTime(v);
    };
    const clickHandle = () => {
        setShow(!show);
    };
    return (
        <div style={{ height: '240px', postion: 'relative' }}>
            <h3>自定义DatePicker显示文案：</h3>
            <h3>date的值:{dateTime}</h3>
            <button onClick={clickHandle}>toggle</button>
            {show && <DatePicker value={dateTime} tipsRender={'没有任务'} btnType="simple" defaultText={'截止日期'} onSave={saveDateHandle} />}
        </div>
    );
};
```

<!-- More skills for writing demo: https://d.umijs.org/guide/demo-principle -->
