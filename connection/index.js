const mysql=require('mysql')
const db=mysql.createConnection({
    host:'localhost',
    user:'Scherzie',
    password:'ch3v@l!nSQL80',//dari workbench
    database:'ujian_back_end_jc12',
    port:'3306'
})

db.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log('connected')
})

module.exports=db