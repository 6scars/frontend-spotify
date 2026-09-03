import Toast                                           from '../../widgets/Toast/Toast.jsx';
import { ToastContext }                                from './ToastContext.js'
import useToast                                        from './useToast.jsx'

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
