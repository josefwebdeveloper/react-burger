import React, { createContext, useState, ReactNode } from 'react';
import { IngredientModel } from "../models/burger-data.model";

interface ConstructorContextValue {
    ingredientsData: IngredientModel[];
    setIngredientsData: React.Dispatch<React.SetStateAction<IngredientModel[]>>;
    orderNumber: number | null;
    updateOrderNumber: (newOrderNumber: number) => void;
}

interface ConstructorProviderProps {
    children: ReactNode;
    ingredientsData: IngredientModel[];
}

export const ConstructorContext = createContext<ConstructorContextValue | undefined>(undefined);

export const ConstructorProvider: React.FC<ConstructorProviderProps> = ({ children, ingredientsData }) => {
    const [currentIngredientsData, setCurrentIngredientsData] = useState<IngredientModel[]>(ingredientsData);
    const [orderNumber, setOrderNumber] = useState<number | null>(null);

    const updateOrderNumber = (newOrderNumber: number) => {
        setOrderNumber(newOrderNumber);
    };

    const contextValue: ConstructorContextValue = {
        ingredientsData: currentIngredientsData,
        setIngredientsData: setCurrentIngredientsData,
        orderNumber,
        updateOrderNumber,
    };

    return (
        <ConstructorContext.Provider value={contextValue}>
            {children}
        </ConstructorContext.Provider>
    );
};
