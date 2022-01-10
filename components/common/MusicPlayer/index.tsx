import React, { useEffect } from "react";
import useSWR from "swr";
import { defaultFetcher } from "utils/fetcher";
import s from "./styles.module.scss";
interface MusicPlayerProps {
  // track: SpotifyApi.CurrentlyPlayingObject | any;
}

const MusicPlayer: React.FC<MusicPlayerProps> = () => {
  const {
    data: { body: track },
    error,
    mutate,
  } = useSWR("/api/spotify/currentTrack", defaultFetcher);

  useEffect(() => {
    const checkSong = setInterval(mutate, 1000);
    return () => clearInterval(checkSong);
  }, [mutate]);

  if (error) return null;
  if (!track.is_playing) return null;

  return (
    <div className={s.player}>
      <p>{track.item.name}</p>
    </div>
  );
};

export default MusicPlayer;
