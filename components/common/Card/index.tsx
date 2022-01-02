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
        width={200}
        height={200}
      />
      <div className={s.body}>
        <p className={s.title}>
          {/* {number}:  */}
          {title}
        </p>
      </div>
    </div>
  );
};

export default Card;
