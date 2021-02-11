import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const Text = ({setText, text}) => {
    return(
        <div><CKEditor
        editor={ClassicEditor}
        data={text ? text : ''}
        config={{
            toolbar: {
                items: [
                    'fontfamily', 'fontsize', '|',
                    'alignment', '|',
                    'fontColor', 'fontBackgroundColor', '|',
                    'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                    'insertTable', '|',
                    'imageUpload', 'blockQuote', '|',
                    'undo', 'redo'
                ],
                shouldNotGroupWhenFull: true
            }
        }}
        onChange = {(event, editor)=>setText(editor.getData())}
    /></div>
    )
}
 
export default Text;