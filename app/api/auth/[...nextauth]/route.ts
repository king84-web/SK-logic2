import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// We keep authOptions here, but we don't export it 
// This keeps Next.js happy while keeping your logic working
const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email === "kamarasolomon164@gmail.com" && credentials?.password === "Trapper84") {
          return { id: "1", name: "Admin", email: "kamarasolomon164@gmail.com" };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: '/admin/login',
  },
};

const handler = NextAuth(authOptions);

// Next.js expects only these types of exports in a route file:
export { handler as GET, handler as POST };