## DatePicker

> 日期选择组件

### 默认按钮类型

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
        <div style={{ height: '180px', postion: 'relative' }}>
            <h3>date的值:{dateTime}</h3>
            <div>
                <p style={{ margin: '0' }}>今天看完《小灰的漫画算法》第一章</p>
                <DatePicker style={{ marginTop: '10px' }} onSave={saveDateHandle} />
            </div>
        </div>
    );
};
```

### 有默认值的无边框按钮类型

```tsx
import React, { useState } from 'react';
import DatePicker from './index.tsx';

export default () => {
    const [dateTime, setDateTime] = useState('2021-08-25 00:00');
    const saveDateHandle = (v) => {
        setDateTime(v);
    };
    return (
        <div style={{ height: '180px', postion: 'relative' }}>
            <h3>date的值:{dateTime}</h3>
            <DatePicker value={dateTime} tipsRender={'这是日期下面的tips'} btnType="simple" defaultText={'截止日期'} onSave={saveDateHandle} />
        </div>
    );
};
```

---

### API

| 参数        | 描述                       | 类型                    | 可选 | 默认值  |
| ----------- | -------------------------- | ----------------------- | ---- | ------- |
| style       | 样式                       | object                  | 是   | 无      |
| value       | 日期选择器绑定值           | string                  | 是   | 无      |
| onSave      | 选择日期后的回调           | `(value:string)=>void`  | 是   | 无      |
| tipsRender  | 匹配日期下的 tips 提示文案 | ReactNode               | 是   | 无      |
| btnType     | 按钮类型                   | `'simple' \| 'default'` | 是   | default |
| defaultText | 默认按钮显示文案           | string                  | 是   | 无      |

<!-- More skills for writing demo: https://d.umijs.org/guide/demo-principle -->
