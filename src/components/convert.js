import track from "../data/track.json";
import kart from "../data/kart.json";

export const convertTrack = (trackId) => {
  let convertedData = track.filter((data) => data.id === trackId)[0];
  return convertedData.name;
};

export const convertKart = (kartId) => {
  let convertedData = kart.filter((data) => data.id === kartId)[0];
  return convertedData.name;
};

export const convertRecord = (record) => {
  let miliseconds = parseInt((record % 1000) / 10);
  if (miliseconds < 10) {
    miliseconds = "'0" + miliseconds;
  } else {
    miliseconds = "'" + miliseconds;
  }

  let seconds = parseInt((record / 1000) % 60);
  if (seconds < 10) {
    seconds = "'0" + seconds;
  } else {
    seconds = "'" + seconds;
  }

  let minutes = "" + parseInt(record / 60000);

  let converted = minutes + seconds + miliseconds;

  if (converted === "0'00'00") {
    return "-";
  } else {
    return converted;
  }
};
