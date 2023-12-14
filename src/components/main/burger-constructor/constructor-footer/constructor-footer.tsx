
import styles from './constructor-footer.module.css';
import classNames from "classnames";
export const ConstructorFooter = () => {
    return (
        <section className={classNames(styles['constructor-footer'])}>
            <div className="content">
                <p>Copyright © 2023 Your Company</p>
                {/* Add your footer content here */}
            </div>
        </section>
    );
};