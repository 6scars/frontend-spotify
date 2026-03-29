import { useState, useRef, useEffect } from "react"
import { useUIStateContext } from "../contexts/UIStateContext"

export function useMovingPanels (initial = 100){
    const [leftWidth, setLeftWidth]         = useState(initial)
    const isDragging                        = useRef(false) 
    const rectObject                        = useRef(null)

    useEffect(()=>{
        const handleMouseMove = (e) => {
            if(!isDragging.current) return
            const rect              = rectObject.current.getBoundingClientRect();
            const deltaWidthPx      = e.clientX - rect.left;
            const deltaWidthPrc     = (deltaWidthPx / rect.width) * 100

            console.log(rect)
            console.log(rect.left)
            console.log(e.clientX)
            console.log(deltaWidthPx)
            console.log(deltaWidthPrc)

            setLeftWidth(deltaWidthPrc)


            
        }


        const handleMouseUp = () => {
            isDragging.current = false;
            console.log("isDragging.current OFF", isDragging.current)
        }
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handleMouseUp)
        
        return () => {
            window.removeEventListener("mouseup", handleMouseUp)
            window.removeEventListener("mousemove", handleMouseMove)
        }
    },[])

    
    function onMouseDown(e){
        console.log(e)
        isDragging.current = true;
        console.log("isDragging.current ON", isDragging.current)
    }

    console.log("useMovingPanels")
    return{
        leftWidth,
        onMouseDown,
        rectObject
    }

}