import baseHandler from "../../lib/middleware/common";
// import { getSession } from "../../lib/middleware/session";

export default baseHandler().post( async(req, res) => {
  // const session = await getSession(req, res);
  // await session.destroy();
  await req.session.destroy();
  res.status(204).end();
}).get(async(req, res) => {
  await req.session.destroy();
  res.status(204).end();
});

export const config = {
  api: {
    externalResolver: true,
  },
}
