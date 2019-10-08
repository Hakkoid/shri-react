import React from 'react'

import './index.scss'

import { bemCls } from './index'

export default ({ children }) => <div className={bemCls('Section')}>{children}</div>
