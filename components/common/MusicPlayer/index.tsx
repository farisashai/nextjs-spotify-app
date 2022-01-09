import Image from "next/image";
import React from "react";
import SpotifyWebApi from "spotify-web-api-node";
import s from "./styles.module.scss";
interface MusicPlayerProps {
  track: SpotifyApi.CurrentlyPlayingObject | any;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ track }) => {
  console.log(track.item);

  if (!track.is_playing) return null;

  return (
    <div className={s.player}>
      {/* <Image width={50} height={50} src={track.item.album.images[0]} alt="a" /> */}
      <p>{track.item.name}</p>
    </div>
  );
};

export default MusicPlayer;
