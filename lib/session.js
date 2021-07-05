// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from "next-iron-session";

export default function withSession(handler) {
  return withIronSession(handler, {
    password: '44EE3BA78411D1FB9C19D40EC393950C999DCA34997DF9884E99AB92DFEDC82A',
    cookieName: "iron-session-auth",
    cookieOptions: {
      // the next line allows to use the session in non-https environements like
      // Next.js dev mode (http://localhost:3000)
      secure: "development",
    },
  });
}