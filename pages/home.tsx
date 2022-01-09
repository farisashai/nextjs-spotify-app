import TopArtists from "components/homePage/TopArtists";
import cookie from "cookie";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Link from "next/link";
import { getSessionCookie, UserSession } from "utils/cookies";
import { createSpotifyApi } from "utils/spotify";
import s from "styles/Home.module.scss";
import Navbar from "components/common/Navbar";
import React, { useState } from "react";
import TopTracks from "components/homePage/TopTracks";
import TopAlbums from "components/homePage/TopAlbums";

interface HomeProps {
  session: UserSession;
  track: SpotifyApi.CurrentlyPlayingResponse;
}

const HomePage: React.FC<HomeProps> = ({ session, track }) => {
  const [mode, setMode] = useState("artists");
  return (
    <div>
      <Navbar user={session.user} track={track} />
      <button className={s.button} onClick={() => setMode("artists")}>
        Top Artists
      </button>
      <button className={s.button} onClick={() => setMode("tracks")}>
        Top Tracks
      </button>
      <button className={s.button} onClick={() => setMode("albums")}>
        Top Albums
      </button>
      <hr />
      {mode === "artists" && <TopArtists />}
      {mode === "tracks" && <TopTracks />}
      {mode === "albums" && <TopAlbums />}
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
