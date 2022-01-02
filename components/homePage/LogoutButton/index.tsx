import Cookies from "universal-cookie";
import Link from "next/link";
import s from "styles/Home.module.scss";

const cookies = new Cookies();

interface LogoutButtonProps {}

const LogoutButton: React.FC<LogoutButtonProps> = () => {
  return (
    <Link href={"/api/auth/logout"}>
      <a className={s.button}>Log Out</a>
    </Link>
  );
};

export default LogoutButton;
