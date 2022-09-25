## ✨ [MIDI Planet]((https://midi-planet-front.vercel.app/))

MIDI Planet は。 DTMer 向けの動画制作サイトです。MIDI を使った動画制作が簡単に行えます。

- このプロジェクトは、[技育展 2022](https://talent.supporterz.jp/geekten/2022/) のために開発を開始しました。
- [タスク一覧](https://github.com/stonesaw/midi-planet-front/issues/1)


## 使い方

1. [MIDI Planet](https://midi-planet-front.vercel.app/editor) へアクセスします。
2. 画面左上の「+」 マークから、Shape・Text・MIDI・Audio を追加します。
3. 画面右の エディタ で、色や表示位置を調節できます。
4. 画面下のタイムラインから、オブジェクトの表示時間を調節できます。また、タイムラインバーをクリックすると、パラメータを調節するオブジェクトを選択できます。


## 使用技術

`フロントエンド`
- TypeScript
- フレームワーク ... [Next.js](https://nextjs.org/)
- UI フレームワーク ... [Chakra UI](https://chakra-ui.com/)
- キャンバス描画 ...  [p5.js](https://p5js.org/)
- MIDIパーサー ... [Tone.js/MIDI](https://github.com/Tonejs/Midi)

`バックエンド`
- Node.js
- [Next.js](https://nextjs.org/)

`インフラ`
- デプロイサーバー ...  [Vercel](https://vercel.com/)
- DB ... [Planet Scale](https://planetscale.com/)


## 開発者

- [@sor4chi](https://github.com/sor4chi)
- [@stonesaw](https://github.com/stonesaw)


<br />

---

<br />

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
