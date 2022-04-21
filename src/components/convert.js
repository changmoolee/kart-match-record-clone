import track from "../data/track.json";

export const convertTrackId = (trackId) => {
  return track.filter((data) => data.id === trackId)[0].name;
};

export const convertKart = (kart) => {
  let converted = "";
  if (
    kart === "0b41bf8620b5851d7dcc7eb33765d506e530b8d2e612e6c60823f2b890da3401"
  ) {
    converted = "몬스터 X LE";
  }
  return converted;
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
