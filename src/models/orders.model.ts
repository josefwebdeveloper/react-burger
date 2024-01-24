export interface getOrdersResponse {
    success: boolean
    orders: Order[]
    total: number
    totalToday: number
}

export interface Order {
    _id: string
    ingredients: string[]
    status: string
    name: string
    createdAt: string
    updatedAt: string
    number: number
}
export interface OrdersPayload {
    orders: Order[];
}
