import React, { ReactNode } from 'react';
import './index.scss'

import { bemCls } from './index'
import { ModProps } from '../../types';

interface LineProps extends ModProps {
    children?: ReactNode
}

const Line = ({ children, mods }: LineProps): JSX.Element => {
    return (
        <tr className={bemCls('Line', mods)}>
            <td className={bemCls('LineNumber')}></td>
            <td className={bemCls('LineText')}>{children}</td>
        </tr>
    )
}

export default Line