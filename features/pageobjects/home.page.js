const { $ } = require('@wdio/globals');
const Page = require('./page');

class HomePage extends Page {
    get signInLink() {
        return $('[data-test="nav-sign-in"]');
    }
    
     get firstProduct() {
        return $('[data-test^="product-"]');
    }

       get homeBanner() {
        return $('img[alt="Banner"]');
    }

    async isAtHomePage() {
        await expect(this.homeBanner).toBeDisplayed();
    }

    async goToLogin() {
        await this.signInLink.click();
    }

    async clickOnProduct() {
        await this.firstProduct.waitForDisplayed({ timeout: 10000 });
        await this.firstProduct.click();
    }

    open() {
        return super.open('');
    }
}

module.exports = new HomePage();