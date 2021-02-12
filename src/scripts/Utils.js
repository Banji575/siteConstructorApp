import parse from 'html-react-parser'

export default class Utils {
    static CKEditorTools = ['Bold', 'Italic', 'Underline', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'Font', 'Size', 'Form']
    static createHTML = str => parse(str)
}