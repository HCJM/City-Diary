import * as React from 'react'
import { useState } from 'react'

export const AuthContext = React.createContext(null)

//wrapper for the provider
export const AuthProvider = ({ user, children }) => {
  const [currentUser, setCurrentUser] = useState(user)
  const [LoggedIn, setLoggedIn] = useState(false)

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, LoggedIn, setLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  )
}

//custom hook for accessing auth user data context throughout app
export const useAuth = () => React.useContext(AuthContext)
