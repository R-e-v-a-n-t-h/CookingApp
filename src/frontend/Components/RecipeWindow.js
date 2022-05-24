import React,{useState,useEffect,useLocation} from 'react'
import {Link} from "react-router-dom";

import logo from "./lazeez.svg"
import axios from "axios"
import "./food.css"
import "./recipe.css"

function RecipeWindow() {

  const queryParams = new URLSearchParams(window.location.search)
  const dish = queryParams.get("dish")
  const [details,setDetails]=useState({ingredients:[],directions:[]})

  const getData = async ()=>{
    await axios.post(`http://127.0.0.1:8000/api/specific-recipes`,{dish:dish}).then(response=>{setDetails(response.data)})
  }

  useEffect(()=>{
    getData()
    console.log(details)
  },[])


  return (
    <div>
        <div className={"appbar container-fluid"}>
              <div className = "imgholder"><img src ={logo} alt="lazeez"/></div>
              <div className="seperator"></div>
              <div className="buttonholder"><button className={"buttons"} onClick={()=>{window.close()}}>{"Back"}</button></div>
        </div>

        <div className="container-fluid recipewindow">
              <div className="dishTitle">{dish}</div>
              <div className="dishHolder">
              <div className="title">Ingredients</div>
                <ul>
                {
                details.ingredients.map((x)=>{return (<li className="details">{x}</li>)})
                }</ul>
              </div>
              <div className="dishHolder">
              <div className="title">Recipe</div>
                <ul>
                {
                details.directions.map((x)=>{return (<li className="details">{x}</li>)})
              }
              </ul>
              
              </div>

        </div>
    
    </div>
    
  )
}

export default RecipeWindow