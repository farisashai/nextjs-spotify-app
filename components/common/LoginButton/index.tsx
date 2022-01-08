import Link from "next/link";
import s from "./styles.module.scss";
import { FaSpotify } from "react-icons/fa";

interface LoginButtonProps {
  loggedIn: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ loggedIn }) => {
  return (
    <Link href={loggedIn ? "/api/auth/logout" : "/api/auth/login"}>
      <a className={s.button}>
        {loggedIn ? (
          <span>Log Out</span>
        ) : (
          <>
            <FaSpotify />
            <span>Login with Spotify </span>
          </>
        )}
      </a>
    </Link>
  );
};

export default LoginButton;
