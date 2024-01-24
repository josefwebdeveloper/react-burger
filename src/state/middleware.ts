// src/middleware/webSocketMiddleware.ts
import {MiddlewareAPI, Dispatch, AnyAction, createAction} from '@reduxjs/toolkit';
import {OrdersPayload} from "../models/orders.model";

// Action types for WebSocket events
const WS_CONNECT = 'ws/connect';
const WS_DISCONNECT = 'ws/disconnect';
const WS_MESSAGE = 'ws/message';
// Action types for fetching user-specific orders
// const WS_USER_ORDERS_CONNECT = 'ws/userOrdersConnect';
// const WS_USER_ORDERS_MESSAGE = 'ws/userOrdersMessage';


// Define a more specific action type if needed
interface WebSocketAction extends AnyAction {
    type: typeof WS_CONNECT | typeof WS_DISCONNECT | typeof WS_MESSAGE;
    payload?: any;
}

// WebSocket middleware creator
const createWebSocketMiddleware = (url: string) => {
    let socket: WebSocket | null = null; // Initialize `socket` here

    return (store: MiddlewareAPI<Dispatch<AnyAction>, any>) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
        const wsAction = action as WebSocketAction;

        switch (wsAction.type) {
            case WS_CONNECT:
                if (socket !== null) {
                    socket.close();
                }
                socket = new WebSocket(url);

                socket.onopen = () => {
                    console.log('WebSocket Connected');
                };

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    store.dispatch({ type: WS_MESSAGE, payload: data });
                };

                socket.onclose = () => {
                    console.log('WebSocket Disconnected');
                    socket = null;
                };

                break;

            case WS_DISCONNECT:
                if (socket !== null) {
                    socket.close();
                    socket = null;
                }
                console.log('WebSocket Disconnected manually');
                break;

            default:
                return next(action);
        }
    };
};

export default createWebSocketMiddleware;
export { WS_CONNECT, WS_DISCONNECT, WS_MESSAGE };
export const wsMessage = createAction<OrdersPayload>('ws/message');
