import {makeStyles} from "@material-ui/core";

export const [white, green, red, yellow] = ['#fff', '#deffe0', '#ffe8e8', '#fff9d8']
export const [purple, blue] = ['#e0d0ff', '#cfe4ff']

export const useStyles = makeStyles(()=>({
    SelectorRoot:{
        // zIndex: 99999,
    },
    InquiryItemTable: {
        '& td':{
            verticalAlign: 'middle',
        },
        '& td.htMultiCandidate': {
            backgroundColor: '#ffd9a0 !important'
        },
    },
    HtCatNoFieldItem: {
        height: '80px',
        '& img': {
            maxHeight: '100%'
        }
    },
    HtCatNoItemDiv: {
        maxHeight: '100%',
    },
    SalesInquiryItemTable: {
        '& .MuiCardHeader-action': {
            'alignSelf': 'center'
        }
    }
}))

