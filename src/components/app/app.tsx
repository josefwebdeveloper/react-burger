import styles from './app.module.css';
import React, {useEffect, useState} from 'react';
import './app.module.css';
import {AppHeader} from "../app-header/app-header";
import {Main} from "../main/main";
import {getIngredients} from "../../services/api.service";
import {IngredientModel} from "../../models/burger-data.model";
import Modal from "../modal/modal";

function App() {
    const [ingredientsData, setIngredientsData] = useState<IngredientModel[] >([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await getIngredients();
                console.log(result)
                setIngredientsData(result.data);
                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error);
                } else {
                    setError(new Error('An unknown error occurred'));
                }
                setLoading(false);
            }
        };

        loadData();
    }, []);
  return (
      <div className={styles.app}>
          <div>
              <button onClick={() => setModalOpen(true)}>Открыть модальное окно</button>
              <Modal
                  title="Детали ингредиента"
                  isOpen={isModalOpen}
                  onClose={() => setModalOpen(false)}
              >
                  {/* Содержимое модального окна */}
                  something
              </Modal>
          </div>
          <AppHeader/>
          <Main ingredientsData={ingredientsData}/>
      </div>
  );
}

export default App;
