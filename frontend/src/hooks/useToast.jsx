import { useState } from "react"

export default function useToast(){
    const [error, setError] = useState(null)

    return({
        error,
        setError
    })
}