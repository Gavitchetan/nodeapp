import { User } from "../models/model.js";
import bcrypt from 'bcrypt'
import { cookies } from "../utils/info.js";
import { Task } from "../models/task.js";
import ErrorHandeler, { notMatch } from "../middlewares/error.js";
export const Newuser = async (req, res, next) => {
     const { name, email, password } = req.body;
     try {
          const user = await User.findOne({ email });
          if (user) {
               return next(new ErrorHandeler('User Already exist', 400))
          }
          const hashedp = await bcrypt.hash(password, 10)
          const newUser = await User.create({
               name,
               email,
               password: hashedp,
          })
          cookies(res, newUser, 201, "account created", true)
     } catch (error) {
          next(error)
     }
}
export const login = async (req, res, next) => {
     const { email, password } = req.body
     try {
          const usr = await User.findOne({ email }).select("+password");
          if (!usr) {
               return next(new ErrorHandeler('Invalid email opassword', 400))
          }
          const ismatch = await bcrypt.compare(password, usr.password)
          if (!ismatch) {
               return next(new ErrorHandeler('Invalid email opassword', 400))

          }
          cookies(res, usr, 200, 'You have succesfully Login')
     } catch (error) {
          next(error)


     }
}
export const Profile = (req, res) => {
     res.json({
          Message: "Your Profile",
          success: true,
          user: req.user,
     })
}


export const Logout = (req, res) => {
     console.log(process.env.NODE_ENV === "Devlopment")
     res.status(200).cookie('token', '', {
          expores: new Date(Date.now())
     }).json({
          Message: "You're successfully Logout",
          success: true,
          sameSite: process.env.NODE_ENV === "Devlopment" ? "lax" : "none",
          secure: process.env.NODE_ENV === "Devlopment" ? false : true,
     })
}
