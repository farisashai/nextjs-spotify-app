import cookie from "cookie";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { getSessionCookie } from "utils/cookies";
import Link from "next/link";

interface IndexProps {}

const IndexPage: React.FC<IndexProps> = () => {
  return <Link href="/api/auth/login">Login with Spotify</Link>;
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const openApp: GetServerSidePropsResult<IndexProps> = {
    redirect: {
      destination: "/home",
      permanent: false,
    },
  };
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const session = await getSessionCookie(cookies);

    if (session) {
      return openApp;
    } else {
      return {
        props: {},
      };
    }
  } catch {
    return {
      props: {},
    };
  }
};
