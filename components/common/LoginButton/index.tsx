import { FaSpotify } from "react-icons/fa";
import CustomButton from "../CustomButton";
import { ButtonType } from "utils/constants";

interface LoginButtonProps {
  loggedIn: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ loggedIn }) => {
  return (
    <CustomButton
      type={ButtonType.Link}
      label={loggedIn ? "Log Out" : "Login with Spotify"}
      icon={!loggedIn && <FaSpotify />}
      href={loggedIn ? "/api/auth/logout" : "/api/auth/login"}
    />
  );
};

export default LoginButton;
