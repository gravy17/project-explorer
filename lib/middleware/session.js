import MongoStore from "connect-mongo";
import nextSession from "next-session";
import { promisifyStore } from "next-session/lib/compat";
import { getSessionClient } from "./dbConnect";


const mongoStore = MongoStore.create({
  clientPromise: getSessionClient(),
  stringify: false
})
 
export const getSession = nextSession({
  store: promisifyStore(mongoStore),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 2 * 7 * 24 * 60 * 60,
    path: "/",
    sameSite: "strict"
  },
  touchAfter: 1 * 7 * 24 * 60 * 60
});

export default async function session(req, res, next) {
  await getSession(req, res);
  next();
}