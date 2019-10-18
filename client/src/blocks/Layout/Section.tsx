import React from 'react'

import './index.scss'

import { bemCls } from './index'

interface SectionProps {
    children: JSX.Element | JSX.Element[] | string
}

const Section = ({ children }: SectionProps): JSX.Element => {
    return <div className={bemCls('Section')}>{children}</div>
}

export default Section
