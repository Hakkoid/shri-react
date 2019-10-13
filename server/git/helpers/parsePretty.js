function parsePretty(str) {
    let data = []

    if (str.indexOf(parsePretty.separator) !== -1) {
        data = str.split(parsePretty.separator)
        
        // если после последней строки есть разделитель, то в массиве появляется
        // лишний итем, его нужно удалить
        if(!data[data.length - 1].search(/--{{{.*}}}--/)){
            data.pop()
        }
    } else {
        data.push(str)
    }


    const output = data.map(item => {
        const variables = item.match(/\-{2}\{{3}(.|[^\.])*?\}{3}\-{2}/g)

        if (!variables) return null

        const result = {}
        variables.forEach(variable => {
            variable = variable.slice(5, variable.length - 5)
            const key = variable.match(/[^:]*:/)[0].replace(':', '')
            const value = variable.replace(/[^:]*:/, '').trim()

            result[key] = value
        })
        return result
    })

    return output.filter(item => item !== null)
}

parsePretty.wrapField = (key, value = null) => `--{{{${key}: ${value}}}}--`
parsePretty.separator = separator = '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'

module.exports = parsePretty