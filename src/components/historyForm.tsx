import { useState } from 'react';

import { connect } from 'react-redux';
import { clear } from '../redux/actions';

import styles from '../styles/components.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const HistoryForm = ({ refProp, handleOpen, handleClose, history, isEmpty, clearHistory }: any ) => {

    const [ isOpened, setIsOpened ] = useState(false);

    function toggleIsOpened(){
        return setIsOpened( prev => !prev );
    }

    const handleClick = () => {
        if(isOpened){
            handleClose();
            toggleIsOpened();
        }else{
            handleOpen();
            toggleIsOpened();
        }
    }

    return(
        <div className={styles.historyForm} ref={refProp} >
            <div className={styles.historyForm__content} >
                <div className={styles.historyForm__content__topBar} >
                    <span> Data </span>
                    <span> Przed konwersją </span>
                    <span> Po konwersji </span>
                </div>

                <div className={styles.historyForm__content__array }>
                {
                    isEmpty 
                    ? 
                        <div className={styles.historyForm__content__array__message}>Brak historii konwersji walut</div> 
                    : 
                        history.map( (item: any, index: number) => {
                            if(index > 0){
                                return(
                                    <div 
                                        className={styles.historyForm__content__singleElement }
                                        key={item.id}
                                    >
                                        <span> {item.data} </span>
                                        <span> {item.input} {item.inputCurr} </span>
                                        <span> {item.output} {item.outputCurr} </span>
                                    </div>
                                    )
                            }
                        })
                }
                </div>

                <button className={styles.historyForm__content_button} onClick={clearHistory} > Wyczyść historię </button>

            </div>
            <div className={styles.historyForm__toggleButton} onClick={handleClick} >               
            { isOpened ? 
                <FontAwesomeIcon 
                    icon={faTimes} 
                    className={styles.historyForm__toggleButton__icon}    
                /> 
            : <div className={styles.historyForm__toggleButton__icon}> </div> }

            <span className={styles.historyForm__toggleButton__text}>Historia</span> </div>
        </div>
    )
}

function mapStateToProps(state: any){
    return{
        isEmpty: state.isEmpty,
        history: state.history
    }
}

function mapDispatchToProps(dispatch: Function){
    return{
        clearHistory: () => dispatch(clear())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryForm);