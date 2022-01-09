import { Avatar } from "@material-ui/core";
import LoginButton from "components/common/LoginButton";
import s from "./styles.module.scss";
import s2 from "styles/Home.module.scss";
import { APP_TITLE } from "utils/constants";
import Artist from "public/Artist.svg";
import Album from "public/Album.svg";
import Track from "public/Song.svg";
import Image from "next/image";
interface NavbarProps {
  user: any;
  track: any;
  setMode: Function;
}

const Navbar: React.FC<NavbarProps> = ({ user, track, setMode }) => (
  <div className={s.navbar}>
    <h1>{APP_TITLE}</h1>
    <div className={s.navlinks}>
      <button className={s2.button} onClick={() => setMode("artists")}>
        <Image src={Artist} width={20} height={20} />
        <image />
        Top Artists
      </button>
      <button className={s2.button} onClick={() => setMode("tracks")}>
        <Image src={Track} width={20} height={20} />
        Top Tracks
      </button>
      <button className={s2.button} onClick={() => setMode("albums")}>
        <Image src={Album} width={20} height={20} />
        Top Albums
      </button>
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
