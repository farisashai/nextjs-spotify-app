import { Avatar } from "@material-ui/core";
import LoginButton from "components/common/LoginButton";
import s from "./styles.module.scss";

interface NavbarProps {
  user: any;
  track: any;
}

const Navbar: React.FC<NavbarProps> = ({ user, track }) => (
  <>
    <div
      className={s.userContainer}
      onClick={() => (window.location = user.uri)}
    >
      <h1>Logged In: {user.display_name}</h1>
      <Avatar src={user.images[0].url} alt={user.name} className={s.avatar} />
    </div>
    <h2>Current Track: {track?.item?.name || "None"}</h2>
    <LoginButton loggedIn={Boolean(user)} />
  </>
);

export default Navbar;
