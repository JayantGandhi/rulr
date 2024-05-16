import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
  } from "next"
import LinkedInProvider from "next-auth/providers/linkedin";
import Auth0Provider from "next-auth/providers/auth0";
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"


export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
      Auth0Provider({
          clientId: process.env.AUTH0_CLIENT_ID as string,
          clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
          issuer: process.env.AUTH0_DOMAIN as string,
      }),
      LinkedInProvider({
          clientId: process.env.LINKEDIN_CLIENT_ID as string,
          clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
          authorization: {
              params: { scope: 'openid profile email' },
          },
          issuer: 'https://www.linkedin.com/oauth',
          jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
          profile(profile, tokens) {
              const defaultImage =
                  'https://cdn-icons-png.flaticon.com/512/174/174857.png';
              return {
                  id: profile.sub,
                  name: profile.name,
                  email: profile.email,
                  image: profile.picture ?? defaultImage
              };
          },
      }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
      signIn: '/login',
  },
} satisfies NextAuthOptions

// Use it in server contexts
export function getServerAuthSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions)
}