import React,{useState,useEffect} from 'react'
import logo from "./lazeez.svg"
import axios from "axios"


function IngredientsWindow() {


    const api= axios.create({baseURL: "http://127.0.0.1:8000"})
    const [ingredients,setIngredients]= useState([])

    api.get("/api").then(response=>console.log(response))

  return (
    <div>
        <div className={"appbar container-fluid"}>
            <div className = "imgholder"><img src ={logo} alt="lazeez"/></div>
            <div className="seperator"></div>
            <div className="buttonholder"><button className={"buttons"}>{"Reset"}</button></div>
        </div>
        <div className="foodpane">
            <div className={"ingredientspane"}>
                
            </div>
            <div className={"dishespane"}>
                
            </div>
        </div>
    </div>
  )
}

export default IngredientsWindow