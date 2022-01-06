import Card from "components/common/Card";
import { useState } from "react";
import useSWR from "swr";
import { defaultFetcher } from "utils/fetcher";
import s from "styles/Home.module.scss";
import style from "./styles.module.scss";
import axios from "axios";
import { savePlaylist } from "utils/spotify";

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
  const { data, error } = useSWR(
    `/api/spotify/top/tracks?range=${term}`,
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
      <h1>Top Tracks</h1>
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
      <button
        onClick={() => {
          savePlaylist(
            `Top 100 Tracks${(() => {
              switch (term) {
                case "short_term":
                  return " (Past Month)";
                case "medium_term":
                  return " (Past 6 months)";
                case "long_term":
                  return " (All Time)";
                default:
                  return "";
              }
            })()}`,
            new Date().toDateString(),
            data.map((item) => item.uri)
          );
        }}
      >
        Save Playlist
      </button>
    </div>
  );
};

export default TopTracks;
