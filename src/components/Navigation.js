import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {

    return (
        <div className='grid-container'>
            <p>This is the navigation bar.</p>
            <button><Link to="/auth">Sign up</Link></button>
        </div>
    )
}

export default Navigation