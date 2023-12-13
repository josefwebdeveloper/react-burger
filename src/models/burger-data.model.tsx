export interface IngredientModel {
    _id: string
    name: string
    type: string
    proteins: number
    fat: number
    carbohydrates: number
    calories: number
    price: number
    image: string
    image_mobile: string
    image_large: string
    __v: number
}
export interface IngredientsProps {
    ingredientsData: IngredientModel[];
}
export interface IngredientProps {
    ingredient: IngredientModel;
}


export const ingredientsTypes = [
    {name: 'Булки', type: 'bun'},
    {name: 'Соусы', type: 'sauce'},
    {name: 'Начинки', type: 'main'},
]