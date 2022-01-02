import Card from "components/common/Card";
import { useState } from "react";
import useSWR from "swr";
import { defaultFetcher } from "utils/fetcher";
import s from "styles/Home.module.scss";
import style from "./styles.module.scss";

interface TopArtistsProps {}

interface ArtistDatatype {
  external_urls?: any;
  followers?: any;
  genres?: any[];
  href?: string;
  id?: string;
  images?: any[];
  name?: string;
  popularity?: number;
  type: "artist";
  uri?: string;
}
const TopArtists: React.FC<TopArtistsProps> = () => {
  const [term, setTerm] = useState("medium_term");

  const { data, error }: { data?: ArtistDatatype[]; error?: any } = useSWR(
    `/api/spotify/top/artists?range=${term}`,
    defaultFetcher
  );

  if (error)
    return (
      <div className={style.container}>
        <h1>Error</h1>
      </div>
    );
  if (!data)
    return (
      <div className={style.container}>
        <h1>Loading</h1>
      </div>
    );
  if (data.length === 0)
    return (
      <div className={style.container}>
        <h1>No results</h1>
      </div>
    );

  return (
    <div className={style.container}>
      <h1>Top Artists</h1>
      <button onClick={() => setTerm("short_term")} className={s.button}>
        Past month
      </button>
      <button onClick={() => setTerm("medium_term")} className={s.button}>
        Past 6 month
      </button>
      <button onClick={() => setTerm("long_term")} className={s.button}>
        All time
      </button>
      <br />
      {data.map((item, index) => (
        <Card
          key={`${item.name}-${index}`}
          image={item.images[0].url}
          alt={item.name}
          title={item.name}
          href={item.external_urls.spotify}
          number={index + 1}
        />
      ))}
    </div>
  );
};

export default TopArtists;
