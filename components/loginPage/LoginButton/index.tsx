import Link from "next/link";
import s from "styles/Login.module.scss";
import { FaSpotify } from "react-icons/fa";

interface LoginButtonProps {}

const LoginButton: React.FC<LoginButtonProps> = () => {
  return (
    <Link href="/api/auth/login">
      <a className={s.button}>
        <FaSpotify />
        Login with Spotify
      </a>
    </Link>
  );
};

export default LoginButton;
