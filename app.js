// 1.  Require Dependencies 

const fs = require('fs')
const path = require('path')
const express = require('express');
const exphbs = require('express-handlebars'); 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv')
const bodyParser = require("body-parser");
const dotenvb = require('dotenv').config()
const fileUpload = require('express-fileupload');
const pdf = require('html-pdf');
const homeRoutes = require('./routes/homeRoutes')
const studentRoutes = require('./routes/studentRoutes')
const adminRoutes = require('./routes/adminRoutes')
const parentRoutes = require('./routes/parentRoutes')
const photographerRoutes = require('./routes/photographerRoutes')
const teacherRoutes = require('./routes/teacherRoutes')
const cookieParser = require('cookie-parser')
const {setUser} = require('./middleWare/setUser')
// const {bila} = require('./middleWare/setUser')
// const multer = require('multer')
// const upload = multer()

// bodyParser.json([options])


// 2.  Connect Mongoose

mongoose.connect(process.env.MONGOOSEGUY).then(()=>{
  console.log('DB Connected Successfully ! ')
}).catch((err)=>{  
  console.log('Connection Failure !' + err)
})

//  ||process.env.MONGODB_URI 

// 3. Initialise Express
const app = express()

// 4. Require MiddleWare 
// app.use(dotenvb());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cookieParser('your-secret'))

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  bodyParser.json({
    type: ["application/x-www-form-urlencoded","application/json"]
  })
);
app.use(setUser)
app.use(
  fileUpload({
    // useTempFiles: true,
    tempFileDir: './public/uploads',
  })
);


app.use('/',homeRoutes)
app.use('/student', studentRoutes);
app.use('/admin', adminRoutes);
app.use('/parent', parentRoutes);
app.use('/teacher', teacherRoutes);
app.use('/photographer', photographerRoutes);
// 5. Configure View Engine

app.engine('hbs', exphbs.engine({
  extname:'.hbs',
  defaultLayout:'main',
  runtimeOptions: {
    allowProtoMethodsByDefault: true, 
    allowProtoPropertiesByDefault: true
  }
}))

app.set('view engine', 'hbs')

const PORTs = process.env.PORT


// process.env.PORT


app.listen(PORTs, ()=>{
  console.log(`Now Listening on Port ${PORTs}`)
}); 
