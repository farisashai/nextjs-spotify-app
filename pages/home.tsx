import cookie from "cookie";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { useEffect } from "react";
import { getSessionCookie, UserSession } from "utils/cookies";
import createSpotifyApi from "utils/spotify";

interface HomeProps {
  session: UserSession;
  track: SpotifyApi.CurrentlyPlayingResponse;
}

const Home: React.FC<HomeProps> = ({ session, track }) => {
  console.log(track);

  return (
    <div>
      <h1>Logged In: {session.user.display_name}</h1>
      <p>Current Track: {track.item.name}</p>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const noAuth: GetServerSidePropsResult<HomeProps> = {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };

  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const session = await getSessionCookie(cookies);

    const spotifyApi = createSpotifyApi(session.token.access_token);
    const tracks = await spotifyApi.getMyCurrentPlayingTrack();

    if (session) {
      return {
        props: {
          session,
          track: tracks.body,
        },
      };
    } else {
      return noAuth;
    }
  } catch {
    return noAuth;
  }
};
