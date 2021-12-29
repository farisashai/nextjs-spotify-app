import Link from 'next/link';
import createSpotifyApi from 'utils/spotify';

const App = ({ session }) => {
  const { display_name,  } = session.user.body;

  const spotifyApi = createSpotifyApi(session.token.access_token)


  return (
    <div>
      {display_name ? (
        <div>{display_name} is currently logged in</div>
      ) : (
        <Link href="/api/auth/login">Login with Spotify</Link>
      )}
    </div>
  )
}

export default App