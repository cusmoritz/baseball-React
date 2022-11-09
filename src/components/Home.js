import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {

    const history = useParams();

    return (
        <p>You are home</p>
    )
}

export default Home