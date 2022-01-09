import { useState } from "react";
import useSWR from "swr";
import { defaultFetcher } from "utils/fetcher";
import s from "styles/Home.module.scss";
import style from "./styles.module.scss";
import { termString } from "utils";
import CardGrid from "components/common/CardGrid";
import TimeSelect from "components/common/TimeSelect";

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
        <TimeSelect setTerm={setTerm} />
      </div>
      <CardGrid items={data} imgLocator={(item) => item.images[0].url} />
    </div>
  );
};

export default TopAlbums;
