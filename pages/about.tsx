import Link from "next/link";
import { APP_TITLE } from "utils/constants";
import s from "styles/About.module.scss";

interface AboutProps {}

const AboutPage: React.FC<AboutProps> = () => {
  return (
    <div>
      <h4>
        {APP_TITLE} is a project build for fun by faris ashai. all information
        is fetched locally from spotify when you log in and none of it is saved
        in any way.
      </h4>
      <Link href="/">
        <a className={s.button}>Back</a>
      </Link>
    </div>
  );
};

export default AboutPage;
