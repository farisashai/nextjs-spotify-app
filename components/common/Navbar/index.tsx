import { Avatar } from "@material-ui/core";
import LogoutButton from "components/homePage/LogoutButton";

interface NavbarProps {
  user: any;
  track: any;
}

const Navbar: React.FC<NavbarProps> = ({ user, track }) => {
  return (
    <>
      <Avatar src={user.images[0].url} alt={user.name} />
      <h1>Logged In: {user.display_name}</h1>
      <h2>Current Track: {track?.item?.name || "None"}</h2>
      <LogoutButton />
    </>
  );
};

export default Navbar;
