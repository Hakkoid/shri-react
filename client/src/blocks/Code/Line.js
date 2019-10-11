import React from 'react';
import './index.scss'

import { bemCls } from './index'

export default ({ children }) => {
    return (
        <tr className={bemCls('Line')}>
            <td className={bemCls('LineNumber')}></td>
            <td className={bemCls('LineText')}>{children}</td>
        </tr>
    )
}