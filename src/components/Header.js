import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import {AppBar, Button, IconButton, Toolbar, Typography, useTheme} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useStyles} from "../themes/styles";
import {useSelector} from "react-redux";
import AuthAPI from "../api/AuthAPI";


Header.propTypes = {
    handleDrawerOpen: PropTypes.func
};

function Header(props) {
    const theme = useTheme()
    const classes = useStyles(theme)
    let history = useHistory()
    const {handleDrawerOpen} = props
    const user = useSelector(({userInfo})=>userInfo.user)
    const subTitle = useSelector(({subTitle})=>subTitle.subTitle)

    return (
        <div className={classes.Header}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar variant="dense">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        询价系统产品列表{!!subTitle?` - ${subTitle}`:''}
                    </Typography>
                    {!!user?.username?(
                        <React.Fragment>
                            <Typography>Welcome {user.company} - {user.username}</Typography>
                            <Button onClick={()=> {
                                AuthAPI.logout().then(()=>{})
                                history.push('/login')
                            }}>Logout</Button>
                        </React.Fragment>
                    ):(
                        <Button color={'secondary'} onClick={()=>history.push('/login')}>Login</Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;