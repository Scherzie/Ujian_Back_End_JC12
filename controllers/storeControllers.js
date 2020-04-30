const {db}=require('./../connection')

module.exports={
    getstore:(req,res)=>{
        db.query('select * from store',(err,result)=>{
            if (err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    },
    addstore:(req,res)=>{
        var sql=`insert into store set ?`
        try {
            db.query(sql,data,(err,result)=>{
                if (err) return res.status(500).send(err)
                sql=`select * from store where store_id = ${result.insertId}`
                db.query(sql,(err1,result1)=>{
                    if(err1) return res.status(500).send(err1)
                    return res.status(200).send(result1)
                })
            })
        }catch (error) {
            return res.status(500).send(error)
        }
    },
    editstore:(req,res)=>{
        const {id}=req.params
        var sql=`update store set ? where store_id=${id}`
        db.query(sql,req.body,(err,result)=>{
            if (err) return res.status(500).send(err)
            db.query(`select * from store where store_id=${id}`,(err,result1)=>{
                if (err) return res.status(500).send(err)
                return res.status(200).send(result1)
            })
        })
    },
    deletestore:(req,res)=>{
        const {id}=req.params
        var sql=`select * from inventory where store_id=${id}`
        db.query(sql,(err,result)=>{
            if (err) res.status(500).send(err)
            if(result.length){
                result.forEach((e)=>{
                    sql=`delete from inventory where inventory_id=${e.inventory_id}`
                })
                sql=`delete from store where store_id = ${id}`
                db.query(sql,(err1,result1)=>{
                    if(err1) return res.status(500).send(err1)
                    return res.status(200).send(result1)
                })
            }else{
                return res.status(500).send({message:err.message})
            }
        })
    }
}