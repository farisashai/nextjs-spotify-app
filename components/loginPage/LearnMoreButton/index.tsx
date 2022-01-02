import Link from "next/link";
import s from "styles/Login.module.scss";

interface LearnMoreProps {}

const LearnMoreButton: React.FC<LearnMoreProps> = () => {
  return (
    <Link href="/about">
      <a className={s.button}>Learn more</a>
    </Link>
  );
};

export default LearnMoreButton;
