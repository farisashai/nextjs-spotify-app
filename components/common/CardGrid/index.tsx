import Card from "./Card";
import s from "./styles.module.scss";

const CardGrid = ({ items, imgLocator }) => {
  return (
    <div className={s.grid}>
      {items.map((item, index) => (
        <Card
          key={`${item.name}-${index}`}
          image={imgLocator(item)}
          alt={item.name}
          title={item.name}
          href={item.external_urls.spotify}
          number={index + 1}
        />
      ))}
    </div>
  );
};

export default CardGrid;
