const { $ } = require('@wdio/globals');
const Page = require('./page');

class RegisterPage extends Page {
    get inputFirstName() { return $('#first_name'); }
    get inputLastName() { return $('#last_name'); }
    get inputDob() { return $('#dob'); }
    get inputStreet() { return $('#street'); }
    get inputPostcode() { return $('#postal_code'); }
    get inputCity() { return $('#city'); }
    get inputState() { return $('#state'); }
    get inputCountry() { return $('#country'); }
    get inputPhone() { return $('#phone'); }
    get inputEmail() { return $('#email'); }
    get inputPassword() { return $('#password'); }
    get btnSubmit() { return $('button[data-test="register-submit"]'); } 

    async fillForm({
        firstName,
        lastName,
        dob,
        street,
        postcode,
        city,
        state,
        country,
        phone,
        email,
        password
    }) {
        await this.inputFirstName.setValue(firstName);
        await this.inputLastName.setValue(lastName);
        await this.inputDob.setValue(dob);
        await this.inputStreet.setValue(street);
        await this.inputPostcode.setValue(postcode);
        await this.inputCity.setValue(city);
        await this.inputState.setValue(state);
        await this.inputCountry.selectByVisibleText(country);
        await this.inputPhone.setValue(phone);
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
       
    }

    async submitForm() {
    await this.btnSubmit.click();
}
    open() {
        return super.open('auth/register');
    }
}

module.exports = new RegisterPage();

