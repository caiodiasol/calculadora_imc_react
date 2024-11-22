import { useState } from "react";
import styles from './Header.module.css';

const Header = () => {
    let [infoVisivel, SetInfoVisivel] = useState(false);

    return(
        <>
            <header className={styles.header}>
                <h1 className={styles.header__title}>Calcule seu <span onClick={()=> SetInfoVisivel(!infoVisivel)} className={styles.info} title="O que é IMC?">IMC</span>
                    </h1>
            
            {infoVisivel && (
                <div className={styles.header__description}>
                    <p>
                    O IMC (Índice de Massa Corporal) é uma ferramenta simples e amplamente utilizada para categorizar os indivíduos de acordo com seu peso em relação à altura. Trata-se de uma forma de estimar a quantidade de gordura corporal que uma pessoa possui, e é utilizada por profissionais de saúde para determinar possíveis riscos à saúde. 
                    </p>
                </div>
            )}
            </header>
        </>
    )
}
export default Header;