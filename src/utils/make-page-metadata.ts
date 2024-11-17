import { Metadata } from "next";

export const SITE_NAME = "SMILE-LOG";
export const BASE_URL = "https://smile-log.vercel.app/";

const TITLE = "스마일로그 - AI 기반 일기 감정 시각화 및 챗봇 서비스 ";
const DESC =
  "감정 이해 및 관리를 위한 AI 기반 일기 감정 시각화 및 감정 원인 탐구 챗봇 서비스 스마일로그와 함께해요!";

type MetadataProps = {
  pageTitle?: string;
  pageDescriptioon?: string;
  pagePath?: string;
  openGraphUrl?: string;
};

export const makePageMetadata = ({
  pageTitle,
  pageDescriptioon,
  pagePath,
  openGraphUrl,
}: MetadataProps) => {
  const PAGE_TITLE = pageTitle ?? TITLE;
  const PAGE_DESC = pageDescriptioon ?? DESC;
  const PAGE_PATH = pagePath ?? "";
  const OPEN_GRAHPH_URL = openGraphUrl ?? "/images/logo.png";

  const metadata: Metadata = {
    title: {
      default: PAGE_TITLE,
      template: "스마일로그 - %s",
    },
    description: PAGE_DESC,
    alternates: {
      canonical: `${BASE_URL}${PAGE_PATH}`,
    },
    openGraph: {
      title: PAGE_TITLE,
      description: PAGE_DESC,
      url: BASE_URL,
      type: "website",
      siteName: `${SITE_NAME}`,
      images: {
        url: OPEN_GRAHPH_URL,
        alt: "azito open graph",
        width: 800,
        height: 400,
      },
    },
    twitter: {
      card: "summary",
      site: BASE_URL,
      title: PAGE_TITLE,
      description: PAGE_DESC,
      images: {
        url: OPEN_GRAHPH_URL,
        alt: "smile-log open graph",
        width: 800,
        height: 400,
      },
    },
    robots: {
      index: true,
    },
  };
  return metadata;
};
