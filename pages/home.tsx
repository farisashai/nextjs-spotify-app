import Card from "components/common/Card";
import LogoutButton from "components/homePage/Logout";
import TopArtists from "components/homePage/TopArtists";
import TopTracks from "components/homePage/TopTracks";
import cookie from "cookie";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { useState } from "react";
import { getSessionCookie, UserSession } from "utils/cookies";
import { createSpotifyApi } from "utils/spotify";

interface HomeProps {
  session: UserSession;
  track: SpotifyApi.CurrentlyPlayingResponse;
}

const HomePage: React.FC<HomeProps> = ({ session, track }) => {
  const [CurrentTab, setCurrentTab] = useState(() => null);
  return (
    <div>
      <h1>Logged In: {session.user.display_name}</h1>
      <h2>Current Track: {track?.item?.name || "None"}</h2>
      <button onClick={() => setCurrentTab(() => TopArtists)}>
        Top Artists
      </button>
      <button onClick={() => setCurrentTab(() => TopTracks)}>Top Tracks</button>
      <hr />
      {CurrentTab && <CurrentTab />}
    </div>
  );
};

export default HomePage;

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
