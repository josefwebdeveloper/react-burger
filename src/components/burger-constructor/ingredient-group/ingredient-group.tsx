import styles from './ingredient-group.module.css';
import classNames from "classnames";
import React, {useEffect, useRef} from "react";
import {getHeightFromDivToBottom} from "../../../utils/utils";

export const IngredientGroup = () => {
    const [height, setHeight] = React.useState(600);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {

            const heightFromDivToBottom = getHeightFromDivToBottom(containerRef)-136;
            setHeight(heightFromDivToBottom);
        }
    }, []);
    return (
        <section ref={containerRef} style={{'height': height}}
                 className={classNames(styles['ingredient-group-container'],'custom-scroll')}>

        </section>
    );
};