module.exports.urls = {
    repsList: '/'
}
module.exports.selectors = {
    repositories: '.Repositories',
    repository: '.Repositories a',
    fileList: '.FileList',
    fileName: '.FileList-Name',
    directory: '.FileList-Name a[href*="/tree/"]',
    file: '.FileList-Name a[href*="/blob/"]',
    code: '.Code-Line',
    breadcrumbs: '.Path',
    breadcrumbsItem: '.Path-Item'
}