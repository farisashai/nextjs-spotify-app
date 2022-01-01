import s from "./styles.module.scss";
import { clearCookies } from "utils/cookies";
interface LogoutButtonProps {}

const LogoutButton: React.FC<LogoutButtonProps> = () => {
  return (
    <button
      onClick={() => {
        console.log("button clicked");
        clearCookies();
      }}
      className={s.button}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
