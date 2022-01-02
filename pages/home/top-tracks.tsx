import LogoutButton from "components/homePage/LogoutButton";
import TopArtists from "components/homePage/TopArtists";
import TopTracks from "components/homePage/TopTracks";
import cookie from "cookie";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Link from "next/link";
import { getSessionCookie, UserSession } from "utils/cookies";
import { createSpotifyApi } from "utils/spotify";
import s from "styles/Home.module.scss";

interface HomeProps {
  session: UserSession;
  track: SpotifyApi.CurrentlyPlayingResponse;
}

const HomePage: React.FC<HomeProps> = ({ session, track }) => {
  return (
    <div>
      <h1>Logged In: {session.user.display_name}</h1>
      <h2>Current Track: {track?.item?.name || "None"}</h2>
      <LogoutButton />
      <Link href={"/home/top-artists"}>
        <a className={s.button}>Top Artists</a>
      </Link>
      <Link href={"/home/top-tracks"}>
        <a className={s.button}>Top Tracks</a>
      </Link>
      <Link href={"/home/top-albums"}>
        <a className={s.button}>Top Albums</a>
      </Link>
      <hr />
      <TopTracks />
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
