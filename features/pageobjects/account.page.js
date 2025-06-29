const { $ } = require('@wdio/globals');
const Page = require('./page');
const HomePage = require('./home.page');

class AccountPage extends Page {
    get pageTitle() {
        return $('[data-test="page-title"]');
    }

 get homeLink() {
    return $('[data-test="nav-home"]');
 }

    async isAtAccountPage() {
       
     await this.pageTitle.waitForDisplayed({ timeout: 5000 });
        await expect(this.pageTitle).toHaveText('My account');
    }
    async goToHomePage() {
        await this.homeLink.click();
       await expect(HomePage.homeBanner).toBeDisplayed(); 
    }
}

module.exports = new AccountPage();
