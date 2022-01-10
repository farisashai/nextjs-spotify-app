import { useEffect, useState } from "react";
import useSWR from "swr";
import { defaultFetcher } from "utils/fetcher";
import s from "styles/Home.module.scss";
import style from "./styles.module.scss";
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
import axios from "axios";

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

  console.log({ data });
  return (
    <div className={style.container}>
      <h1>Top Tracks {termString(term)}</h1>
      <div className={s.buttonContainer}>
        <TimeSelect
          setTerm={setTerm}
          resetSaved={() => setSaveTerm(SAVE_PLAYLIST_LABEL)}
        />
        <CustomButton
          type={ButtonType.Button}
          label="Get Recommendations"
          onClick={async () => {
            const recs = await axios
              .get("/api/spotify/recommend/tracks", {
                params: {
                  tracks: data.map((item) => item.id).splice(0, 4),
                },
                // paramsSerializer: (params) => {
                //   return qs.stringify(params);
                // },
              })
              .then((res) => res.data);
          }}
        />
        <CustomButton
          type={ButtonType.Button}
          label={saveTerm}
          onClick={async () => {
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
        />
      </div>
      <CardGrid items={data} imgLocator={(item) => item.album.images[0].url} />
    </div>
  );
};

export default TopTracks;
