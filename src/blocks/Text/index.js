import React from 'react'

import './index.scss'

import { cn } from '@bem-react/classname'
export const bemCls = cn('Text')

export default ({ children, mods = {} }) => <span className={bemCls(mods)}>{children}</span>