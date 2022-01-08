import Card from "components/common/Card";
import { useState } from "react";
import useSWR from "swr";
import { defaultFetcher } from "utils/fetcher";
import s from "styles/Home.module.scss";
import style from "./styles.module.scss";
import { termString } from "utils";
import { LONG_TERM, MEDIUM_TERM, SHORT_TERM } from "utils/constants";

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

const TopAlbums: React.FC<TopArtistsProps> = () => {
  const [term, setTerm] = useState("medium_term");

  const { data, error }: { data?: ArtistDatatype[]; error?: any } = useSWR(
    `/api/spotify/top/albums?range=${term}`,
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
      <h1>Top Albums {termString(term)}</h1>
      <div className={s.buttonContainer}>
        <div className="">
          <button onClick={() => setTerm(SHORT_TERM)} className={s.button}>
            Past month
          </button>
          <button onClick={() => setTerm(MEDIUM_TERM)} className={s.button}>
            Past 6 month
          </button>
          <button onClick={() => setTerm(LONG_TERM)} className={s.button}>
            All time
          </button>
        </div>
      </div>

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

export default TopAlbums;
