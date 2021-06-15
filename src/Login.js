import React, {useState} from "react";
import {Stack, Depths, PrimaryButton, TextField} from "@fluentui/react";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Redirect, useHistory} from "react-router-dom";
// import auth from "./auth";

const Login = () => {
    const users = JSON.parse(localStorage.getItem('token'));
    // console.log(auth);
    const history = useHistory();
    const [userInput, setUserInput] = useState({
        email: '',
        password: ''
    });

    const handelChange = (e) => {
        const {name, value} = e.target;
        setUserInput((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    const handelSubmit = (e) => {
        e.preventDefault();
        axios.post("https://touku-api.angelium.net/api/xchat/api-token-auth-touku/", {
            "invitation_code": "",
            "email": userInput.email,
            "password": userInput.password,
            "dev_id": "",
            "rememberMe": false
        }).then((response) => {
            console.log(`token`, response);
            if (response.data.token) {
                localStorage.setItem("token", JSON.stringify(response.data.token));
                history.push('/dashboard');
                toast.success('Login Sucessfully!', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                setUserInput({
                    email: '',
                    password: ''
                });
                toast.error('Invalid Credential!', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }).catch((err) => {
            console.log(err);
        });

        setUserInput({
            email: '',
            password: ''
        });
    }
    return (
        <>
            {
                users ? (<Redirect to='/dashboard'/>) : (
                    <Stack wrap horizontal horizontalAlign={'center'} style={{height: '100vh',background: "ghostwhite"}}>
                        <Stack verticalAlign={'center'} style={{width: '50%'}}>
                            <Stack style={{boxShadow: Depths.depth16, padding: '20px',background: "white"}}>
                                <h1>Login</h1>
                                <Stack.Item style={{margin: '15px'}}>
                                    <TextField name='email' label="Enter E-mail" value={userInput.email}
                                               onChange={(e) => handelChange(e)}
                                    />
                                </Stack.Item>
                                <Stack.Item style={{margin: '15px'}}>
                                    <TextField name='password' label="Enter Password" value={userInput.password}
                                               onChange={(e) => handelChange(e)}
                                    />
                                </Stack.Item>
                                <Stack.Item style={{margin: '15px'}}>
                                    <PrimaryButton disabled={!userInput.password}
                                                   onClick={(e) => handelSubmit(e)}>Login</PrimaryButton>
                                </Stack.Item>
                            </Stack>
                        </Stack>
                    </Stack>
                )
            }

            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default Login;