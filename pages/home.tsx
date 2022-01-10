import TopArtists from "components/homePage/TopArtists";
import cookie from "cookie";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { getSessionCookie, UserSession } from "utils/cookies";
import Navbar from "components/common/Navbar";
import React, { useState } from "react";
import TopTracks from "components/homePage/TopTracks";
import TopAlbums from "components/homePage/TopAlbums";
import MusicPlayer from "components/common/MusicPlayer";

interface HomeProps {
  session: UserSession;
}

const HomePage: React.FC<HomeProps> = ({ session }) => {
  const [mode, setMode] = useState("artists");
  return (
    <>
      <Navbar user={session.user} setMode={setMode} />
      <hr />
      {mode === "artists" && <TopArtists />}
      {mode === "tracks" && <TopTracks />}
      {mode === "albums" && <TopAlbums />}
      <MusicPlayer />
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

    if (session) {
      return {
        props: {
          session,
        },
      };
    } else {
      return noAuth;
    }
  } catch {
    return noAuth;
  }
};
