import {makeStyles} from "@material-ui/core";

const drawerWidth = 200
const appBarHeight = 60

export const useStyles = makeStyles((theme)=>({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    subDrawerItem: {
        backgroundColor: '#f0f0f0',
        paddingLeft: theme.spacing(8)
    },
    Header:{
        // flexGrow: 1,
    },
    appBar:{
        zIndex: `${theme.zIndex.drawer + 1}!important`,
    },
    DialogPopper:{
        zIndex: `${theme.zIndex.drawer + 100}!important`,
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
        paddingTop: appBarHeight,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: theme.spacing(7) -drawerWidth,
        height: `calc(100%)`,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(13),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(13),
        },
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    drawerContainer: {
        overflowX: 'hidden',
    }
}))
