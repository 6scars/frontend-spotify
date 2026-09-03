import { useState, useRef, useEffect } from "react"

export function useMovingPanels (initial = 50){
    const [leftWidth, setLeftWidth]         = useState(initial)
    const isDragging                        = useRef(false) 
    const rectObject                        = useRef(null)
    const frame                             = useRef(null) 

    useEffect(()=>{
        const handleMouseMove = (e) => {
            if(!isDragging.current || !rectObject.current)  return
            if(frame.current )                              return

            frame.current = requestAnimationFrame(()=>{
                const rect                      = rectObject.current.getBoundingClientRect();
                const deltaWidthPx              = e.clientX - rect.left;
                const deltaWidthPrc             = (deltaWidthPx / rect.width) * 100

                const clamped                   =  Math.min(90, Math.max(10, deltaWidthPrc))
                setLeftWidth(clamped)    

                frame.current = null
            })

        }

        const handleMouseUp = () => {
            isDragging.current = false;
            document.body.classList.remove("dragging")
            document.body.style.cursor = "default"
        }
        
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handleMouseUp)
        
        return () => {
            window.removeEventListener("mouseup", handleMouseUp)
            window.removeEventListener("mousemove", handleMouseMove)
        }
    },[])

    
    function onMouseDown(){
        isDragging.current = true;
        document.body.classList.add("dragging")
        document.body.style.cursor = "col-resize"
    }

    return{
        leftWidth,
        onMouseDown,
        rectObject
    }

}