import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {HttpsProxyAgent} from "https-proxy-agent"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

const handler = NextAuth({
        adapter: PrismaAdapter(prisma),
        // 在 providers 中配置更多授权服务
        providers: [
            GithubProvider({
                clientId: process.env.GITHUB_ID as string,
                clientSecret: process.env.GITHUB_SECRET as string,
                httpOptions: {
                    timeout: 50000,
                    agent: process.env.NEXT_AUTH_PROXY?new HttpsProxyAgent(process.env.NEXT_AUTH_PROXY):undefined
                },
            }),
            GoogleProvider({
                clientId: '77759431340-cbpaoj16170l2gb45nco1o8r1qrbhmov.apps.googleusercontent.com',
                clientSecret: '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',
                httpOptions: {
                    timeout: 50000,
                    agent: process.env.NEXT_AUTH_PROXY?new HttpsProxyAgent(process.env.NEXT_AUTH_PROXY):undefined
                },
            })
            // ...add more providers here
        ],
        callbacks:{
            session: async ({ session, token, user }) => {
                      if (session?.user) {
                        session.user.id = user.id;
                      }
                      return session;
                    },
                 
        }
    }
)


export {handler as GET, handler as POST}