export default class Adapter {
    constructor(response,responseVidjetData) {
        this.data = response.data
    }

    getData() {
        return this.data
    }

    threeGenerate(arr = []) {
        let a = arr => arr.filter(item => {
            item['childrenList'] = arr.filter(i => i.parent_id === item.id)
            return arr;
        })
        return a(arr).filter(u => u.parent_id == '0')
    }

    createData() {
        const catalogMenu = this.data.catalog_menu
        const menuTree = this.threeGenerate(catalogMenu)
        const backgroundColor = this.data.settings.background_color
        const colorTopTitle = this.data.settings.title_background
        const siteLogo = this.data.logo
        const siteTitle = this.data.title

        this.data.siteMenu = menuTree
        this.data.backgroundColor = backgroundColor ? `#${backgroundColor}` : '#fff'
        this.data.settings.title_background = colorTopTitle ? `#${colorTopTitle}` : '#fff'
        this.data.siteLogo = siteLogo
        this.data.siteTitle = siteTitle
        this.data.siteVidjets = {
            questions: []
        }

        delete this.data.catalog_menu
        delete this.data.settings.background_color
        delete this.data.settings.title_background
        delete this.data.logo
        delete this.data.title
        return this.data
    }
    createVidjetData() {
       const newData = this.data.map((el,i )=> {
        console.log(el)
            switch (el.title) {
                case 'Вопросы': return{title:'question', id:el.id, body:this.createQuestions(el)}
                case 'Текст' : return {title: 'text', id:el.id, body: {title: el.settings.fields.title.value || '', discription: el.settings.fields.description.value || ''}}
                //case 'Баннер' : return {title: 'banner', id:el.id, body:{link:el.banner_photo.value[0]}}
                default: return null
            }
        })
        console.log(newData)
        
        return newData
    }

    createQuestions(obj) {
        if (!obj.settings) return null
        
        const answerArr = obj.settings.fields.answer.value
        const questionsArr = obj.settings.fields.issue.value
        const questionObj = {type:'question'}

        const questionsArray = new Array(answerArr.length)
            .fill('')
            .map((el, i) => {
                const obj = {}
                obj.id = this.randomNumber()
                obj.answer = answerArr[i]
                obj.question = questionsArr[i]
                return obj
            })
            return  questionsArray
    }
    randomNumber() {
        return Math.random()
    }
}