import axios from "axios";
import Card from "components/common/Card";
import { useState } from "react";
import useSWR from "swr";
import { UserSession } from "utils/cookies";
import { defaultFetcher } from "utils/fetcher";
import s from "./styles.module.scss";

interface TopTracksProps {}

// interface TracksDatatype {
//   external_urls?: any;
//   followers?: any;
//   genres?: any[];
//   href?: string;
//   id?: string;
//   images?: any[];
//   name?: string;
//   popularity?: number;
//   type: "artist";
//   uri?: string;
// }

const TopTracks: React.FC<TopTracksProps> = () => {
  const [term, setTerm] = useState("medium_term");
  //   : { data?: ArtistDatatype[]; error?: any }
  const { data, error } = useSWR(
    `/api/spotify/tracks?range=${term}`,
    defaultFetcher
  );

  if (error) return <h1>Error</h1>;
  if (!data) return <h1>Loading</h1>;
  if (data.length === 0) return <h1>No results</h1>;

  console.info(data);

  return (
    <div className={s.container}>
      <h1>Top Tracks</h1>
      <button onClick={() => setTerm("short_term")}>Past month</button>
      <button onClick={() => setTerm("medium_term")}>Past 6 month</button>
      <button onClick={() => setTerm("long_term")}>All time</button>
      <br />
      {data.map((item, index) => (
        <Card
          key={`${item.name}-${index}`}
          image={item.album.images[0].url}
          alt={item.name}
          title={item.name}
          href={item.external_urls.spotify}
          number={index + 1}
        />
      ))}
    </div>
  );
};

export default TopTracks;
