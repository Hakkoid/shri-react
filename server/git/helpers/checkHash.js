module.exports = function checkHash(hash) {
    return typeof hash === 'string' 
        && !!hash.match(/^[^-]/) 
        && !!hash.match(/^(\w|[-=])+$/)
}