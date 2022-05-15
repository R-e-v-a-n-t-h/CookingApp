import React,{useState,useEffect} from 'react'
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
    const [reset,setReset]=useState(0)

    const [numberOfIngredients,setNumberOfIngredients]=useState(Number(0))





    

   const getData = async () => {
    await axios.get("http://127.0.0.1:8000/api").then(response => {
    setIngredients(response.data.ingredients)
    setFakeIngredients(response.data.ingredients)
    setIndecies(response.data.indecies)
    setDishes(response.data.dishes)
    setInputArray(new Array(response.data.ingredients.length).fill(0))
    setNumberOfIngredients(0)
    console.log(numberOfIngredients)
   }
    )
  };

  const getRequiredIngredients = async () => {
    await axios.get("http://127.0.0.1:8000/api/required-ingredients")
      .then(response=>{setRequiredIngredients(response.data)})
    
  }





  const ingredientClicked = async (dish) => {

    const position = indecies[dish]
    var x = numberOfIngredients
    
    if (inputArray[position] === 0){
      inputArray[position] = 1
      
      setNumberOfIngredients((self)=>{
        return self+1
      })
    }else{
      inputArray[position] = 0
      setNumberOfIngredients((self)=>{
        return self-1})
    }
    
    
    // inputArray[position] = Number(!(inputArray[position]))
    setInputArray(inputArray)
    console.log(inputArray)
    console.log(numberOfIngredients)



    if ( JSON.stringify(inputArray)==JSON.stringify(Array(inputArray.length).fill(Number(0)))){
        await axios.get("http://127.0.0.1:8000/api")
          .then(response=>setDishes(response.data.dishes))
    }
    else{
       
        await axios.post("http://127.0.0.1:8000/api/predict",{array:inputArray})
          .then(response=>{setDishes(response.data.predictions)})
    }
    
  }



  

  useEffect(() => {
    getRequiredIngredients();
  },[])

  useEffect(() => {
    getData();
  },[reset]);









  return (
    <div>
        
        
        <div className={"appbar container-fluid"}>
            <div className = "imgholder"><img src ={logo} alt="lazeez"/></div>
            <div className="seperator"></div>
            <div className="buttonholder"><button className={"buttons"} onClick={()=>{setReset(!reset)}}>{"Reset"}</button></div>
        </div>


        <div className="foodpane">
            
            
            
            <div className={"ingredientspane"}>
              <div>SearchBar</div>
              <div className={"ingredientsholder"}>
                {fakeIngredients.map((x)=>{
                  return (<div className="ingredient" onClick={()=>{ingredientClicked(x)}}>{x}</div>)
                })}
              </div>
            </div>



            <div className={"dishespane"}>
              {dishes.map((x)=>{
                  return (
                  <div className="dish">
                        <div className="dishName">{x}</div>
                        <div className="dishIngredientsHolder">
                              {requiredIngredients[`${x}`].map((y)=>{return (<div className="dishIngredients">{y}</div>) })}
                        </div>
                  </div>
                  )
              })}
                
            </div>



        </div>




    </div>
  )
}

export default IngredientsWindow