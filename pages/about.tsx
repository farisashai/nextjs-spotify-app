import Link from "next/link";
import { APP_TITLE, ButtonType } from "utils/constants";
import s from "styles/About.module.scss";
import s2 from "styles/Home.module.scss";
import CustomButton from "components/common/CustomButton";
interface AboutProps {}

const AboutPage: React.FC<AboutProps> = () => {
  return (
    <div className={s.container}>
      <h4>
        {APP_TITLE} is a project build for fun by Faris Ashai. All information
        is fetched locally from the Spotify Web API when you log in and none of
        it is saved in any way.
      </h4>
      <CustomButton type={ButtonType.Link} label="Back" href="/" />
    </div>
  );
};

export default AboutPage;
