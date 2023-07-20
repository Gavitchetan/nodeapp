import jwt from 'jsonwebtoken'
export const cookies = async (res, user, statuscode, meassage) => {
  try {
    console.log
    const token = jwt.sign({ _id: user._id }, 'habibi')
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Devlopment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Devlopment" ? false : true,
    }).status(statuscode).json({
      Message: meassage,
      success: false
    })
  } catch (error) {
    res.status(400).json({
      Message: "error",
      success: false
    })
  }

}


export const Taskmessage = (res, message, statuscode, answer) => {
  res.status(statuscode).json({
    Meassage: message,
    success: answer
  })
}