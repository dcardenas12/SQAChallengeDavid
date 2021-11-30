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
    get btn_dontChangeTimeZone (){ return $("a[class ^= 'timezone_link']:nth-of-type(2)") }
    get btn_dueDate (){ return $(".item_due_selector") }
    get edt_dueDate (){ return $(".scheduler-input input") }   
    get btn_previewDate (){ return $(".scheduler-preview-content") } 

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

    async changeTimeZoneWhenPrompted() {
        try{
            await this.btn_dontChangeTimeZone.waitForDisplayed({ interval:200, 
                timeout:2000 })
            await this.btn_dontChangeTimeZone.click()
        }catch(err){
            console.log("Correct Timezone")
        }
    }

    async addCustomDueDate(dueDate) {
        await this.btn_dueDate.click()
        await this.edt_dueDate.addValue(dueDate)
        await this.btn_previewDate.click()
    } 

}
module.exports = new DashboardPage()