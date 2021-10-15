const Page = require('./Page')
const casual = require('casual')

let taskContentList = []
let taskDescriptionList = []

class DashboardPage extends Page {


    get img_avatar () { return $("img[class^='user_avatar']") }
    get btn_plusAddTask () { return $(".plus_add_button") }
    get edt_taskContent () { return $("div[class *= 'public-DraftEditor-content']") }
    get edt_taskDescription () { return $("textarea[class ^= 'task_editor__description']") }
    get btn_addTask () { return $("button[type = 'submit']") }
    get lbl_taskContent () { return $("div[class $= task_content]") }
    get lbl_taskDescription () { return $("div[class $= task_description]") }
    get lbl_taskContents () { return $$("div[class $= task_content]") }
    get lbl_taskDescriptions () { return $$("div[class $= task_description]") }  

    async validateSuccessfulLogin(){
        await this.img_avatar.waitForExist({timeout:5000})
        let avatarDisplayed = await this.img_avatar.isDisplayed()
        expect(avatarDisplayed).to.be.true
    }

    async clickOnAddTaskButton(){
        await this.btn_plusAddTask.click()
    }

    async createTasks(taskAmount){
        let content
        let description
        for(let i = 0 ; i<taskAmount ; i++){
            content = casual.title
            description = casual.short_description
            taskContentList.push(content)
            taskDescriptionList.push(description)
            await this.edt_taskContent.addValue(content)
            await this.edt_taskDescription.addValue(description)
            await this.btn_addTask.click()
        }
    }

    async validateCreatedTasks(){
        let contentFound
        let DescriptionFound
        let singleContent
        let singleDescription
        for(let i = 0 ; i < await this.lbl_taskContents.length ; i++){
            singleContent = await this.lbl_taskContents[i].getText()
            singleDescription = await this.lbl_taskDescriptions[i].getText()
            contentFound = taskContentList.find((content) => {
                return content === singleContent
            })
            DescriptionFound = taskDescriptionList.find((description) => {
                return description === singleDescription
            })  
        expect(contentFound).to.deep.equal(singleContent)
        expect(DescriptionFound).to.deep.equal(singleDescription)   
        }
    }

}
module.exports = new DashboardPage()