import { Link } from "react-router-dom"
import React from "react";


function NoMatch(){

    return (
        <div>
            <h1>404 Page not found</h1>
            <Link to='/'>Return to Homepage</Link>
        </div>
    )

}

export default NoMatch