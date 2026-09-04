import { useContext } from 'react';
import { ToastContext } from './ToastContext.js'

export function useToastContext(){
    return useContext(ToastContext)
}
