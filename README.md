<p align="center">
  <a href="https://www.gatsbyjs.com/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Minimal TypeScript Starter
</h1>

## UI 컴포넌트

> https://ui.shadcn.com > https://www.radix-ui.com

`ui.shadcn.com`는 `tailwindcss`와 `@radix-ui`를 활용하여 UI컴포넌트를 사용할 수 있습니다. 그래서 ui.shadcn.com를 활용하면 됩니다.
npx shadcn-ui@latest init를 사용하여 설치시 인증서 오류문제가 발생할 수 있습니다.
프로덕션 환경이 아니라면 `NODE_TLS_REJECT_UNAUTHORIZED=0`를 사용하여 우회 설치할 수 있습니다.

> 예시 : `NODE_TLS_REJECT_UNAUTHORIZED=0 npx shadcn-ui@latest init`
> 예시 : `NODE_TLS_REJECT_UNAUTHORIZED=0 npx shadcn-ui@latest add card`

## Icon 사용

lucide에서 아이콘을 사용합니다. `lucide-react`

> https://lucide.dev/icons

## 핵심 수정사항

---

- md파일

  - `class`를 `className` 로 일괄변경
  - `allowfullscreen`를 `allowFullScreen` 로 일괄변경

- common은 `Common`으로 설정함

## 특정 오류 사항

---

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the minimal TypeScript starter.

    ```shell
    # create a new Gatsby site using the minimal TypeScript starter
    npm init gatsby -- -ts
    ```

2.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-gatsby-site/
    npm run develop
    ```

3.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000!

    Edit `src/pages/index.tsx` to see your site update in real-time!

4.  **Learn more**

    - [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Tutorials](https://www.gatsbyjs.com/docs/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Guides](https://www.gatsbyjs.com/docs/how-to/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)

## 🚀 Quick start (Netlify)

Deploy this starter with one click on [Netlify](https://app.netlify.com/signup):

[<img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" />](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-minimal-ts)
