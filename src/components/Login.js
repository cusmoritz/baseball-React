import React, { useState } from "react";

const Login = (props) => {

    const { token } = props;
    console.log('token in login', token)

    return (
        <p>This is the login page.</p>
    )
}

export default Login