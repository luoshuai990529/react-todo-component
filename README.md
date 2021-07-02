# Lewis Luo

## Getting Started

> **文档预览地址：https://luoshuai990529.github.io/react-todo-component/**

```bash
$ npm i lewis-todo-coponents
or
$ yarn add lewis-todo-coponents
```

##### 使用

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'lewis-todo-coponents';

export default () => {
    return (
        <div>
            <DatePicker onSave={saveDateHandle} />
        </div>
    );
};
```
