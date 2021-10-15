const Page = require('./Page');

class LandingPage extends Page {
    
    get btn_login () { return $("a[class='_2q_cf']=Log in") } 
    
    async open () {
        await super.open('/')
    } 

    async navigateToLoginPage () {
        await this.btn_login.click()
    }
}
module.exports = new LandingPage()