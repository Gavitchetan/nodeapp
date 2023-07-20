
export const notMatch = async (res, statuscode, Message, anser) => {
     anser = anser || 'false'
     res.status(statuscode).json({
          message: Message,
          success: anser
     })

}



class ErrorHandeler extends Error {

     constructor(message, statuscode) {
          super(message)
          this.statuscode = statuscode
     }
}

export const erorrmiddleware = ((err, req, res, next) => {
     // err.Message =
     // console.log(err)
     err.message = err.message || 'Internal Error'
     err.statuscode = err.statuscode || '400'

     return res.status(err.statuscode).json({
          success: false,
          Message: err.message
     })
})


export default ErrorHandeler