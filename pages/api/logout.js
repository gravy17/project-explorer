import baseHandler from "../../lib/middleware/common";

export default baseHandler().post( async(req, res) => {
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
