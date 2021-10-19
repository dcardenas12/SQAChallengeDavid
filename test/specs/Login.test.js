const LandingPage = require('../pages/Landing.page')
const LoginPage = require('../pages/Login.page')
const DashboardPage = require('../pages/Dashboard.page')
const casual = require('casual')
require('dotenv').config()

describe('Login scenarios suite', () => {
    
    let mocked_email = casual.email
    let mocked_password = casual.password
    let mocked_domain = casual.domain

    it('successful login into the application', async () => {
        await browser.url('/')
        await LandingPage.navigateToLoginPage()
        await LoginPage.loginWithCredentials(process.env.USER_EMAIL,process.env.USER_PASSWORD)
        await DashboardPage.changeTimeZoneWhenPrompted()
        await DashboardPage.validateSuccessfulLogin()
    })
    it('unsuccessful login, empty credentials', async () => {
        await browser.url('/')
        await LandingPage.navigateToLoginPage()
        await LoginPage.loginWithCredentials('','')
        await LoginPage.validateErrorLoginMessage('Invalid email address.')
    })
    it('unsuccessful login, empty password', async () => {
        await browser.url('/')
        await LandingPage.navigateToLoginPage()
        await LoginPage.loginWithCredentials(mocked_email,'')
        await LoginPage.validateErrorLoginMessage('Blank password.')
    })
    it('unsuccessful login, empty email', async () => {
        await browser.url('/')
        await LandingPage.navigateToLoginPage()
        await LoginPage.loginWithCredentials('',mocked_password)
        await LoginPage.validateErrorLoginMessage('Invalid email address.')
    })
    it('unsuccessful login, wrong password', async () => {
        await browser.url('/')
        await LandingPage.navigateToLoginPage()
        await LoginPage.loginWithCredentials(process.env.USER_EMAIL,mocked_password)
        await LoginPage.validateErrorLoginMessage('Wrong email or password.')
    })
    it('unsuccessful login, invalid email format', async () => {
        await browser.url('/')
        await LandingPage.navigateToLoginPage()
        await LoginPage.loginWithCredentials(mocked_domain,mocked_password)
        await LoginPage.validateErrorLoginMessage('Invalid email address.')
    })
})
