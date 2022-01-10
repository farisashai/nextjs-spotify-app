import cookie from "cookie";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { getSessionCookie } from "utils/cookies";
import LoginButton from "components/common/LoginButton";
import { APP_TITLE, ButtonType, LANDING_DESC } from "utils/constants";
import s from "styles/Login.module.scss";
import CustomButton from "components/common/CustomButton";

interface LoginProps {}

const LoginPage: React.FC<LoginProps> = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>{APP_TITLE}</h1>
      <h2>{LANDING_DESC}</h2>
      <LoginButton loggedIn={false} />
      <CustomButton type={ButtonType.Link} label="Learn more" href={"/about"} />
    </div>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const openApp: GetServerSidePropsResult<LoginProps> = {
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
