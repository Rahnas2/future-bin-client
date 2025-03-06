import React from "react"

interface AuthLayoutProps {
    children: React.ReactNode;
  }

  
const AuthLayOut: React.FC<AuthLayoutProps> = ({children}) => {
  return (
    <div className="bg-seconday">
        {children}
    </div>
  )
}

export default AuthLayOut