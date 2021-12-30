import Link from "next/link";
import { UserSession } from "utils/cookies";

interface AppProps {
  session: UserSession;
}
const App: React.FC<AppProps> = ({ session }) => {
  return (
    <div>
      {session ? (
        <div>{session?.user?.display_name} is currently logged in</div>
      ) : (
        <Link href="/api/auth/login">Login with Spotify</Link>
      )}
    </div>
  );
};

export default App;
