import { createContext, useState } from "react"

export const cartContext = createContext()

const Context = ({ children }) => {
  const [cartInfo, setCartInfo] = useState(null)

  return (
    <cartContext.Provider value={{ cartInfo, setCartInfo }}>
      {children}
    </cartContext.Provider>
  )
}

export default Context