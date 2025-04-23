import { Fragment, useRef, useState } from 'react';
import {EditorState , convertToRaw, convertFromRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = ({onChange, value, wrapperClassName, editorClassName, toolbarClassName}) => {
  const [editorState, setEditorState] = createEditorState(value);
  // console.log("empty",editorState)
  // console.log("empty",convertedRaw.getBlocksAsArray())
  const handleChange = (editorState) =>{   
    const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()))  
    onChange(content)
  }

  function createEditorState (initialVal){
    if(!initialVal || initialVal === ""){
      return useState(
        () => EditorState.createEmpty(),
      );
    }
  
    const raw = JSON.parse(initialVal);
    const convertedRaw = convertFromRaw(raw);
    return useState(
      () => EditorState.createWithContent(convertedRaw),
    );
  }

  return (
    <Editor 
      placeholder='tell your story'
      editorState={editorState}
      onEditorStateChange={editorState => {
        // const content = convertToRaw(JSON.parse(value))
        setEditorState(editorState);
        handleChange(editorState);
      }} 
      wrapperClassName={`${wrapperClassName? wrapperClassName: "editor-wrapper"}`}
      editorClassName={`${editorClassName? editorClassName : "editor" }`}
      toolbarClassName={`${toolbarClassName? toolbarClassName : "editor-toolbar"}`}
    />
  )
}

export default TextEditor