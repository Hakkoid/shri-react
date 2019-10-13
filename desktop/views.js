const {
    urls,
    selectors
} = require('./constants')

const {
    openRepository,
    comeToNestedDirectory
} = require('./helpers')

describe('Блоки должны правильно отображаться', function () {
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

    // it('Внешний вид списка хлебных крошек соответствует скриншотам', async function () {
    //     return openRepository(this.browser)
    //         .assertView('plain', selectors.breadcrumbs)
    // });
})