import React from 'react'

import './index.scss'
import Line, { bemCls } from './index'
import { ModProps } from '../../types'

interface FieldProps extends ModProps {
    children?: JSX.Element | JSX.Element[] | string,
    className?: string
}

const Filed = ({ children, mods, className }: FieldProps): JSX.Element => {
    let cls = bemCls('Field', mods)
    cls +=  className ? ` ${className}` : ''

    return (
        <li className={cls}>
            <Line.Text>
                {children}
            </Line.Text>
        </li>
    )
}

export default Filed