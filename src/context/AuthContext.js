import React from 'react'

const AuthContext = React.useContext(null)

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
