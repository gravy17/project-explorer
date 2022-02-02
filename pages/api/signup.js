import { create } from '../../services/user';
import baseHandler from '../../lib/middleware/common';

export default baseHandler().post(async(req, res) => {
  try {
    const newUser = req.body;
    const [isCreated, result] = await create(newUser);

    if (!isCreated) {
      throw new Error(result);  
    }

    req.session.user = result;

    res.status(200).json({ success: true, data: result });
  } catch(err) {
    res.status(400).json({ success: false, errors: [err.message || 'The request was not completed'] });
  }
});

export const config = {
  api: {
    externalResolver: true,
  },
}