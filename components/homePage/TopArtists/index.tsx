import { useEffect, useState } from "react";
import useSWR from "swr";
import { defaultFetcher } from "utils/fetcher";
import s from "styles/Home.module.scss";
import style from "./styles.module.scss";
import axios from "axios";
import { savePlaylist } from "utils/spotify";
import { termString } from "utils";
import {
  ButtonType,
  SAVE_COMPLETE_LABEL,
  SAVE_IN_PROGRESS_LABEL,
  SAVE_PLAYLIST_LABEL,
} from "utils/constants";
import CardGrid from "components/common/CardGrid";
import TimeSelect from "components/common/TimeSelect";
import CustomButton from "components/common/CustomButton";
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
  const [saveTerm, setSaveTerm] = useState(SAVE_PLAYLIST_LABEL);

  const { data, error }: { data?: ArtistDatatype[]; error?: any } = useSWR(
    `/api/spotify/top/artists?range=${term}`,
    defaultFetcher
  );

  useEffect(() => {
    if (saveTerm === SAVE_COMPLETE_LABEL)
      setTimeout(() => setSaveTerm(SAVE_PLAYLIST_LABEL), 3000);
  }, [saveTerm]);

  if (error)
    return (
      <div className={style.container}>
        <h1>
          Whoops! We ran into an error. Please refresh the page to try again.
        </h1>
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
      <h1>Top Artists {termString(term)}</h1>
      <div className={s.buttonContainer}>
        <TimeSelect
          setTerm={setTerm}
          resetSaved={() => setSaveTerm(SAVE_PLAYLIST_LABEL)}
        />
        <CustomButton
          type={ButtonType.Button}
          label={saveTerm}
          onClick={async () => {
            if (saveTerm === SAVE_PLAYLIST_LABEL) {
              setSaveTerm(SAVE_IN_PROGRESS_LABEL);

              const trackList = [];

              for (const item of data) {
                try {
                  const tracks = await axios
                    .get(`/api/spotify/artist/tracks?id=${item.id}`)
                    .then((res) => res.data.body.tracks);
                  trackList.push(...tracks);
                } catch {
                  console.error(`fetch tracks failed: ${item.name}`);
                }
              }

              savePlaylist(
                `Top 100 Artists${termString(term)}`,
                `Top tracks from your top artists. Generated on ${new Date().toDateString()} by ${
                  window.location.host
                }`,
                trackList.map((item) => item.uri)
              );
              setSaveTerm(SAVE_COMPLETE_LABEL);
            }
          }}
        />
      </div>
      <CardGrid items={data} imgLocator={(item) => item.images[0].url} />
    </div>
  );
};

export default TopArtists;
