import { Editor } from '@tinymce/tinymce-react'
import React from 'react'
import { Controller } from 'react-hook-form'


function RTE({
  name, label, control, defaultValue= " "
}) {
  return (
    <div className=' w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Controller
      name={name || ""}
      control={control}
      render={({field:{onChange}})=>(
        <Editor
        apiKey='le9w353m0h8xz36mkjwt83s6e3luusq7lebg3jl5fckv3v0h'
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
       
        onEditorChange={onChange}
        />
       )} 
      />
    </div>
  )
}

export default RTE