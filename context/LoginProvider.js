import { createContext } from 'react'
import React, { useState } from 'react'

const LoginContext = createContext()

const LoginProvider = ( {children}) => {
    const [LoggedIn, setLoggedIn] = useState(false)
    const [thisUser, setThisUser] = useState(user)

    return <LoginContext.Provider value={{LoggedIn, setLoggedIn, thisUser, setThisUser}}>
        {children}
    </LoginContext.Provider>
}

export default LoginProvider