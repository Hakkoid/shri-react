import React from 'react'

import './index.scss'

import { cn } from '@bem-react/classname'
export const bemCls = cn('Hr')

export default ({ mods = {} }) => <hr className={bemCls(mods)} />