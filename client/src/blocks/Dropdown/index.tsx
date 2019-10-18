import React from 'react'
import './index.scss'

import { cn } from '@bem-react/classname'
import { ModProps } from '../../types'
export const bemCls = cn('Dropdown')

interface DropdownProps extends ModProps {
    selected?: number,
    children?: JSX.Element[],
    title: string,
}

const Dropdown = ({ selected, children = [], title, mods }: DropdownProps): JSX.Element => {
    let header = null

    const content: JSX.Element[] = []
    
    children.reduce((accumulator, item, index) => {
        if (selected === index) {
            header = item
        } else {
            accumulator.push(<div key={index} className={bemCls('Item')}>{item}</div>)
        }

        return accumulator

    }, content)

    return (
        <div className={bemCls(mods)}>
            <div className={bemCls('Toggler')}>
                <span className={bemCls('Title')}>{title}</span>
                {header}
                <div className={bemCls('Arrow')}>
                    <svg>
                        <use href="/icons.svg#arrow-down" />
                    </svg>
                </div>
            </div>
            <div className={bemCls('List')}>
                {content}
            </div>
        </div>
    )
}

export default Dropdown