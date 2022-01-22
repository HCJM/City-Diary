import React, { useState } from 'react'

export const AuthContext = React.createContext(null)

//wrapper for the provider
export const AuthProvider = ({ user, children }) => {
  const [currentUser, setCurrentUser] = useState(user)

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

//custom hook
export const useAuth = () => React.useContext(AuthContext)
