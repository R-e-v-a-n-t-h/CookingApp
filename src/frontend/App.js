import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import './app.css'
import { Link } from 'react-router-dom'
import logo from "./lazeez.svg"


function App() {
    const ar=new Array(1097).fill(0)
    const [x,setX]= useState(ar)
    return(
    <div>
        <div className={"appbar container-fluid"}>
            <div className = "imgholder"><img src ={logo} alt="lazeez"/></div>
            <div className="seperator"></div>
            <div className="buttonholder"><button className={"buttons"}>{"Reset"}</button></div>
        </div>
        <div className="foodpane">
            <div className={"ingredientspane"}>
                {x.map((z)=>{
                    return <div>z</div>
                })}
                
            </div>
            <div className={"dishespane"}>
                {x.map((z)=>{
                    return <div>z</div>
                })}
            </div>
        </div>
    </div>
    )
}

export default App
