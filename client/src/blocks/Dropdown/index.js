import React from 'react'
import './index.scss'

import { cn } from '@bem-react/classname'
export const bemCls = cn('Dropdown')

export default ({ selected, children = [], title, mods }) => {
    let header = null

    const items = children.reduce((accumulator, item, index) => {
        if (selected === index) {
            header = item
        } else {
            accumulator.push(<div key={index} className={bemCls('Item')}>{item}</div>)
        }

        return accumulator

    }, [])

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
                {items}
            </div>
        </div>
    )
}