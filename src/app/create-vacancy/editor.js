import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default function Editor({description , setDescription }){

return <CKEditor
    editor={ClassicEditor}
    data={description}
    config={{
        language: 'ru',
        toolbar: ['bold', 'italic', 'undo', 'redo' , 'bulletedList' , 'numberedList']
    }}
    onReady={editor => {
        console.log('Editor is ready to use!', editor)
    }}
    onChange={(event, editor) => {
        const data = editor.getData()
        setDescription(data)
        console.log(data);
    }}
    onBlur={(event, editor) => {
        console.log('Blur.', editor)
    }}
    onFocus={(event, editor) => {
        console.log('Focus.', editor)
    }}
/>
}