const { expect } = require('chai')

const parsePretty = require('./parsePretty')

const {
    wrapField,
    separator
} = parsePretty

describe('модуль parsePretty.', () => {
    describe('wrapField возращает ожидаемые значения.', () => {
        it('Должна обарачивать key и value в --{{{key: value}}}--', () => {
            const result = wrapField('coordinateX', '10')

            const expected = '--{{{coordinateX: 10}}}--'

            expect(result).to.equal(expected)

        })

        it('если value не задан должна возвращать --{{{key: null}}}--', () => {
            const result = wrapField('date')

            const expected = '--{{{date: null}}}--'

            expect(result).to.equal(expected)

        })
    })


    describe('parsePretty должна правильно обработать значение.', () => {
        it('Если в одном из полей встретится ":"', () => {
            const argum = `
                ${wrapField('any', 'ddd:ddd')}
            `

            const expected = [
                {
                    any: 'ddd:ddd'
                }
            ]

            const result = parsePretty(argum)
            expect(result).to.eql(expected)
        });

        it('Если в одном из полей перенос есть строки', () => {
            const argum = `${wrapField('any', 'your\nmail')}${wrapField('value', '33')}`

            const expected = [
                {
                    any: 'your\nmail',
                    value: '33'
                }
            ]

            const result = parsePretty(argum)
            expect(result).to.eql(expected)
        });

        it('Если входная строка имеет несколько элементов', () => {
            const argum = `
                ${wrapField('mail', 'test@test.fr')}
                ${wrapField('name', 'Vanya')}${separator}
                ${wrapField('mail', 'igor@test.fr')}
                ${wrapField('name', 'Igor')}${separator}
                ${wrapField('mail', 'yetAnotherMail@test.fr')}
                ${wrapField('name', 'Ya')}${separator}
                ${wrapField('mail', 'Tom@test.fr')}
                ${wrapField('name', 'Tom')}
            `
            
            const expected = [
                {
                    mail: 'test@test.fr',
                    name: 'Vanya'
                },
                {
                    mail: 'igor@test.fr',
                    name: 'Igor'
                },
                {
                    mail: 'yetAnotherMail@test.fr',
                    name: 'Ya'
                },
                {
                    mail: 'Tom@test.fr',
                    name: 'Tom'
                }
            ]

            const result = parsePretty(argum)
            expect(result).to.eql(expected)
        });
        
        it('Если последняя строка заканчивается на разделитель', () => {
            const argum = `
                ${wrapField('mail', 'vi@test.fr')}
                ${wrapField('name', 'Oleg')}${separator}
                ${wrapField('mail', 'danya@test.fr')}
                ${wrapField('name', 'Danya')}${separator}
                ${wrapField('mail', 'yetAnotherMail@test.fr')}
                ${wrapField('name', 'Ya')}${separator}
                ${wrapField('mail', 'Tom@test.fr')}
                ${wrapField('name', 'Tom')}${separator}
            `
            
            const expected = [
                {
                    mail: 'vi@test.fr',
                    name: 'Oleg'
                },
                {
                    mail: 'danya@test.fr',
                    name: 'Danya'
                },
                {
                    mail: 'yetAnotherMail@test.fr',
                    name: 'Ya'
                },
                {
                    mail: 'Tom@test.fr',
                    name: 'Tom'
                }
            ]

            const result = parsePretty(argum)
            expect(result).to.eql(expected)
        });
    })
});