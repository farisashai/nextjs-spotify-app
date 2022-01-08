import Card from "components/common/Card";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { defaultFetcher } from "utils/fetcher";
import s from "styles/Home.module.scss";
import style from "./styles.module.scss";
import axios from "axios";
import { savePlaylist } from "utils/spotify";
import { termString } from "utils";
import {
  LONG_TERM,
  MEDIUM_TERM,
  SAVE_COMPLETE_LABEL,
  SAVE_IN_PROGRESS_LABEL,
  SAVE_PLAYLIST_LABEL,
  SHORT_TERM,
} from "utils/constants";

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

      {data.map(
        (
          item: {
            name: string;
            album: { images: { url: string }[] };
            external_urls: { spotify: string };
          },
          index: number
        ) => (
          <Card
            key={`${item.name}-${index}`}
            image={item.album.images[0].url}
            alt={item.name}
            title={item.name}
            href={item.external_urls.spotify}
            number={index + 1}
          />
        )
      )}
      <br />
    </div>
  );
};

export default TopTracks;
