const assert = require('chai').assert;
const {
    urls,
    selectors
} = require('./constants')

const {
    repository,
    directory,
    fileList,
    fileName,
    codeLine
} = selectors

const {
    openRepository,
    clickDirectory,
    clickFile,
    clickPreviousBreadcrumbs
} = require('./helpers')

describe('Переход на репозитории работает.', function () {
    it('При клике на репозиторий должен меняться url', async function () {
        await this.browser.url(urls.repsList)

        let oldUrl = await this.browser.getUrl()

        return this.browser
            .waitForExist(repository)
            .click(repository)
            .getUrl()
            .then(function (newUrl) {
                assert.notEqual(oldUrl, newUrl)
            });
    });

    it('При переходе на репозиторий на странице должен появиться список с файлами', async function () {
        await this.browser.url(urls.repsList)

        let oldUrl = await this.browser.getUrl()

        return this.browser
            .waitForExist(repository)
            .click(repository)
            .getUrl()
            .then(function (newUrl) {
                assert.notEqual(oldUrl, newUrl)
            });
    });
})


describe('Переход между папками.', function () {
    it('При клике на папку должен меняться url', async function () {

        await openRepository(this.browser)

        let oldUrl = await this.browser.getUrl()

        return clickDirectory(this.browser)
            .getUrl()
            .then(function (newUrl) {
                assert.notEqual(oldUrl, newUrl)
            });
    });

    it('При переходе на следующую папку должен обновляться список файлов на странице', async function () {

        await openRepository(this.browser)

        let htmlBefore = await this.browser
            .waitForExist(directory)
            .getHTML(fileList)

        return clickDirectory(this.browser)
            .waitForExist(fileName, 2000)
            .getHTML(fileList)
            .then(function (htmlAfter) {
                assert.notEqual(htmlBefore, htmlAfter)
            });
    });

});

describe('Переход на файлы.', function () {
    it('При клике на файл должен меняться url', async function () {
        await openRepository(this.browser)

        let oldUrl = await this.browser.getUrl()

        return clickFile(this.browser)
            .getUrl()
            .then(function (newUrl) {
                assert.notEqual(oldUrl, newUrl)
            });
    });

    it('При переходе на файл на странице должен появиться элемент с содержимым', async function () {
        await openRepository(this.browser)

        return clickFile(this.browser)
            .waitForExist(codeLine)
    });

});

describe('Переход по хлебным крошкам.', function () {
    it('При переходе на директорию и возвращении обратно через хлебные крошки содержание папки должно быть одинаковым', async function () {
        await openRepository(this.browser)

        let oldUrl = await this.browser
            .waitForExist(fileList)
            .getHTML(fileList)

        await clickDirectory(this.browser)

        return clickPreviousBreadcrumbs(this.browser)
            .waitForExist(fileList)
            .getHTML(fileList)
            .then(function (newUrl) {
                assert.equal(oldUrl, newUrl)
            });
    });
});