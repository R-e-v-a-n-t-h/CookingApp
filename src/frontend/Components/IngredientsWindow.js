import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom";

import logo from "./lazeez.svg"
import axios from "axios"
import "./food.css"


function IngredientsWindow() {


    const [ingredients,setIngredients]= useState([])
    const[fakeIngredients,setFakeIngredients]=useState(ingredients)
    const [indecies,setIndecies]= useState({})
    const [inputArray,setInputArray]=useState([])
    const [requiredIngredients,setRequiredIngredients]=useState({})


    const [dishes,setDishes]= useState([])

    const [numberOfIngredients,setNumberOfIngredients]=useState(Number(0))

    const [chosenIngredients,setChosenIngredints]=useState(new Set())

    const coloring={
      0: "dishIngredients",
      1:"pickedDishIngredients"

    }


    

   const getData = async () => {
    await axios.get("http://127.0.0.1:8000/api").then(response => {
    setIngredients(response.data.ingredients)
    setFakeIngredients((response.data.ingredients)/*.sort((a, b) => 0.5 - Math.random())*/)
    setIndecies(response.data.indecies)
    setDishes(response.data.dishes)
    setInputArray(new Array(response.data.ingredients.length).fill(0))
    setNumberOfIngredients(0)
    setChosenIngredints(new Set())
   }
    )
  };

  const getRequiredIngredients = async () => {
    await axios.get("http://127.0.0.1:8000/api/required-ingredients")
      .then(response=>{setRequiredIngredients(response.data)})
    
  }





  const ingredientClicked = async (ingredient) => {

    const position = indecies[ingredient]
    var x = numberOfIngredients
    
    if (inputArray[position] === 0){
      inputArray[position] = 1

      chosenIngredients.add(ingredient)
      
      setChosenIngredints(chosenIngredients)
      
      setNumberOfIngredients((self)=>{
        return self+1
      })
    }else{
      inputArray[position] = 0

      chosenIngredients.delete(ingredient)
      setChosenIngredints(chosenIngredients)

      setNumberOfIngredients((self)=>{
        return self-1})
    }
    
    
    // inputArray[position] = Number(!(inputArray[position]))
    setInputArray(inputArray)
    console.log(inputArray)


    if ( JSON.stringify(inputArray)==JSON.stringify(Array(inputArray.length).fill(Number(0)))){
        await axios.get("http://127.0.0.1:8000/api")
          .then(response=>setDishes(response.data.dishes))
    }
    else{
       
        await axios.post("http://127.0.0.1:8000/api/predict",{array:inputArray,chosenIngredients:Array.from(chosenIngredients)})
          .then(response=>{setDishes(response.data.predictions)})
    }
    
  }


const handleIngredientClick= (e) =>{

  var temp = e.target.style.color
  e.target.style.color=e.target.style.backgroundColor
  e.target.style.backgroundColor=temp
  
  ingredientClicked(e.target.innerText)
  // console.log(e)


}


  

  useEffect(() => {
    getRequiredIngredients();
  },[])

  useEffect(() => {
    getData();
  },[]);









  return (
    <div>
        
        
        <div className={"appbar container-fluid"}>
            <div className = "imgholder"><img src ={logo} alt="lazeez"/></div>
            <div className="seperator"></div>
            <div className="buttonholder"><button className={"buttons"} onClick={() => window.location.reload(false)}>{"Reset"}</button></div>
        </div>


        <div className="foodpane">
            
            
            
            <div className={"ingredientspane"}>

              <div className={"ingredientsholder"}>
                {fakeIngredients.map((x)=>{
                  return (<div className="ingredient"  style={{color:"#258425",backgroundColor:"white"}} onClick={handleIngredientClick}>{x}</div>)
                })}
              </div>
            </div>


            <div className={"dishespane"}>
              {dishes.map((x)=>{
                  return (<Link  style={{textDecoration: "none"}} to={`/recipe?dish=${x}`} target='_blank'>
                  <div className="dish">
                        <div className="dishName">{x}</div>
                        <div className="dishIngredientsHolder">
                              {((requiredIngredients[`${x}`]===undefined)?[]:requiredIngredients[`${x}`]) .map((y)=>{return (
                              <div className={coloring[inputArray[indecies[y.toLowerCase()]]]!=undefined?coloring[inputArray[indecies[y.toLowerCase()]]]:"dishIngredients"}>{y}</div>) })}
                        </div>
                  </div>
                  </Link>)
              })}
                
            </div>



        </div>




    </div>
  )
}

export default IngredientsWindow