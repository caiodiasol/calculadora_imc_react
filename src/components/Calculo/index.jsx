import { useState } from "react";
import { useEffect } from "react";
import styles from './Calculo.module.css';


const Calculo = () => {
    const [peso, setPeso] = useState(0);
    const [altura, setAltura] = useState(0);
    const [imc, setImc] = useState(0);
    const [estadoImc, setEstadoImc] = useState('nao calculado');
    const [erroImc, setErroImc] = useState(true);
    const [msgErro, setMsgErro] = useState('Preencha os campos para calcular seu IMC');

    const [tableVisivel, setTableVisivel] = useState(false);
    
    function CalculandoImc() {
        return (
            (peso / (altura/100 * altura/100)).toFixed(1)
        )
    }

    useEffect(() => { 
        if ((peso== 0 && altura == 0) || (peso == '') || (altura == '') || (imc == 'NaN')) {
            setErroImc(true);
            setMsgErro('Preencha os campos acima para calcular seu IMC');
            return;
        } else if (altura < 40) {
            setErroImc(true);
            setMsgErro('Atenção: a altura deve ser preencida em centímetros');
            return;
        }

        setErroImc(false);
        setImc(CalculandoImc());
    }, [peso, altura]);

    useEffect(()=>{
        let novoEstado = '';

        if(imc <= 16.9){
            novoEstado = 'você está muito abaixo do peso.'
        } else if(imc <= 18.4){
            novoEstado = 'você está abaixo do peso.'
        } else if(imc <= 24.9){
            novoEstado = 'você está no peso normal.'
        } else if(imc <= 29.9){
            novoEstado = 'você está com sobrepeso.'
        } else if(imc <= 34.9){
            novoEstado = 'você está com obesidade grau I.'
        } else if(imc <= 39.9){
            novoEstado = 'você está com obesidade grau II.'
        } else if(imc >= 40){
            novoEstado = 'você está com obesidade grau III.'
        }
        setEstadoImc(novoEstado);
    },[imc]);


    return (
        <>
            <section className={styles.calculador}>
                <form className={styles.form}>
                    <p>
                        Para calcular seu IMC, insira os seguintes dados:</p>
    
                        <div className={styles.formGrid}>
                            <label className={styles.formLabel}>Peso (kg)</label>
                            <input className={styles.formInput} id="peso" type="number" required onKeyUp={(e) => setPeso(parseInt(e.target.value))}/>

                            <label className={styles.formLabel}>Altura (cm)</label>
                            <input className={styles.formInput} id="altura" type="number" required onKeyUp={(e) => setAltura(parseInt(e.target.value))}/>
                        </div>
                </form>

                <div className={styles.resultado}>
                    {erroImc ? (
                        <p>{msgErro}</p>
                    ) : (
                        <>
                            <p>O seu Índice de Massa Corporal é de:</p>
                            <p>
                                <span className={styles.resultadoImc}>{imc}</span> - <span className={styles.resultadoImc}>{estadoImc}</span>
                                <span className={styles.imcTable} onClick={() => setTableVisivel(!tableVisivel)} title="Consultar Tabela">🔎</span>
                            </p>
                        </>
                    )}
                </div>

                {tableVisivel && (
                    <ul className={styles.tabela} >
                        <li className={styles.row}>
                            <p className={styles.titulo}>Imc - kg/m2 </p>
                            <p className={styles.titulo}>Classificação</p>
                        </li>

                        <li className={styles.row}>
                            <p>menor que 16,9</p>
                            <p>muito abaixo do peso</p>
                        </li>

                        <li className={styles.row}>
                            <p>17 a 18,4</p>
                            <p>abaixo do peso</p>
                        </li>

                        <li className={styles.row}>
                            <p>18,5 a 24,9</p>
                            <p>peso normal</p>
                        </li>

                        <li className={styles.row}>
                            <p>25 a 29,9</p>
                            <p>acima do peso</p>
                        </li>

                        <li className={styles.row}>
                            <p>30 a 34,9</p>
                            <p>obesidade grau I</p>
                        </li>

                        <li className={styles.row}>
                            <p>35 a 40</p>
                            <p>obesidade grau II</p>
                        </li>

                        <li className={styles.row}>
                            <p>maior que 40</p>
                            <p>obesidade grau III</p>
                        </li>

                    </ul>
                )}

            </section>
        </>
    )
}


export default Calculo;