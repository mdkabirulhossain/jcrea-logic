import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Bonus: RBAC — environment-driven role assignment
        const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
        token.role = user.email === adminEmail ? "admin" : "manager";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "admin" | "manager";
      }
      return session;
    },
  },
});

export const { GET, POST } = handlers;
