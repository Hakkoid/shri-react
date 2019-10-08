import React from 'react'

import './index.scss'
import Section from './Section'

import { cn } from '@bem-react/classname'
export const bemCls = cn('Layout')

const Layout = ({ children }) => <main className={bemCls()}>{children}</main>

Layout.Section = Section

export default Layout