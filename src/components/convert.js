export const convertTrackId = (trackId) => {
  let converted = "";
  if (
    trackId ===
    "cef91d19aece7571a2e667fe0240f92a010af6c5a6cd68e11a166d69124ee432"
  ) {
    converted = "대저택 은밀한 지하실";
  } else if (
    trackId ===
    "7394f4ea05d4115bc1308101998132e50e366c4456c6368a1800a494c6f8c0c1"
  ) {
    converted = "빌리지 고가의 질주";
  } else if (
    trackId ===
    "799dd082c3022634391f8775089c0a25fc4df61e539772958b8a8416e0d77e6a"
  ) {
    converted = "팩토리 미완성 5구역";
  } else if (
    trackId ===
    "c961712df23e818c056b2e673467aca3e173b7bf53ee8e35cf9a3e75a3dfc0c6"
  ) {
    converted = "WKC 상해 서킷";
  } else if (
    trackId ===
    "936626b1d09165291db82c65c8533f6a023e1f72669741706b70835bcffb699e"
  ) {
    converted = "브로디 비밀의 연구소";
  } else if (
    trackId ===
    "95fbb45f299b72e7e5d1f013e56d528dd5b67fae6a57a1b8ca3b2eec7ba84bfc"
  ) {
    converted = "차이나 서안 병마용	";
  } else if (
    trackId ===
    "243ccbc7e0f66415976bd36d3718821c2af1440d16e923dca6be7a0b4bc1c02c"
  ) {
    converted = "	차이나 황산";
  } else if (
    trackId ===
    "b57588a6c4fd89fbc2a2c9e9c1a95a746c35ab3ee08e3935db1a427121853e9a"
  ) {
    converted = "코리아 제주 해오름 다운힐";
  } else {
    converted = "아무 트랙";
  }

  return converted;
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
