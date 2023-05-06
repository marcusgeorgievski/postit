# 🗒️ postit

_@developedbyed on YouTube_

## 🔧 Tools

-   Next.js + React
-   TypeScipt
-   PostrgreSQL via Railway
-   Prisma

### Prisma

Generate `prisma/schema.prisma`

```
npm install typescript ts-node @types/node --save-dev
npm install @prisma/client
```

```js
import { PrismaClient } from "@prisma/client";

// To instantiate a prisma client only once
const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
```

Make sure to add `DATABASE_URL` to `/local`

Once this is setup...

-   Create models in `prisma/schema.prisma`
-   `npx prisma migrate dev --name init` to migrate models to db
-   Check db for updated changes

### Auth

Install stuff:

```npm
npm install next-auth @prisma/client @next-auth/prisma-adapter
npm install prisma --save-dev
```

Add API route in `pages/api/auth/[...nextauth].js`. This example uses google for auth

```js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import prisma from "@prisma/client";

// const prisma = new PrismaClient();

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
});
```

Copy and paste accout/user schemas into `prisma/schema.prisma`

#### Google Auth

-   Go to Google Cloud Console
-   Create a project and setup credentials
    -   `APIs & Services/Credentials` -> `+ CREATE CREDENTIAL/OAuth client ID`
    -   Select Web Application, add locahost to authorized js origins
    -   Consent screen may be required, go through it

#### Next.js Setup
