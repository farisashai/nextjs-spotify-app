import Link from "next/link";
import s from "styles/Home.module.scss";
import { FaSpotify } from "react-icons/fa";

interface LoginButtonProps {
  loggedIn: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ loggedIn }) => {
  return (
    <Link href={loggedIn ? "/api/auth/logout" : "/api/auth/login"}>
      <a className={s.button}>
        {!loggedIn && <FaSpotify />}
        {loggedIn ? "Log Out" : "Login with Spotify"}
      </a>
    </Link>
  );
};

export default LoginButton;
