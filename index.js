const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const cors=require('cors')
const PORT=2300

app.use(cors())//izin ke frontend apapun buat akses backend
app.use(bodyParser.json())//buat user kirim data ke server
app.use(bodyParser.urlencoded({ extended: true }));//buat user kirim data ke server
app.use(express.static('public'))

app.get('/',(req,res)=>{
    return res.send('<h1>Ujian Back End JC12</h1>')
})

const {productRouters,inventoryRouters,storeRouters}=require('./routers')
app.use("/product",productRouters)
app.use("/inventory",inventoryRouters)
app.use("/store",storeRouters)

app.listen(PORT,()=>console.log('server running on port '+PORT))