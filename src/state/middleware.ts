import {MiddlewareAPI, Dispatch, Action, createAction} from '@reduxjs/toolkit';
import {OrdersPayload} from "../models/orders.model";
import {GET_ORDERS_BASE_URL} from "../constants";
import {refreshToken} from "../services/api";
import {prepareQueryParam} from "../utils/utils";

// Action types for WebSocket events
const WS_CONNECT = 'ws/connect';
const WS_DISCONNECT = 'ws/disconnect';
const WS_MESSAGE = 'ws/message';
// Action types for fetching user-specific orders
const WS_USER_ORDERS_CONNECT = 'ws/userOrdersConnect';
const WS_USER_ORDERS_MESSAGE = 'ws/userOrdersMessage';
const WS_USER_ORDERS_DISCONNECT = 'ws/userOrdersDisconnect';


interface WebSocketAction extends Action {
    type: typeof WS_CONNECT | typeof WS_DISCONNECT | typeof WS_MESSAGE |
        typeof WS_USER_ORDERS_CONNECT | typeof WS_USER_ORDERS_MESSAGE | typeof WS_USER_ORDERS_DISCONNECT;
    payload?: any;
}

const createWebSocketMiddleware = () => {
    let socket: WebSocket | null = null; // Initialize `socket` here
    let userOrdersSocket: WebSocket | null = null;

    return (store: MiddlewareAPI<Dispatch<Action>, any>) => (next: Dispatch<Action>) => (action: Action) => {
        const wsAction = action as WebSocketAction;
        const {dispatch} = store;
        switch (wsAction.type) {
            case WS_CONNECT:
                if (socket !== null) {
                    socket.close();
                }
                socket = new WebSocket(GET_ORDERS_BASE_URL+'/all');

                socket.onopen = () => {

                };

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    store.dispatch({ type: WS_MESSAGE, payload: data });
                };

                socket.onclose = () => {
                    socket = null;
                }

                break;

            case WS_DISCONNECT:
                if (socket !== null) {
                    socket.close();
                    socket = null;
                }
                break;
            case WS_USER_ORDERS_CONNECT:
                let accessToken: string | null| undefined = localStorage.getItem('accessToken');

                if (!accessToken) {
                    console.error('Access token not found');
                    return;
                }

                accessToken = accessToken?.replace("Bearer ", "").trim();

                const userOrdersWsUrl = `${GET_ORDERS_BASE_URL}?token=${prepareQueryParam(accessToken)}`;
                if (userOrdersSocket !== null) {
                    userOrdersSocket.close();
                }
                userOrdersSocket = new WebSocket(userOrdersWsUrl);

                userOrdersSocket.onopen = () => console.log();
                userOrdersSocket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if(data.message === 'Invalid or missing token') {
                        refreshToken()
                            .then(res => {

                                dispatch(wsConnectUserOrders());
                            })
                    }
                    store.dispatch({ type: WS_USER_ORDERS_MESSAGE, payload: data });
                };
                userOrdersSocket.onclose = () => {

                    userOrdersSocket = null;
                };

                break;
            case WS_USER_ORDERS_DISCONNECT:
                if (userOrdersSocket !== null) {
                    userOrdersSocket.close();
                    userOrdersSocket = null;
                }

                break;

            default:
                return next(action);
        }
    };
};

export default createWebSocketMiddleware;
export const wsMessage = createAction<OrdersPayload>('ws/message');
export const wsConnectUserOrders = createAction('ws/userOrdersConnect');
export const wsUserOrdersMessage = createAction<OrdersPayload>('ws/userOrdersMessage');
export const wsDisconnectUserOrders = createAction('ws/userOrdersDisconnect');
export const wsDisconnect = createAction('ws/disconnect');
