export interface Order {
    // Define order properties
    id: number;
    title: string;
    // Add other order properties as needed
}

export interface OrdersState {
    orders: Order[];
    isConnected: boolean;
}

export interface SetOrdersAction {
    type: string;
    payload: Order[];
}

export interface SetConnectionStatusAction {
    type: string;
    payload: boolean;
}