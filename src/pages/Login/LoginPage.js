import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid, Radio,
    RadioGroup,
    TextField
} from "@material-ui/core";
import {useFormik} from "formik";
import AuthAPI from "../../api/AuthAPI";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/userInfo/userSlice";


const companies = [
    {label: '佳途', value: '佳途'},
    {label: '优瓦', value: '优瓦'},
]


LoginPage.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func,
};

function LoginPage() {
    let history = useHistory();
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:{
            username: '',
            password: '',
            company: '佳途',
        },
        onSubmit: values => {
            AuthAPI.login(values)
                .then(data=>{
                    if(!data){return}
                    if(data.status!=='success'){
                        alert("Login fail")
                        return
                    }
                    dispatch(setUser(data.user))
                    history.push('/')
                })
                .catch(e=>alert(e))
        }
    })

    const handleKeyPress = (e)=>{
        if (e.key === 'Enter') {
            formik.submitForm()
            e.preventDefault();
        }
    }
    return (
        <Grid container justify={"space-around"}>

            <Grid item md={2}>
                <Card title={"Login"}>
                    <CardContent>
                        <Grid container direction={"column"}>
                            <Grid item>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Company</FormLabel>
                                    <RadioGroup aria-label="company" name="company" value={formik.values.company} onChange={formik.handleChange}>
                                        {companies.map((value, index)=>(
                                            <FormControlLabel key={index} value={value.value} control={<Radio />} label={value.label} />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <TextField
                                    label={"User"} id={'username'} fullWidth
                                    value={formik.values.username} onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label={"Password"} id={'password'} type={"password"} fullWidth
                                    value={formik.values.password} onChange={formik.handleChange}
                                    onKeyPress={handleKeyPress}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    color={"primary"} variant={"contained"}
                                    onClick={formik.submitForm}
                                >Login</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default LoginPage;