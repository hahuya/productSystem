const {makeStyles} = require("@material-ui/core");


export const useStyles = makeStyles((theme)=>({
    tableContainer: {
        flexGrow: 1,
        flex: '1 1 auto',
        '& tbody td': {
            verticalAlign: 'middle'
        },
        '& td img':{
            maxHeight: 140,
            maxWidth: '100%',
        },
        '& td div':{
            maxHeight: '100%',
            textAlign: 'center'
        },
    },
    GTPaginator: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),

    },
}))