import baseHandler from "../../lib/middleware/common";
// import { getSession } from "../../lib/middleware/session";

export default baseHandler().post(async(req, res) => {
  try {
    // const session = await getSession(req, res);
    // if(!session.user) {
    //   res.status(401).json({ success: false, info: ['Not Authenticated. Log in to use protected features'] });  
    // }
    // res.status(200).json({ success: true, data: session.user });
    if(!req.session.user) {
      res.status(401).json({ success: false, info: ['Not Authenticated. Log in to use protected features'] });  
    }
    res.status(200).json({ success: true, data: req.session.user });
  } catch(err) {
    res.status(400).json({ success: false, errors: [err.message] });
  }
});

export const config = {
  api: {
    externalResolver: true,
  },
}