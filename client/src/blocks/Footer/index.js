import React from 'react';

import './index.scss'

import { bemCls as bemText } from './../Text'

import { cn } from '@bem-react/classname'
export const bemCls = cn('Footer')

const Footer = ({ className }) => {
    let cls = bemCls(null, [
        bemText({
            spacing: 's',
            color: 'secondary'
        })
    ])

    cls += className ? ` ${className}` : ''

    return (
        <footer className={cls}>
            <p className={bemText({ size: 'm' })}>
                Trade secrets of Yandex LLC. 16, Lev Tolstoy Str., Moscow, Russia, 119021
                <span className={bemCls('Right', null, [bemText({ size: 'm' })])
                }>UI: 0.1.15
                    <span className={bemCls('Link')}>
                        {'© 2007—2019 '}
                        <a href="https://yandex.ru" className={bemText({color: 'link', view: 'link'})}>
                            Yandex
                        </a>
                        </span>
                </span>
            </p>
        </footer>
    )
}

export default Footer