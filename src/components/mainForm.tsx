import { useState } from 'react';

import { connect } from 'react-redux';
import { add } from '../redux/actions';

import styles from '../styles/components.module.css';

import { useForm } from 'react-hook-form';

import Span from './span';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

const optionsCurrency = [
    {
        id: 1,
        name: 'eur'
    },
    {
        id: 2,
        name: 'usd'
    },
    {
        id: 3,
        name: 'chf'
    },
    {
        id: 4,
        name: 'gbp'
    },
    {
        id: 5,
        name: 'jpy'
    },
    {
        id: 6,
        name: 'pln'
    }
]

const HTTP = 'https://free.currconv.com';
const API_KEY = 'ab0f20c49631a6916932';

function MainForm({ refProp, history, addNewFormat }: any) {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            inputVal: 0,
            fromCurrency: 'eur',
            toCurrency: 'eur'
        }
    });

    const [ result, setResult ] = useState(0);
    const [ currency, setCurrency ] = useState('EUR');

    const onSubmit = (array: any) => 
    {
        const value: number = array.inputVal;
        const from = array.fromCurrency.toUpperCase();
        const to = array.toCurrency.toUpperCase();
        const concat = `${from}_${to}`;
        let rate: number = 0;
        
        fetch(`${HTTP}/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=${API_KEY}`)
        .then(res => {
            if(res.status === 200){
                return res.json();
            }
        })
        .then(data => {
            switch(concat){
                case 'EUR_EUR': rate=data.EUR_EUR; break;
                case 'EUR_USD': rate=data.EUR_USD; break;
                case 'EUR_CHF': rate=data.EUR_CHF; break;
                case 'EUR_GBP': rate=data.EUR_GBP; break;
                case 'EUR_JPY': rate=data.EUR_JPY; break;
                case 'EUR_PLN': rate=data.EUR_PLN; break;

                case 'USD_EUR': rate=data.USD_EUR; break;
                case 'USD_USD': rate=data.USD_USD; break;
                case 'USD_CHF': rate=data.USD_CHF; break;
                case 'USD_GBP': rate=data.USD_GBP; break;
                case 'USD_JPY': rate=data.USD_JPY; break;
                case 'USD_PLN': rate=data.USD_PLN; break;

                case 'CHF_EUR': rate=data.CHF_EUR; break;
                case 'CHF_USD': rate=data.CHF_USD; break;
                case 'CHF_CHF': rate=data.CHF_CHF; break;
                case 'CHF_GBP': rate=data.CHF_GBP; break;
                case 'CHF_JPY': rate=data.CHF_JPY; break;
                case 'CHF_PLN': rate=data.CHF_PLN; break;

                case 'GBP_EUR': rate=data.GBP_EUR; break;
                case 'GBP_USD': rate=data.GBP_USD; break;
                case 'GBP_CHF': rate=data.GBP_CHF; break;
                case 'GBP_GBP': rate=data.GBP_GBP; break;
                case 'GBP_JPY': rate=data.GBP_JPY; break;
                case 'GBP_PLN': rate=data.GBP_PLN; break;

                case 'JPY_EUR': rate=data.JPY_EUR; break;
                case 'JPY_USD': rate=data.JPY_USD; break;
                case 'JPY_CHF': rate=data.JPY_CHF; break;
                case 'JPY_GBP': rate=data.JPY_GBP; break;
                case 'JPY_JPY': rate=data.JPY_JPY; break;
                case 'JPY_PLN': rate=data.JPY_PLN; break;

                case 'PLN_EUR': rate=data.PLN_EUR; break;
                case 'PLN_USD': rate=data.PLN_USD; break;
                case 'PLN_CHF': rate=data.PLN_CHF; break;
                case 'PLN_GBP': rate=data.PLN_GBP; break;
                case 'PLN_JPY': rate=data.PLN_JPY; break;
                case 'PLN_PLN': rate=data.PLN_PLN; break;

                default: console.log('error');
            }
            let resTmp = value*rate;
            setResult(Number(resTmp.toFixed(2)))
            setCurrency(to);

            const dateObj = new Date();

            const actualDay = (dateObj.getDay()-1 < 10) ? `0${dateObj.getDay()-1}`:dateObj.getDay()-1;
            const actualMonth = (dateObj.getMonth()+1 < 10) ? `0${dateObj.getMonth()+1}`:dateObj.getMonth()+1;
            const actualYear = dateObj.getFullYear();
  
            const fullDate = `${actualDay}-${actualMonth}-${actualYear}`;

            let historySingleElement: Object = {
                id: Number(history.length),
                data: String(fullDate),
                input: Number(value),
                inputCurr: String(from),
                output: Number(resTmp.toFixed(2)),
                outputCurr: String(to)
            }
            addNewFormat(historySingleElement);
        });
    } 

    return(
        <div className={styles.mainForm} ref={refProp} >
            <div className={styles.mainForm__inner}>
                <Span fontSize='1.6' >Konwerter walut</Span>

                <form 
                    className={styles.mainForm__inner__form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input 
                        {...register('inputVal', { 
                            required: 'Pole wymagane!', 
                            min: {
                                value: 0,
                                message: 'Wartość musi być powyżej 0.'
                            }
                     })} 
                        type='number'
                        placeholder='Wpisz kwotę'
                        className={styles.input}
                    />
                    <p>{errors.inputVal?.message}</p>

                    <p className={styles.output} >
                        <span> {result !== 0 ? result : 'wynik'} </span>
                        <span> {currency} </span>
                    </p>

                    <div className={styles.container__select}>
                        <select 
                            {...register('fromCurrency')}
                            className={styles.select} 
                        >
                            {
                                optionsCurrency.map( item => <option value={item.name} key={`currencyId-${item.id}`}> {item.name} </option>)
                            }
                        </select>

                        <div 
                            className={styles.mainForm__icon}
                            onClick={ () => console.log('elo')}
                        > <FontAwesomeIcon icon={faExchangeAlt} />  </div>

                        <select
                            {...register('toCurrency')}
                            className={styles.select} 
                        >
                            {
                                optionsCurrency.map( item => <option value={item.name} key={`currencyId-${item.id}`}> {item.name} </option>)
                            }
                        </select>
                    </div>

                    <button 
                        className={styles.button}
                        type='submit'
                    >
                        konwertuj
                    </button>
                </form>
            </div>
        </div>
    )
}

function mapStateToProps(state: any){
    return{
        history: state.history
    }
}

function mapDispatchToProps(dispatch: Function){
    return{
        addNewFormat: (payload: any) => dispatch(add(payload))
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(MainForm);