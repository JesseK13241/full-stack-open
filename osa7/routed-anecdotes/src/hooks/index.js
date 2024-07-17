import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    console.log("USING", type)

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}