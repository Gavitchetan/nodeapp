import Jwt from "jsonwebtoken"
import { User } from "../models/model.js";

export const authentication = async (req, res, next) => {
     const { token } = req.cookies;
     if (!token) {
          return res.status(404).json({
               message: 'Login first'
          })
     }
     const decode = Jwt.verify(token, 'habibi');
     const user = await User.findById(decode._id)
     // console.log(user)
     
     req.user = user
     // await user.save()
     next()
}