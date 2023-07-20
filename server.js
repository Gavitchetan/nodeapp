import app from "./index.js"
import Store from "./data/Databse.js"
Store();

app.listen(3000, () => {
     console.log(`server is working on port:${process.env.Port} in ${process.env.NODE_ENV}`)
})


