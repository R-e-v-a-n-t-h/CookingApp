from numpy import logical_or


def classifier(df, ingredients_array):

    last = len(ingredients_array)-1
    queryString = ""
    for i in range(len(ingredients_array)):
        if i != last:
            queryString += "(`"+ingredients_array[i]+"` == 1) or "
        else:
            queryString += "(`"+ingredients_array[i]+"` == 1)"

    print(queryString)
    return df.query(queryString)
