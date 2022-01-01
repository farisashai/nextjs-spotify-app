import Image from "next/image";
import s from "./styles.module.scss";

interface CardProps {
  image: string;
  alt: string;
  title: string;
  href: string;
  number: number;
}

const Card: React.FC<CardProps> = ({ image, alt, title, href, number }) => {
  return (
    <div className={s.card} onClick={() => (document.location = href)}>
      <Image
        className={s.image}
        src={image}
        alt={alt}
        width={300}
        height={300}
      />
      <div className={s.body}>
        <p>
          {number}: {title}
        </p>
      </div>
    </div>
  );
};

export default Card;
