import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import usuarioRoutes from "./routes/usuarioRoutes.js";
import db from './config/db.js'

// Crear la app
const app = express()

//Habilitar lectura de datos de formulario
app.use( express.urlencoded({ extended:true }) )

// Habilitar cookie parser
app.use(cookieParser())

// Habilitar CSRF
app.use(csrf({cookie:true}))

//Conexion a la base de datos
try{
    await db.authenticate()
    db.sync()
    console.log("Conexion correcta a la base de datos")
}catch (error){
    console.error(error)
}

//Habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')

//Carpeta publica
app.use(express.static('public'))

//Routing
app.use('/auth', usuarioRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})