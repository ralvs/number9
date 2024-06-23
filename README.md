# Number 9 App


Interview project of Renan Alves.

Bootstrapped with `create-t3-app` and using:
- [Next.js v14](https://nextjs.org)
- [React](https://react.dev)
- [Prisma](https://prisma.io)
- [MUI](https://mui.com/material-ui)

## Disclaimer

My main goal here was to complete all the project requirements usins just Next.js 14, React Server Components and React Server Actions. Avoiding other libraries for data fetching like Tanstack Query and tRPC.<br>

It's a very new way of doing things, and people are still skeptical or confused about it.
I recommend watch this video of Theo, creator of T3 Stack, as a proof that this is a good way to build.

https://www.youtube.com/watch?v=Angv_WIAOG8


## How to test on your machine?

#### *Attention: every request has a forced delay of 1 or 2 seconds to simulate a real network*

Please clone this repository and run the folloing commands:

`pnpm i`<br>
`echo 'DATABASE_URL="file:./db.sqlite"' > .env`<br>
`pnpm db:init`<br>
`pnpm build`<br>
`pnpm start`
