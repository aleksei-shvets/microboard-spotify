import { RatingItem } from '../types/index'

const convertedNumValue = (str: any): number => {
  if (typeof str === 'string') {
    return Number(str.replace(/,/g, ''));
  } else if (typeof str === 'number') {
    return str;
  } else {
    return 0;
  }
};

const dataCorrector = (datas: any[]): RatingItem[] => {
  const numberKeyNames: string[] = ['AllTimeRank', 'TrackScore', 'SpotifyStreams'];

  const cleanedData = datas.map((item: any, index) => {
    const cleanedItem: RatingItem = {};
    for (let key in item) {
      const cleanedKey = key.replace(/\s+/g, '');
      if (numberKeyNames.includes(cleanedKey)) {
        cleanedItem[cleanedKey] = convertedNumValue(item[key]);
      } else {
        cleanedItem[cleanedKey] = item[key];
      }

      if (cleanedKey === 'SpotifyPopularity') {
        if (!item[key]) {
          cleanedItem[cleanedKey] = 0
        } else {
          cleanedItem[cleanedKey] = Number(item[key])
        }
      }
    }
    return cleanedItem;
  });

  return cleanedData;
};

export default dataCorrector;