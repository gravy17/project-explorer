import baseHandler from '../../lib/middleware/common';
import { authenticate } from '../../services/user';

export default baseHandler().post(async(req, res) => {
  try {
    const { email, password } = req.body;
    const [isAuthenticated, result] = await authenticate(email, password);

    if(!isAuthenticated){
      throw new Error('Invalid credentials...');
    }
    req.session.user = result;

    res.status(200).json({ success: true, data: result });
  } catch(err) {
    console.error(err.message+": \n"+err.stack);
    res.status(400).json({ success: false, errors: [err.message] });
  }
}); 

export const config = {
  api: {
    externalResolver: true,
  },
}
