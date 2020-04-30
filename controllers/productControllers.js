const {db}=require('./../connection')
const {uploader}=require('./../helper/uploader')
const fs=require('fs')

module.exports={
    getproducts:(req,res)=>{
        db.query('select * from product',(err,result)=>{
            if (err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    },
    addproduct:(req,res)=>{
        try {
            const path='/image'
            const upload=uploader(path,'PROD').fields([{ name: 'image'}])
            upload(req,res,(err)=>{
                if(err){
                    return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
                }
                const { image } = req.files;
                const imagePath = image ? path + '/' + image[0].filename : null;
                const data = JSON.parse(req.body.data);
                data.imageimage=imagePath
                var sql=`insert into product set ?`
                db.query(sql,data,(err,result)=>{
                    if(err) {
                        fs.unlinkSync('./public' + imagePath);
                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                    }
                    sql=`select * from product`
                    db.query(sql,(err1,result1)=>{
                        if(err1) return res.status(500).send(err1)
                        return res.status(200).send(result1)
                    })
                    return res.status(200).send(result)
                })
            })
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    editproduct:(req,res)=>{
        const {id}=req.params
        var sql=`select * from product where product_id=${id}`
        db.query(sql,(err,result)=>{
            if (err) res.status(500).send(err)
            if(result.length){
                try {
                    const path='/image'
                    const upload=uploader(path,'PROD').fields([{ name: 'image'}])
                    upload(req,res,(err)=>{
                        if(err){
                            return res.status(500).json({ message: 'Upload post picture failed !', error: err.message });
                        }
                        const { image } = req.files;
                        const imagePath = image ? path + '/' + image[0].filename : null;
                        const data = JSON.parse(req.body.data);
                        if(imagePath){
                            data.imagePath = imagePath
                            let { nama, harga } = req.body
                            let sql = `update product set nama = '${nama}', harga = ${parseInt(harga)}, imagePath = '${imagePath}' where product_id = '${id}'`
                        }
                        sql = `update product set ? where id = ${id};`
                        db.query(sql,data,(err1,result1)=>{
                            if(err1) {
                                if(imagePath) {
                                    fs.unlinkSync('./public' + imagePath);
                                }
                                return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                            }
                            if(imagePath) {//hapus foto lama
                                if(result[0].imagePath){
                                    fs.unlinkSync('./public' + result[0].imagePath);
                                }
                            }
                            sql=`select * from foto`
                            db.query(sql,(err1,result2)=>{
                                if(err1) return res.status(500).send(err1)
                                return res.status(200).send(result2)
                            })
                        })
                    })
                } catch (err) {
                    res.status(500).send({
                        status: 'Error',
                        message: err.message,
                    })
                }
            }else{
                return res.status(500).send({message:'nggak ada woy idnya'})
            }
        })
    },
    deleteproduct:(req,res)=>{
        const {id}=req.params
        var sql=`select * from product where product_id=${id}`
        db.query(sql,(err,result)=>{
            if (err) res.status(500).send(err)
            if(result.length){
                sql=`delete from product where product_id=${id}`
                db.query(sql,(err,result2)=>{
                    if (err) res.status(500).send(err)
                    console.log(result2)
                    if(result[0].imagefoto){
                        fs.unlinkSync('./public'+result[0].imagefoto)
                        sql = `select * from inventory where product_id = ${id}`
                        db.query(sql,(err3,result3)=>{
                            if (err) res.status(500).send(err)
                            result3.forEach((e)=>{
                                sql = `delete from inventory where inventory_id = ${e.inventory_id}`
                            })
                        })
                    }
                    sql=`select * from product`
                    db.query(sql,(err1,result1)=>{
                        if(err1) return res.status(500).send(err1)
                        return res.status(200).send(result1)
                    })
                })
            }else{
                return res.status(500).send({message:'nggak ada woy idnya'})
            }
        })
    }
}