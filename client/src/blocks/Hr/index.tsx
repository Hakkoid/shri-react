import React from 'react'

import './index.scss'
import { ModProps } from './../../types'

import { cn } from '@bem-react/classname'
export const bemCls = cn('Hr')

const Hr = ({ mods }: ModProps): JSX.Element => <hr className={bemCls(mods)} />

export default  Hr