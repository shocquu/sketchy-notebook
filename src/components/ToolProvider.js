import React, { useState } from 'react'

const initialState = 'rectangle'

export const ToolContext = React.createContext()

export default ({ children }) => {
    const [tool, setTool] = useState(initialState)

    return (
        <ToolContext.Provider value={[tool, setTool]}>{ children }</ToolContext.Provider>
    )
}
