import React from 'react'
import { Editor } from "@tinymce/tinymce-react"
import { Controller } from 'react-hook-form'

export default function RTE({
    name, control, label, defaultValue = ""
}) {
    return (
        <div className='w-full'>
            {label && <label className='text-gray-500'>{label}</label>}
            <Controller
            name={name || "content"}
            control={control}
            render={({field : {onChange}}) => (
                <Editor
                    apiKey='kpcxfjlvhq04a3be021h9eoyttx70t0eimciklnpjw4stfyz'
                    initialValue={defaultValue}
                    init={{
                        initialValue : defaultValue,
                        height: 500,
                        menubar: true,
                        toolbar: 'undo redo | formatselect |bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | link | image',
                        branding: false,
                        default_link_target: "_blank",
                        content_style: 'body { font-family: Arial, sans-serif; }'
                    }}
                    onEditorChange={onChange}
                />
            )}
            />
        </div>
    )
}

