import { useRef } from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../redux/reducer';

import styles from '../styles/pages.module.css';

import gsap from 'gsap';

import MainForm from '../components/mainForm';
import HistoryForm from '../components/historyForm';

const Main = () => {

    const mainFormRef = useRef<HTMLElement>(null);
    const historyFormRef = useRef<HTMLElement>(null);
    const tl = gsap.timeline();

    const openHistory = () => {
        tl.to(mainFormRef.current, { x:'-=45%', duration: 1 } )
        .to(historyFormRef.current, { x:'+=45%', duration: 1 })}

    const closeHistory = () => {
        tl.to(historyFormRef.current, { x:'-=45%', duration: 1 })
        .to(mainFormRef.current, { x:'+=45%', duration: 1 })}


    const store = createStore(reducer);

    return(
        <Provider store={store}>
            <div className={styles.container}>                       
                <MainForm  
                    refProp={mainFormRef} 
                />
                <HistoryForm 
                    refProp={historyFormRef} 
                    handleOpen={openHistory} 
                    handleClose={closeHistory}
                />
                <div className={styles.logo}>
                    NASK
                </div>
                <div className={styles.background} > </div>
            </div>
        </Provider>
    )
}

export default Main;