export interface Burger {
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
export interface BurgersProps {
    burgerData: Burger[];
}
export interface IngredientProps {
    ingredient: Burger;
}


export const burgerTypes = [
    {name: 'Булки', type: 'bun'},
    {name: 'Соусы', type: 'sauce'},
    {name: 'Начинки', type: 'main'},
]