export default function checkHash(hash: string): boolean {
    return !!hash.match(/^[^-]/) && !!hash.match(/^(\w|[-=])+$/)
}