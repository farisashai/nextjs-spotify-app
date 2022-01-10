import Image from "next/image";
import React from "react";
import SpotifyWebApi from "spotify-web-api-node";
import s from "./styles.module.scss";
interface MusicPlayerProps {
  track: SpotifyApi.CurrentlyPlayingObject | any;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ track }) => {
  if (!track.is_playing) return null;

  return (
    <div className={s.player}>
      <p>{track.item.name}</p>
    </div>
  );
};

export default MusicPlayer;
