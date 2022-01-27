import React, { useState, useEffect } from 'react';
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from "draftjs-to-html";
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const DraftEditor = ({ input, meta, field, form, label, placeholder, labelCss }) => {
    const [active, setActive] = React.useState();
    const [ editorState, setEditorState ] = useState(() => EditorState.createEmpty())
    
    const onEditorStateChange = editorState => {
        changeValue(editorState);
    };
    
    const changeValue = editorState => {
        setEditorState(editorState);
        form.setFieldValue(
            field.name,
            draftToHtml(convertToRaw(editorState.getCurrentContent()))
        );
    };
    
    // const hasError = form.touched[field.name] && form.errors[field.name];
    
    useEffect(() => {
        if (form.dirty) {
            return;
        }
        if (!field.value) {
          return;
        }
        const contentBlock = htmlToDraft(field.value);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(
              contentBlock.contentBlocks
            );
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState);
        }
    }, [field.value, form.dirty]);
    
    
    
    return (
        <>
            {/* { label && (
                <Label isActive={active} css={labelCss}>
                    {label}
                </Label>
            )} */}
            
            <Editor 
                editorState={editorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                onEditorStateChange={editorState => onEditorStateChange(editorState)}
                placeholder={placeholder}
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "fontFamily",
                    "list",
                    "textAlign",
                    "link",
                    "embedded",
                    "remove",
                    "history"
                  ]
                }}
                name={field.name}
                id={field.name}
                onFocus={() => setActive(true)}
                onBlur={e => {
                  setActive(false);
                  field.onBlur(e);
                }}
            />
        </>
    )
}

export default DraftEditor;