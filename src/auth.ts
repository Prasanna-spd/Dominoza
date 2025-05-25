import NextAuth from "next-auth";
import getServerSession from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
import Google from "next-auth/providers/google";
import { prisma } from "./utils/connect";

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [Google],
};

export const { handlers, signIn, signOut } = NextAuth(authOptions);

export function getAuthSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}