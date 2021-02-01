export default class Adapter {
    constructor(response, responseVidjetData) {
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
        const newData = this.data.map((el, i) => {
            console.log(el)
            switch (el.title) {
                case 'Видео' : return {
                    title: 'video', id:el.id,
                    body: {
                        id: el.id,
                        video_link: el.settings.fields.video_link.value, 
                        title: el.settings.fields.title.value || '',
                        catalog_id: el.catalog_id,
                        landing_prop_id: el.landing_prop_id
                    }
                }
                case 'Вопросы': return { title: 'question', id: el.id, body: this.createQuestions(el) }
                case 'Текст': return { title: 'text', id: el.id, body: { title: el.settings.fields.title.value || '', discription: el.settings.fields.description.value || '' } }
                case 'Баннер': return { title: 'banner', id: el.id, body: { link: el.settings.fields.banner_photo.value ? el.settings.fields.banner_photo.value : null, checked: (el.settings.fields.checkbox_banner.value == true), linkSite: el.settings.fields.checkbox_banner.children.fields.link.value || null } }
                case 'Контакты': return { title: 'contacts', id: el.id, body: { address: { text: el.settings.fields.address.value, checked: el.settings.fields.show_address.value }, email: { text: el.settings.fields.email.value, checked: el.settings.fields.show_email.value }, fax: { text: el.settings.fields.fax.value, checked: el.settings.fields.show_fax.value }, phone: { text: el.settings.fields.phone.value, checked: el.settings.fields.show_phone.value } } }
                case 'Соц сети, мессенджеры': return {
                    title: 'social', id: el.id,
                    body: {
                        social: {
                            title: el.settings.fields.social_title.value,
                            vk: { checked: el.settings.fields.vk.value ? this.createBoolValue(el.settings.fields.vk.value) : this.createBoolValue(el.settings.fields.vk.default), link: el.settings.fields.vk.children.fields.vk_link.value },
                            facebook: { checked: el.settings.fields.facebook.value ? this.createBoolValue(el.settings.fields.facebook.value) : this.createBoolValue(el.settings.fields.facebook.default), link: el.settings.fields.facebook.children.fields.facebook_link.value },
                            twitter: { checked: el.settings.fields.twitter.value ? this.createBoolValue(el.settings.fields.twitter.value) : this.createBoolValue(el.settings.fields.twitter.default), link: el.settings.fields.twitter.children.fields.twitter_link.value },
                            // ticktok: { checked: el.settings.fields.tiktok.value ? this.createBoolValue(el.settings.fields.tiktok.value) : this.createBoolValue(el.settings.fields.tiktok.default), link: el.settings.fields.tiktok.children.fields.vk_link.value }
                        },
                        messeger: {
                            title: el.settings.fields.messengers_title.value,
                            whatsup: { checked: el.settings.fields.WhatsApp.value ? this.createBoolValue(el.settings.fields.WhatsApp.value) : this.createBoolValue(el.settings.fields.WhatsApp.default), link: el.settings.fields.WhatsApp.children.fields.WhatsApp_link.value },
                            telegram: { checked: el.settings.fields.Telegram.value ? this.createBoolValue(el.settings.fields.Telegram.value) : this.createBoolValue(el.settings.fields.Telegram.default), link: el.settings.fields.Telegram.children.fields.Telegram_link.value },
                            skype: { checked: el.settings.fields.skype.value ? this.createBoolValue(el.settings.fields.skype.value) : this.createBoolValue(el.settings.fields.skype.default), link: el.settings.fields.skype.children.fields.skype_link.value },
                            viber: { checked: el.settings.fields.Viber.value ? this.createBoolValue(el.settings.fields.Viber.value) : this.createBoolValue(el.settings.fields.Viber.default), link: el.settings.fields.Viber.children.fields.Viber_link.value }
                        }
                    }
                }
                default: return null
            }
        })

        return newData
    }

    createQuestions(obj) {
        if (!obj.settings) return null

        const answerArr = obj.settings.fields.answer.value
        const questionsArr = obj.settings.fields.issue.value
        const questionObj = { type: 'question' }

        const questionsArray = new Array(answerArr.length)
            .fill('')
            .map((el, i) => {
                const obj = {}
                obj.id = this.randomNumber()
                obj.answer = answerArr[i]
                obj.question = questionsArr[i]
                return obj
            })
        return questionsArray
    }
    randomNumber() {
        return Math.random()
    }
    createBoolValue = num => num == 1 ? true : false
}