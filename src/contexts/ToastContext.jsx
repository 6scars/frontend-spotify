import React, { createContext, useContext, useState }   from 'react';
import Toast                                       from '../Toast/Toast.jsx';
import useToast                                         from '../hooks/useToast.jsx'
const ToastContext = createContext(null)

export const ToastProvider = ({children}) =>{
    const {error, setError} = useToast();
    const showError = (message) =>{
        const id = Date.now();
        setError({id, message})
    }
    console.log(error)
    return(
        <ToastContext.Provider value={{showError}}>
            {children}
            {error && <Toast key={error.id} message={error.message} />}
        </ToastContext.Provider>
    )
}

export function useToastContext(){
    return useContext(ToastContext)
}
