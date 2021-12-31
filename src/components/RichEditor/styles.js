import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(()=>({
    EditorContainer: {
        '& .DraftEditor-editorContainer':{
            height: '250px'
        },
        '& .public-DraftEditor-content':{
            overflowY: 'scroll',
        }
    }
}))