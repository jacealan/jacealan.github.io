const bookmarks = [
  {
    name: "네이버",
    link: "https://www.naver.com/"
  },
  {
    name: "노마드 코더",
    link: "https://nomadcoders.co/"
  },
  {
    name: "드림 코링",
    link: "https://academy.dream-coding.com/"
  },
  {
    name: "-",
    link: "javascript:void(0);"
  },
  {
    name: "네이버 증권",
    link: "https://finance.naver.com/"
  },
  {
    name: "한경 코리아마켓",
    link: "https://markets.hankyung.com/"
  },
  {
    name: "Yahoo Finance",
    link: "https://finance.yahoo.com/"
  },
  {
    name: "전자공시 DART",
    link: "https://dart.fss.or.kr/"
  },
  {
    name: "젠포트",
    link: "https://genport.newsystock.com/"
  },
  {
    name: "-",
    link: "javascript:void(0);"
  },
  {
    name: "3PRO TV",
    link: "https://www.youtube.com/channel/UChlv4GSd7OQl3js-jkLOnFA"
  },
  {
    name: "STEPS",
    link: "https://www.youtube.com/c/%EC%84%B1%EA%B3%B5%ED%88%AC%EC%9E%90%EB%A1%9C%EC%9D%B4%EB%81%84%EB%8A%94%EA%B3%84%EB%8B%A8STEPS/featured"
  },
  {
    name: "이리온",
    link: "https://www.youtube.com/channel/UCauZxKRDiGcrWplWUOIN9JQ"
  },
  {
    name: "주코노미",
    link: "https://www.youtube.com/c/jooconomy"
  },
  {
    name: "-",
    link: "javascript:void(0);"
  },
  {
    name: "구글 드라이브",
    link: "https://drive.google.com/"
  },
  {
    name: "GitHub",
    link: "https://github.com/"
  },
  {
    name: "CodeSandbox",
    link: "https://codesandbox.io/"
  },
  {
    name: "Replit",
    link: "https://replit.com/~"
  },
  {
    name: "Notion",
    link: "https://www.notion.so/"
  },
  {
    name: "-",
    link: "javascript:void(0);"
  },
  {
    name: "MONKEYBGM",
    link: "https://www.youtube.com/channel/UCBnMxlW70f0SB4ZTJx124lw"
  },
];


function paintBookmark(bookmark) {
  const div = document.createElement("div");
  const a = document.createElement("a");
  a.target = "_blank";
  a.href = bookmark.link;
  if (bookmark.name == "-") {
    a.innerText = `- -`;
  } else {
    a.innerText = `${bookmark.name}⯐`;
  }  
  div.appendChild(a);
  bookmarkBlock.appendChild(div);
}

bookmarks.forEach(paintBookmark);
