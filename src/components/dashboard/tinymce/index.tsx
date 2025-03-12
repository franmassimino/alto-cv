import React from 'react'
import { Editor } from '@tinymce/tinymce-react'

const CvEditor = ({ content, setContent }: { content: string; setContent: (content: string) => void }) => {
  return (
    <Editor
      apiKey="fzpikniwt2mzlpac9l0xc5378nagkcwzcjxi0kpmodisxmf6"
      value={content} // Mantiene sincronizado el contenido con el estado
      onEditorChange={(newContent) => setContent(newContent)} // Actualiza el estado al escribir
      init={{
        height: '80vh',
        plugins: [
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link',
          'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
        ],
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | ' +
          'link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | ' +
          'align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
      }}
    />
  )
}

export default CvEditor
