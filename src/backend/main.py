# BACKEND IMPORTS
from condition import *
from fastapi import FastAPI, Path, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

# DATA HANDLING
import pandas as pd
import numpy as np
import ast
import pickle

app = FastAPI()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get('/api')
async def openingPage():
    data = pd.read_csv('Cleaned_Data.csv')
    allIngredients = data.columns.tolist()
    allIngredients.pop(0)
    allIngredients.pop(0)
    allIngredients.pop(0)
    allIngredients.pop(0)
    allIngredients.pop(0)
    indecies = {}
    dishes = np.array(data["title"]).tolist()
    for i in range(len(allIngredients)):
        indecies[allIngredients[i]] = i
    return {"ingredients": allIngredients, "indecies": indecies, "dishes": dishes}


@app.get("/api/required-ingredients")
async def requiredIngredients():
    data = pd.read_csv('Cleaned_Data.csv')
    # data.drop_duplicates()
    ner = np.array(data["NER"]).tolist()
    x = np.array(data["title"]).tolist()
    for i in range(len(ner)):
        ner[i] = ast.literal_eval(ner[i])
    ingredients = {}
    for i in range(len(x)):
        if x[i] not in ingredients:
            ingredients[x[i]] = ner[i]
    return ingredients


@app.post("/api/specific-recipes")
async def recipes(request: Request):
    data = pd.read_csv('Cleaned_Data.csv')
    if request:
        params = await request.json()
        dish = params["dish"]
    requestedData = data.loc[data["title"].str.contains(dish, regex=False)]
    directions = ast.literal_eval(
        np.array(requestedData["directions"]).tolist()[0])
    ingredients = ast.literal_eval(
        np.array(requestedData["ingredients"]).tolist()[0])

    return {"ingredients": ingredients, "directions": directions}


@app.post("/api/predict")
async def predict(request: Request):

    data = pd.read_csv('Cleaned_Data.csv')
    pickle_in = open("NearestNeighborModel.pkl", 'rb')
    model = pickle.load(pickle_in)

    allIngredients = data.columns.tolist()
    allIngredients.pop(0)
    allIngredients.pop(0)
    allIngredients.pop(0)
    allIngredients.pop(0)
    allIngredients.pop(0)

    if request:
        params = await request.json()
        X = params["array"]
        picked = params["chosenIngredients"]

        if len(X) == len(allIngredients):
            predictions = model.kneighbors(np.array([X]))
            predictedData = data.iloc[predictions[1][0]]
            predictedData = classifier(predictedData, picked)
            sendData = np.array(predictedData["title"]).tolist()
            return {"predictions": sendData}
        else:
            raise HTTPException(400, "Error")

    raise HTTPException(400, "Error")
