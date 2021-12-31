import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Editor} from "ketcher-react";
import {RemoteStructServiceProvider} from "ketcher-core";
import 'ketcher-react/dist/index.css'
import config from "react-global-configuration";


const URL_PREFIX = config.get('url_prefix', '')
const structServiceProvider = new RemoteStructServiceProvider(`${URL_PREFIX}/api/ketcher`)


MoleculeEditor.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    structServiceProvider: PropTypes.object,
    buttons: PropTypes.object,
};

function MoleculeEditor(props) {
    const {value, onChange, buttons} = props
    const [editorReady, setEditorReady] = useState(false)

    const handleChange = async ()=>{
        if(typeof onChange !== 'function'){return}
        const ketcher = window.ketcher
        if(!ketcher){return}
        ketcher.getSmilesAsync().then(smiles=>{
            if(!smiles){
                onChange(null)
            }else{
                ketcher.getMolfileAsync().then(moltext=>{onChange(moltext)})
            }
        })
    }

    const waitForEditor = ()=>{
        if(editorReady){return}
        if(typeof window.ketcher !== "undefined"){
            setEditorReady(true)
        }else{
            setTimeout(waitForEditor, 100);
        }
    }

    useEffect(()=>{
        if(!editorReady){return}
        const ketcher = window.ketcher
        ketcher.getSmilesAsync().then(smiles=>{
            if(!smiles && !value){return}
            ketcher.getMolfileAsync().then(moltext=>{
                if(moltext===value){return}
                ketcher.setMolecule(value)
            })
        })
    }, [value, editorReady])


    useEffect(()=>{
        waitForEditor()
    }, [])


    return (
        <div onBlur={handleChange} style={{height: 'inherit'}}>
            <Editor
                staticResourcesUrl={process.env.PUBLIC_URL}
                structServiceProvider={props.structServiceProvider || structServiceProvider}
                buttons={buttons}
            />
        </div>
    );
}

export default MoleculeEditor;