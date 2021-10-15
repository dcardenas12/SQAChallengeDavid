const Page = require('./Page')

class LoginPage extends Page {

    get edt_username () { return $("#email") }
    get edt_password () { return $("#password") }
    get btn_login () { return $("button[class^='submit_btn']") }
    get lbl_errorMsg () { return $("div[class = 'error_msg'] span") }

    async loginWithCredentials(userEmail,userPassword){
        await this.edt_username.addValue(userEmail)
        await this.edt_password.addValue(userPassword)
        await this.btn_login.click()
    }

    async validateErrorLoginMessage(message){
        let errorObtained = await this.lbl_errorMsg.getText()
        expect(errorObtained).to.deep.equal(message)
    }

}
module.exports = new LoginPage()