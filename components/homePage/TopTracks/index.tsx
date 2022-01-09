import { useEffect, useState } from "react";
import useSWR from "swr";
import { defaultFetcher } from "utils/fetcher";
import s from "styles/Home.module.scss";
import style from "./styles.module.scss";
import { savePlaylist } from "utils/spotify";
import { termString } from "utils";
import {
  SAVE_COMPLETE_LABEL,
  SAVE_IN_PROGRESS_LABEL,
  SAVE_PLAYLIST_LABEL,
} from "utils/constants";
import CardGrid from "components/common/CardGrid";
import TimeSelect from "components/common/TimeSelect";

interface TopTracksProps {}

interface TracksDatatype {
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

const TopTracks: React.FC<TopTracksProps> = () => {
  const [term, setTerm] = useState("medium_term");
  const [saveTerm, setSaveTerm] = useState(SAVE_PLAYLIST_LABEL);

  const { data, error } = useSWR(
    `/api/spotify/top/tracks?range=${term}`,
    defaultFetcher
  );

  useEffect(() => {
    if (saveTerm === SAVE_COMPLETE_LABEL)
      setTimeout(() => setSaveTerm(SAVE_PLAYLIST_LABEL), 3000);
  }, [saveTerm]);

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
      <h1>Top Tracks {termString(term)}</h1>
      <div className={s.buttonContainer}>
        <TimeSelect setTerm={setTerm} />
        <button
          className={s.button}
          onClick={() => {
            if (saveTerm === SAVE_PLAYLIST_LABEL) {
              setSaveTerm(SAVE_IN_PROGRESS_LABEL);

              savePlaylist(
                `Top 100 Tracks${termString(term)}`,
                `Your top tracks. Generated on ${new Date().toDateString()} by ${
                  window.location.host
                }`,
                data.map((item) => item.uri)
              );
              setSaveTerm(SAVE_COMPLETE_LABEL);
            }
          }}
        >
          {saveTerm}
        </button>
      </div>
      <CardGrid items={data} imgLocator={(item) => item.album.images[0].url} />
    </div>
  );
};

export default TopTracks;
