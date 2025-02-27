# Next.js Framework Starter

<!-- dash-content-start -->

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It's deployed on Cloudflare Workers as a [static website](https://developers.cloudflare.com/workers/static-assets/).

<!-- dash-content-end -->

Outside of this repo, you can start a new project with this template using [C3](https://developers.cloudflare.com/pages/get-started/c3/) (the `create-cloudflare` CLI):

```bash
npm create cloudflare@latest -- --template=cloudflare/templates/democracy-101
```

A live public deployment of this template is available at [https://democracy-101.radul.workers.dev](https://democracy-101.radul.workers.dev)

## Getting Started

First, run:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then run the development server (using the package manager of your choice):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Language Selection

This project supports multiple languages (English and Romanian) that can be selected in two ways:

1. **Via URL Path**: You can visit `/en` or `/ro` to view the site in your preferred language.
   Example: `https://democracy-101.radul.workers.dev/en`

2. **Via UI Controls**: Use the language switcher buttons in the top-right corner of the page.

When a language is selected using the UI controls, you'll be redirected to the appropriate language path, making it easy to share language-specific links.

## Deploying To Production

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm run build`   | Build your production site                   |
| `npm run preview` | Preview your build locally, before deploying |
| `npm run deploy`  | Deploy your production site to Cloudflare    |

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
