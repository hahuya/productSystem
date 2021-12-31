import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import Editor, {createEditorStateWithText} from "@draft-js-plugins/editor";
import {convertToRaw} from "draft-js";
import {Paper, Typography} from "@material-ui/core";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import {useStyles} from "./styles";

RichEditor.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];


function RichEditor(props){
    const {id, label, value, onChange, name} = props
    const editor = useRef(null)
    const [editorState, setEditorState] = useState(createEditorStateWithText(''))
    const classes = useStyles()

    useEffect(()=>{
        setEditorState(createEditorStateWithText(value))
    }, [value])

    const handleBlur = (e)=>{
        if(typeof onChange !== 'function'){return}
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const value = blocks.map(block => (!block.text.trim() && '') || block.text).join('\n')
        e.target.name = name
        e.target.value = value
        onChange(e)
    }

    return (
        <div className={classes.EditorContainer}>
            <Typography>{label}</Typography>
            <Paper>
                <Editor
                    id={id || name}
                    ref={editor}
                    editorState={editorState}
                    onChange={setEditorState}
                    placeholder="Write something!"
                    plugins={plugins}
                    onBlur={handleBlur}
                />
                <Toolbar />
            </Paper>
        </div>
    )
}

export default RichEditor;