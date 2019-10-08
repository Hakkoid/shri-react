const Search = (props = {}) => {
    const id = props.id ? ` id="${props.id}"` : ''

    return `
        <form class="Search ${props.class || ''}"${id}>
            <input class="Search-Input Text_size_m">
        </form>
    `
}

import Input from './Input'
Search.Input = Input

export default Search