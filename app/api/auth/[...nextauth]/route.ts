import NextAuth, {NextAuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {PrismaClient} from "@prisma/client"


const prisma = new PrismaClient()
export const authOptions: NextAuthOptions = {
    // @ts-ignore
    adapter: PrismaAdapter(prisma),
    // 在 providers 中配置更多授权服务
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            httpOptions: {
                timeout: 10000,
            },
        }),
        GoogleProvider({
            clientId: '77759431340-cbpaoj16170l2gb45nco1o8r1qrbhmov.apps.googleusercontent.com',
            clientSecret: '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',
            httpOptions: {
                timeout: 10000,
            },
        })
        // ...add more providers here
    ],
    callbacks: {
        session: async ({session, token, user}) => {
            if (session?.user) {
                session.user.id = user.id;
            }
            return session;
        },

    }
}

const handler = NextAuth(authOptions)


export {handler as GET, handler as POST}