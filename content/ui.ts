import type { Locale } from "./world";

/**
 * Every string that isn't world content. `Record<Locale, UiStrings>` means a
 * missing or misspelled key in either language is a compile error, which is the
 * only thing a translation library would have given us at this size.
 */
export type UiStrings = {
  siteTitle: string;
  siteTagline: string;
  siteDescription: string;
  /** Accessible label on the world map region. */
  mapLabel: string;
  backToWorld: string;
  buy: string;
  buyNote: string;
  comingSoon: string;
  comingSoonNote: string;
  close: string;
  switchLanguage: string;
  notFoundTitle: string;
  notFoundBody: string;
  notFoundAction: string;
};

export const ui: Record<Locale, UiStrings> = {
  ko: {
    siteTitle: "일마렌",
    siteTagline: "지도를 눌러 도시로 들어가세요.",
    siteDescription:
      "일마렌의 지도. 도시를 선택하면 그곳의 이야기가 열립니다.",
    mapLabel: "일마렌 지도",
    backToWorld: "지도로 돌아가기",
    buy: "책 구매하기",
    buyNote: "새 창에서 Ko-fi 상점이 열립니다.",
    comingSoon: "준비 중",
    comingSoonNote: "이 도시의 이야기는 아직 쓰이지 않았습니다.",
    close: "닫기",
    switchLanguage: "Language: English",
    notFoundTitle: "지도에 없는 곳입니다",
    notFoundBody: "찾으시는 장소가 일마렌에 존재하지 않습니다.",
    notFoundAction: "지도로 돌아가기",
  },
  en: {
    siteTitle: "Ilmarren",
    siteTagline: "Choose a place on the map to enter it.",
    siteDescription:
      "A map of Ilmarren. Pick a city and its story opens beside it.",
    mapLabel: "Map of Ilmarren",
    backToWorld: "Back to the world map",
    buy: "Buy the book",
    buyNote: "Opens the Ko-fi shop in a new tab.",
    comingSoon: "Coming soon",
    comingSoonNote: "This city's story has not been written yet.",
    close: "Close",
    switchLanguage: "언어: 한국어",
    notFoundTitle: "Not on any map",
    notFoundBody: "The place you are looking for does not exist in Ilmarren.",
    notFoundAction: "Back to the world map",
  },
};
