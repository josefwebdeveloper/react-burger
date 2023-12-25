export interface IngredientModel {
    _id: string
    name: string
    type: string
    proteins: number
    fat?: number
    carbohydrates: number
    calories: number
    price: number
    image: string
    image_mobile: string
    image_large: string
    __v: number
}
export interface getIngredientsResponse  {
    success: boolean,
    data: IngredientModel[]
}
export interface IngredientsProps {
    ingredientsData: IngredientModel[],
}
export interface IngredientProps {
    ingredient: IngredientModel;
    onOpenModal: (ingredient:IngredientModel) => void;
}


export const ingredientsTypes = [
    {name: 'Булки', type: 'bun'},
    {name: 'Соусы', type: 'sauce'},
    {name: 'Начинки', type: 'main'},
]

export interface MakeOrderResponse{
    success: boolean
    name: string
    order: Order
}

export interface Order {
    number: number
}


