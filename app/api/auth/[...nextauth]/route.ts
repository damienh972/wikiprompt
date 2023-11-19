import User from '@models/user';
import { connectToDB } from '@utils/database';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

const clientId = process.env.GOOGLE_CLIENT_ID as string;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });
      session.user.id = sessionUser?._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile?.email });
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(' ', '').toLowerCase(),
            image: '',
          });
        }
        return true;
      } catch (error) {
        console.log('Error logging in', error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
