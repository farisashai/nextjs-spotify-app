import { Avatar } from "@material-ui/core";
import LoginButton from "components/common/LoginButton";
import s from "./styles.module.scss";
import s2 from "styles/Home.module.scss";
import { APP_TITLE, ButtonType } from "utils/constants";
import Artist from "public/Artist.svg";
import Album from "public/Album.svg";
import Track from "public/Song.svg";
import Image from "next/image";
import CustomButton from "../CustomButton";
interface NavbarProps {
  user: any;
  track: any;
  setMode: Function;
}

const Navbar: React.FC<NavbarProps> = ({ user, track, setMode }) => (
  <div className={s.navbar}>
    <h1>{APP_TITLE}</h1>
    <div className={s.navlinks}>
      <CustomButton
        type={ButtonType.Button}
        label="Top Artists"
        onClick={() => setMode("artists")}
        icon={Artist}
      />
      <CustomButton
        type={ButtonType.Button}
        label="Top Tracks"
        onClick={() => setMode("tracks")}
        icon={Track}
      />
      <CustomButton
        type={ButtonType.Button}
        label="Top Albums"
        onClick={() => setMode("albums")}
        icon={Album}
      />
      <LoginButton loggedIn={Boolean(user)} />
      <div
        className={s.userContainer}
        onClick={() => (window.location = user.uri)}
      >
        <p>{user.display_name}</p>
        <Avatar src={user.images[0].url} alt={user.name} className={s.avatar} />
      </div>
    </div>
  </div>
);

export default Navbar;
