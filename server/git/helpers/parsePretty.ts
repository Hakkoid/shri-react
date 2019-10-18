export interface PrettyObj {
    [key: string]: string
}

function parsePretty(str: string): Array<PrettyObj | null> {
    let data: string[] = []

    if (str.indexOf(parsePretty.separator) !== -1) {
        data = str.split(parsePretty.separator)

        // если после последней строки есть разделитель, то в массиве появляется
        // лишний итем, его нужно удалить
        if (!data[data.length - 1].search(/--{{{.*}}}--/)) {
            data.pop()
        }
    } else {
        data.push(str)
    }

    const output = data.map(item => {
        const variables = item.match(/\-{2}\{{3}(.|[^\.])*?\}{3}\-{2}/g)

        if (!variables) return null

        let result: PrettyObj = {}

        variables.forEach(variable => {
            variable = variable.slice(5, variable.length - 5)

            let keys = variable.match(/[^:]*:/) || null

            let key = ''

            if (keys) {
                key = keys[0].replace(':', '')
                const value = variable.replace(/[^:]*:/, '').trim()

                result[key] = value
            }
        })
        return result
    })

    return output.filter(item => item !== null)
}

parsePretty.wrapField = (
    key: string | number,
    value: string | number | null = null
): string => `--{{{${key}: ${value}}}}--`


parsePretty.separator = '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'

export default parsePretty