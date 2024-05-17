---
title: '[MDX] Next.js 블로그 만들기 (14.1 최신 버전 + tailwind)'
publish: published
thumbnail: images/njo2_20231030_133955-01.jpeg
desc: 'FE 개발자라면 티스토리 말고 개인 블로그 하나쯤은,,'
blogs:
  tistory:
    regist: true
    name: stories
  blogger:
    regist: false
    name: '5255262541558351240'
taxonomy:
  category: 제품리뷰이야기
  tag:
    - 한국
    - 한국제품
    - 제품리뷰이야기
    - 신차
    - 선팅
    - 틴팅
tistory:
  postId: '700'
  url: 'https://blog.stories.pe.kr/610'
  published: '2022. 12. 25. 오후 11:05:28'
  updated: '2022. 12. 25. 오후 11:16:31'
postId: '700'
datePublished: '2022-12-25T23:05:28+09:00'
dateUpdated: '2022-12-25T23:16:31+09:00'
---

Next.js를 사용할 때 스타일링으로 tailwindcss를 많이 사용할 것입니다. 또한 폰트로 Google Fonts도 많이 사용하게 되는데요.
구글 웹폰트를 사용하는 경우 보통 아래와 같이 CDN으로 구글에서 웹폰트를 불러와서 적용하는 방법을 많이 사용합니다.

```html
<html>
  <head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR" />
    <style>
      body {
        font-family: 'Noto Sans KR', serif;
        font-size: 48px;
      }
    </style>
  </head>
  <body>
    <div>Making the Web Beautiful!</div>
  </body>
</html>
```

이럴 경우 사용이 편한 장점도 있지만 오프라인이거나 네트워크가 좋지 않은 환경에서는 단점으로 작용을 합니다.
그래서 Next.js에서는 폰트를 별도의 패키지로 만들어서 제공하고 있습니다. 이럴 경우 사용하는 것은 웹폰트를 사용하는 것만큼 쉽고 퍼블리싱 할 때 local로 해당 폴더만 가져가기 때문에 오프라인일 때도 웹폰트가 표현이 되는 장점이 있습니다.

# Next.js에서 Google Fonts 적용하는 방법

패키지는 `next/font/google`이며 아래와 같이 적용할 수 있습니다.

> `import { Noto_Sans_KR } from 'next/font/google';`

| 기본         | 좌측정렬 |       가운데정렬       | 우측정렬 |
| ------------ | :------- | :--------------------: | -------: |
| 내용         | 좌측내용 |       가운데내용       | 우측내용 |
|              | 안맞추고 | 그냥 쫘르르륵 써볼게여 |   과연?? |
| ↑빈칸도 가능 | **와우** |         _띠용_         | ~~오잉~~ |

## 폴더와 파일 구조

제가 현재 사용하는 **Next.js는 14버전**입니다. 그리고 폴더 구조는 아래의 캡처화면을 참고하시면 됩니다.

![](images/2023-07-26-14-41-09.png)

1. styles에 fonts 폴더를 만들어서 font.ts에 폰트 패키지를 불러와서 설정하고 전체적으로 활용할 수 있게 했습니다.(폴더 위치는 자유롭게 사용하시면 됩니다.)
2. tailwindcss에서 폰트를 사용하는 것처럼 사용하기 위해서 `tailwind.config.ts`에 설정을 합니다.
3. layout.tsx에 일차 적용을 합니다. layout.tsx는 공통적으로 항상 처음 적용되는 tsx이며 웬만한 초기설정은 여기서 해줍니다.
4. page.tsx는 실제로 적용하는 방법입니다.

각 페이지마다 설명을 하도록 하겠습니다.

### 1. font.ts 설정하기

가장 처음 google fonts 패키지를 불러와서 설정하는 파일입니다.

```javascript
// https://fonts.google.com/variablefonts 여기에서 Fonts를 찾아서 추가합니다.
import { Noto_Sans_KR, Single_Day } from "next/font/google";

// Font의 classnames를 합치는 공통 함수
const sumClass = (...classnames: string[]) => {
  return classnames.join(" ");
};

// noto_sans_kr에 Noto_Sans_KR 적용
const noto_sans_kr = Noto_Sans_KR({
  subsets: ["latin"], // preload에 사용할 subsets 또는 preload: false
  weight: ["100", "400", "700", "900"], // 사용할 wght 설정
  variable: "--noto_sans_kr", // tailwindcss에서 사용할 수 있도록 CSS 변수 방식 설정
  display: "swap",
});

// single_day에 Single_Day 적용
const single_day = Single_Day({
  weight: ["400"],
  variable: "--single_day",
  display: "swap",
});

// 폰트가 추가되면 여기에 ,(콤마)로 구분하여 추가함 - 외부에서 FontClassNames를 불러와 적용함
export const FontClassNames = sumClass(noto_sans_kr.className, single_day.variable);
```

1. styles에 fonts 폴더를 만들어서 font.ts에 폰트 패키지를 불러와서 설정하고 전체적으로 활용할 수 있게 했습니다.(폴더 위치는 자유롭게 사용하시면 됩니다.)
2. tailwindcss에서 폰트를 사용하는 것처럼 사용하기 위해서 `tailwind.config.ts`에 설정을 합니다.
3. layout.tsx에 일차 적용을 합니다. layout.tsx는 공통적으로 항상 처음 적용되는 tsx이며 웬만한 초기설정은 여기서 해줍니다.
4. page.tsx는 실제로 적용하는 방법입니다.

여기서는 `Noto_Sans_KR`, `Single_Day` 폰트를 불러와서 `FontClassNames`에 배열로 설정한 상태입니다.
여기서 잘 보면...
첫 번째는 `noto_sans_kr.className`로 뒤에 `.className`으로 붙는 반면..
두 번째는 `single_day.variable`로 뒤에 `.variable`이 붙습니다.
쉽게 말해서 `.className`은 fontFamily로 바로 반영이 되는 반면,
`.variable`는 ` CSS 변수 방식`으로 정의만 한 상태라 실제로 적용하기 위해서는 `tailwindcss`의 도움을 받아 별도 지정해야 합니다. 3번째 폰트를 추가한다면 `.variable` 형태로 추가해야 합니다.

### 2. tailwind.config.ts 설정하기

tailwindcss를 사용하지 않는다면 이 부분은 생략이 가능합니다. 사용할 경우는 아래의 설정을 해 놓으면 어디에서든지 Font를 자유롭게 사용할 수 있습니다.

```javascript
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--noto_sans_kr)'], // fonts.ts에서 variable로 설정한 CSS 변수를 불러와 적용합니다.
      happySans: ['var(--single_day)'], // fonts.ts에서 variable로 설정한 CSS 변수를 불러와 적용합니다.
    },
  }
  ...
}
```

### 3. layout.tsx 설정하기

13버전 이하에서 공통 마크업은 `_document.tsx`에 작성하고 공통 로직은 `_app.tsx`에 작성했었는데 14버전으로 넘어오면 모두 `layout.tsx`에서 작성하게 되었습니다. 그래서 Fonts를 공통으로 적용하기 위해서 `layout.tsx`에 적용합니다.

```javascript
import { FontClassNames } from "@/styles/fonts/fonts"; // 설정한 fonts.ts에서 `FontClassNames` 불러옴

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={FontClassNames}>{children}</body>
    </html>
  );
}
```

`<body>`에 적용함으로써 전체적으로 해당 폰트가 적용됩니다.

### 4. page.tsx 설정하기

이제 `tailwindcss`로 원하는 페이지에 폰트를 적용하는 방법의 예입니다.

```javascript
export default async function Confirm() {
  return (
    <main className="flex flex-col items-center ">
      <h1 className={'font-happySans'}>확인하였습니다.</h1>
    </main>
  )
}
```

위와 같이 `font-happySans`의 클래스로 적용하면 해당 폰트는 `Single_Day` 폰트가 적용되게 됩니다.
