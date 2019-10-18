import React from 'react'

import './index.scss'
import Section from './Section'

import { cn } from '@bem-react/classname'
export const bemCls = cn('Layout')

interface LayoutProps {
    children: JSX.Element | JSX.Element[] | string
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
    return <main className={bemCls()}>{children}</main>
}

Layout.Section = Section

export default Layout