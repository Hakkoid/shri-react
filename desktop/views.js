const {
    urls,
    selectors
} = require('./constants')

const {
    openRepository,
    clickFile,
    comeToNestedDirectory
} = require('./helpers')

describe('Блоки должны правильно отображаться.', function () {
    it('Внешний вид списка репозиториев соответствует скриншотам', async function () {
        return this.browser
            .url(urls.repsList)
            .assertView('plain', selectors.repositories)
    });

    it('Внешний вид списка хлебных крошек соответствует скриншотам', async function () {
        await openRepository(this.browser)
            .assertView('start', selectors.breadcrumbs)

        await comeToNestedDirectory(this.browser)

        return this.browser.assertView('nested', selectors.breadcrumbs)

    });

    it('Внешний файла соответствует скриншотам', async function () {
        await openRepository(this.browser)

        return clickFile(this.browser)
            .waitForExist(selectors.codeLine)
            .assertView('plain', selectors.code)
    });

    it('Внешний хедера соответствует скриншотам', async function () {
        return this.browser
            .url('/')
            .waitForExist(selectors.header)
            .assertView('plain', selectors.header)
    });

    it('Внешний футера соответствует скриншотам', async function () {
        return this.browser
            .url('/')
            .waitForExist(selectors.footer)
            .assertView('plain', selectors.footer)
    });
})