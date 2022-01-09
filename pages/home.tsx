import TopArtists from "components/homePage/TopArtists";
import cookie from "cookie";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { getSessionCookie, UserSession } from "utils/cookies";
import { createSpotifyApi } from "utils/spotify";
import s from "styles/Home.module.scss";
import Navbar from "components/common/Navbar";
import React, { useState } from "react";
import TopTracks from "components/homePage/TopTracks";
import TopAlbums from "components/homePage/TopAlbums";
import MusicPlayer from "components/common/MusicPlayer";

interface HomeProps {
  session: UserSession;
  track: SpotifyApi.CurrentlyPlayingResponse;
}

const HomePage: React.FC<HomeProps> = ({ session, track }) => {
  const [mode, setMode] = useState("artists");
  return (
    <>
      <Navbar user={session.user} track={track} setMode={setMode} />
      <hr />
      {(() => {
        switch (mode) {
          case "artists":
            return <TopArtists />;
          case "tracks":
            return <TopTracks />;
          case "albums":
            return <TopAlbums />;
        }
      })()}
      {/* {mode === "artists" && <TopArtists />}
      {mode === "tracks" && <TopTracks />}
      {mode === "albums" && <TopAlbums />}
      <MusicPlayer track={track} /> */}
    </>
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
