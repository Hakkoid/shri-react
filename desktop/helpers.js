const {
    urls,
    selectors
} = require('./constants')

const {
    repository,
    directory,
    file,
    fileName,
    breadcrumbsItem
} = selectors

module.exports.openRepository = function openRepository(browser) {
    return browser
        .url(urls.repsList)
        .waitForExist(repository, 2000)
        .click(repository)
}


function clickDirectory(browser) {
    return browser
        .waitForExist(directory, 2000)
        .click(directory)
}

module.exports.clickDirectory = clickDirectory

module.exports.comeToNestedDirectory = async function comeToNestedDirectory(browser) {
    const exist = await clickDirectory(browser)
        .waitForExist(fileName)
        .isExisting(directory)

    if (exist) {
        await comeToNestedDirectory(browser)
    } else {
        return browser
    }

}

module.exports.clickFile = function clickFile(browser) {
    return browser
        .waitForExist(file, 2000)
        .click(file)
}

module.exports.clickPreviousBreadcrumbs = function clickPreviousBreadcrumbs(browser) {
    return browser
        .waitForExist(breadcrumbsItem, 2000)
        .$$(breadcrumbsItem)
        .then(breadcrumbs => breadcrumbs[breadcrumbs.length - 2])
        .click()
}