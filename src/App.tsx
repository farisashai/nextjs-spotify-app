import React from 'react'

const App = ({ user }) => {
  const { display_name, email } = user.body;
  return (
    <div>
      {user ? (
        <div>{display_name} is currently logged in</div>
      ) : (
        <a href="/api/auth/login">Login with Spotify</a>
      )}
    </div>
  )
}

export default App