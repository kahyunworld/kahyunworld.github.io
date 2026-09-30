/**
 * The whole world, in one file.
 *
 * Adding a city means adding one object to `locations` below — both languages
 * live side by side so there is no message file to keep in sync.
 *
 * TODO: replace every string marked `TODO` with real text, and replace the
 * placeholder artwork in `public/maps/` with the real maps.
 */

export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Narrows a route param to a Locale. Unknown values fall back to the default. */
export function toLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export type LocationText = {
  name: string;
  region: string;
  tagline: string;
  /** One string per paragraph. */
  summary: string[];
  /** Only for locations that have a book. */
  bookTitle?: string;
};

/**
 * A map image. Any raster or vector format works — hotspots are placed in a
 * normalized coordinate space, so they do not care about the file's size.
 * `width`/`height` are the intrinsic pixel dimensions; they only set the stage's
 * aspect ratio, so the art is never distorted or cropped.
 */
export type MapArt = {
  src: string;
  width: number;
  height: number;
};

export type Location = {
  /** URL segment. Keep it lowercase and hyphenated. */
  id: string;
  /**
   * Position of the marker on the world map, 0-100 in each axis. Normalized, so
   * it survives any change of artwork resolution or format.
   */
  x: number;
  y: number;
  /** How far the camera zooms when this location opens. */
  zoom: number;
  /** This location's own detail map, shown once zoomed in. */
  art?: MapArt;
  /** false -> "coming soon": no summary body, no buy link. */
  published: boolean;
  /** Ko-fi listing URL. Absent means there is nothing to sell yet. */
  buyUrl?: string;
  text: Record<Locale, LocationText>;
};

export const world = {
  name: { ko: "일마렌", en: "Ilmarren" },
  /** 8:5. Swap in the real map's true pixel size. */
  art: {
    src: "/maps/world.svg",
    width: 1600,
    height: 1000,
  } satisfies MapArt,
};

export const worldArt = world.art;

export const locations: Location[] = [
  {
    id: "sablemoor",
    x: 31,
    y: 63,
    zoom: 3.2,
    art: { src: "/maps/sablemoor.svg", width: 1600, height: 1000 },
    published: true,
    // TODO: replace with the real Ko-fi listing URL.
    buyUrl: "https://ko-fi.com/s/REPLACE-ME",
    text: {
      ko: {
        name: "세이블무어",
        region: "검은 늪의 항구",
        tagline: "안개가 걷히지 않는 도시, 등불이 꺼지지 않는 도시.",
        bookTitle: "세이블무어의 등불지기들",
        summary: [
          // TODO: replace with the real novel summary.
          "세이블무어는 조수가 하루에 두 번 도시를 반쯤 삼키는 늪지 항구다. 물이 빠지면 드러나는 옛 부두에서, 등불지기들은 대대로 같은 일을 해왔다. 해가 지기 전에 스물일곱 개의 등을 켜는 일.",
          "등이 하나라도 꺼진 밤에는 늪에서 무언가가 올라온다고 한다. 아무도 그것을 본 적은 없지만, 아무도 그 규칙을 어겨본 적도 없다.",
          "견습 등불지기 하렌이 스물여덟 번째 등을 발견하면서, 도시가 지켜온 약속의 정체가 드러나기 시작한다.",
        ],
      },
      en: {
        name: "Sablemoor",
        region: "Harbour of the Black Fen",
        tagline: "A city the fog never leaves, and the lamps never fail.",
        bookTitle: "The Lamplighters of Sablemoor",
        summary: [
          // TODO: replace with the real novel summary.
          "Sablemoor is a fen harbour that the tide half-swallows twice a day. On the old wharves the water uncovers, the lamplighters have done the same work for generations: light twenty-seven lamps before the sun goes down.",
          "On any night a lamp goes dark, they say something comes up out of the fen. Nobody has seen it. Nobody has broken the rule either.",
          "When Harren, an apprentice lamplighter, finds a twenty-eighth lamp, the nature of the promise the city has been keeping starts to come apart.",
        ],
      },
    },
  },
  {
    id: "highvarden",
    x: 63,
    y: 25,
    zoom: 3.2,
    published: false,
    text: {
      ko: {
        name: "하이바덴",
        region: "북방 성새",
        tagline: "눈이 기록을 대신하는 곳.",
        summary: [], // TODO
      },
      en: {
        name: "Highvarden",
        region: "The Northern Hold",
        tagline: "Where snow keeps the records.",
        summary: [], // TODO
      },
    },
  },
  {
    id: "thornwake",
    x: 46,
    y: 45,
    zoom: 3.2,
    published: false,
    text: {
      ko: {
        name: "손웨이크",
        region: "가시나무 숲",
        tagline: "길은 매년 다시 자란다.",
        summary: [], // TODO
      },
      en: {
        name: "Thornwake",
        region: "The Briar Wood",
        tagline: "The roads grow back every year.",
        summary: [], // TODO
      },
    },
  },
  {
    id: "caldrift",
    x: 77,
    y: 71,
    zoom: 3.2,
    published: false,
    text: {
      ko: {
        name: "칼드리프트",
        region: "소금 평원",
        tagline: "바다가 떠난 자리에 남은 도시.",
        summary: [], // TODO
      },
      en: {
        name: "Caldrift",
        region: "The Salt Flats",
        tagline: "The city the sea left behind.",
        summary: [], // TODO
      },
    },
  },
];

export function getLocation(id: string): Location | undefined {
  return locations.find((location) => location.id === id);
}
