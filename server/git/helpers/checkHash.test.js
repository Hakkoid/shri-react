const { expect } = require('chai')

const checkHash = require('./checkHash')

describe('модуль checkHash.', () => {
    it('Должна возвращать false, если в строке есть пробел', () => {
        const result = checkHash('wewewes44 dd32fd3')
        expect(result).to.false
    })

    it('Должна возвращать false, если в строке есть ":"', () => {
        const result = checkHash('wewewes44:dd32fd3')
        expect(result).to.false
    })

    it('Должна возвращать false, если в строке есть ~', () => {
        const result = checkHash('~wewewes44dd32fd3')
        expect(result).to.false
    })

    it('Должна возвращать false, если строка начинается с -', () => {
        const result = checkHash('-wewewes44dd32fd3')
        expect(result).to.false
    })
})