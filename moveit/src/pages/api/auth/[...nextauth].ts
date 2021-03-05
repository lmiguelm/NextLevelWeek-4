import { NextApiRequest, NextApiResponse } from 'next';

import NextAuth, { User } from 'next-auth';
import { SessionBase } from 'next-auth/_utils';

import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';

import Models from '../../../Models';

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENTE_SECRET
    }),
    
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET
    }),
  ],

  callbacks: {
    async session(session: SessionBase, user: User) {
      return Promise.resolve({session, user});
    }
  },
  
  adapter: Adapters.TypeORM.Adapter(
    process.env.MYSQL_URL as any,
    {
      models: {
        User: Models.User as any
      }
    }
  ),

  database: process.env.MYSQL_URL
}); 