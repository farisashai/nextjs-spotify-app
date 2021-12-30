import cookie from "cookie";
import { GetServerSideProps } from "next";

import App from "components/App";
import { getSessionCookie, UserSession } from "utils/cookies";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const session = await getSessionCookie(cookies);

    return {
      props: {
        session,
      },
    };
  } catch {
    return {
      props: {},
    };
  }
};

interface IndexProps {
  session: UserSession;
}

const IndexPage: React.FC<IndexProps> = ({ session }) => {
  return <App session={session} />;
};

export default IndexPage;
