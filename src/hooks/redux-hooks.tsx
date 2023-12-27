import { TypedUseSelectorHook, useDispatch as reduxUseDispatch, useSelector as reduxUseSelector } from 'react-redux';
import {AppDispatch, RootState} from "../state/store";

// Используйте во всём приложении эти хуки вместо хуков из react-redux
export const useDispatch: () => AppDispatch = reduxUseDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;

