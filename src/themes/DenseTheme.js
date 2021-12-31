import {createMuiTheme} from '@material-ui/core';


export const denseTheme = createMuiTheme({
    spacing: 4,
    props: {
        UIHeader:{
            height: '10vh',
            backgroundColor: '#333333',
        },
        MuiButton: {
            size: 'small',
            variant: 'contained',
            color: 'primary',
        },
        MuiFilledInput: {
            margin: 'dense',
        },
        MuiFormControl: {
            margin: 'dense',
        },
        MuiFormHelperText: {
            margin: 'dense',
        },
        MuiIconButton: {
            size: 'small',
            color: 'primary',
        },
        MuiInputBase: {
            margin: 'dense',
        },
        MuiInputLabel: {
            margin: 'dense',
        },
        MuiListItem: {
            dense: true,
        },
        MuiOutlinedInput: {
            margin: 'dense',
        },
        MuiFab: {
            size: 'small',
        },
        MuiTable: {
            size: 'small',
        },
        MuiTextField: {
            margin: 'dense',
            variant: 'outlined',
        },
        MuiToolbar: {
            variant: 'dense',
        },
        MuiToggleButtonGroup: {
            size: 'small',
        },
        MuiCheckbox: {
            size: 'small',
        },
        MuiMenuItem: {
            dense: true,
        }
    },
    overrides: {
        MuiCheckbox:{
            root: {
                padding: 4
            }
        },
        MuiIcon: {
            root: {
                height: '1.25em'
            }
        },
        MuiIconButton: {
            sizeSmall: {
                // 调整间距来实现最小的触摸目标框
                marginLeft: 4,
                marginRight: 4,
                padding: 5,
            },
        },
        MuiCardHeader: {
            root: {
                padding: '5px 10px'
            }
        },
        MuiCardContent: {
            root: {
                padding: '4px 8px'
            }
        },
        MuiDialogTitle: {
            root: {
                padding: '4px 8px'
            }
        },
        MuiInputLabel: {
            marginDense: {
                fontSize: '0.9rem'
            }
        },
        MuiInputBase: {
            marginDense: {
                fontSize: '0.9rem'
            }
        },
        MuiOutlinedInput: {
            input: {  //TODO remove whole section
                padding: '18.5px 14px !important',
                border: '0 !important'
            },
            inputMarginDense: {
                paddingTop: '8px !important',  //TODO clean !important
                paddingBottom: '8px !important'  //TODO clean !important
            }
        },
        MuiAutocomplete: {
            inputRoot: {
                '&[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"]':{
                    padding: '3px !important'  //TODO clean !important
                }
            }
        },
        MuiAccordionSummary:{
            root:{
                minHeight: '32px',
                '&$expanded': {
                    minHeight: '32px',
                }
            },
            content: {
                margin: '5px 0',
                '&$expanded': {
                    padding: '5px 0',
                    margin: '0px'
                }
            },
            expandIcon: {
                padding: '5px'
            }
        },
        MuiMenuItem: {
            root:{
                paddingTop: 2,
                paddingBottom: 2,
            }
        },
    },
});