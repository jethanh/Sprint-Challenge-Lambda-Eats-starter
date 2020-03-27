import React from "react";
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <h1>order pizza plz</h1>
            <h2>good pizza mm.. yes.. cheesy</h2>
           
            <h3>click link button for pzza</h3>
            <Link to={"/form"}>
                <div>make pzza</div>
            </Link>
        </div>
    )
}

export default Home;