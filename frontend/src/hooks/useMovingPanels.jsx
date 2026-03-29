import { useState, useRef, useEffect } from "react"

export function useMovingPanels (initial = 50){
    const [leftWidth, setLeftWidth]         = useState(initial)
    const isDragging                        = useRef(false) 
    const rectObject                        = useRef(null)

    useEffect(()=>{
        const handleMouseMove = (e) => {
            if(!isDragging.current) return
            const rect              = rectObject.current.getBoundingClientRect();
            const deltaWidthPx      = e.clientX - rect.left;
            const deltaWidthPrc     = (deltaWidthPx / rect.width) * 100
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
    }

    console.log("useMovingPanels")
    return{
        leftWidth,
        onMouseDown,
        rectObject
    }

}