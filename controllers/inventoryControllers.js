const {db}=require('./../connection')

module.exports={
    getinventory: (req, res) => {
        let sql = `select 
        i.inventory_id, 
        p.nama, 
        s.branch_name, 
        i.inventory 
        from inventory i 
        join product p on i.product_id = p.product_id 
        join store s on i.store_id = s.store_id`;
        db.query(sql, (err, result) => {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        });
      },
      addinventory: (req, res) => {
        var sql=`insert into inventory set ?`
        try {
            db.query(sql,data,(err,result)=>{
                if (err) return res.status(500).send(err)
                sql=`select 
                i.inventory_id, 
                p.nama, 
                s.branch_name, 
                i.inventory 
                from inventory i 
                join product p on i.product_id = p.product_id 
                join store s on i.store_id = s.store_id
                where inventory_id = ${result.insertId}`
                db.query(sql,(err1,result1)=>{
                    if(err1) return res.status(500).send(err1)
                    return res.status(200).send(result1)
                })
            })
        }catch (error) {
            return res.status(500).send(error)
        }
      },
      editinventory:(req,res)=>{
        const {id}=req.params
        var sql=`update inventory set ? where inventory_id = ${id}`
        db.query(sql,req.body,(err,result)=>{
            if (err) return res.status(500).send(err)
            db.query(`select 
            i.inventory_id, 
            p.nama, 
            s.branch_name, 
            i.inventory 
            from inventory i 
            join product p on i.product_id = p.product_id 
            join store s on i.store_id = s.store_id
            where inventory_id = ${id}`,(err,result1)=>{
                if (err) return res.status(500).send(err)
                return res.status(200).send(result1)
            })
        })
    },
    deleteinventory:(req,res)=>{
        const {id}=req.params
        var sql=`delete from inventory where inventory_id = ${id}`
        try {
            db.query(sql, (err, result) => {
              if (err) throw err;
              console.log(result);
              res.send(result);
            });
          } catch (error) {
            console.log(error);
            res.send(error);
          }
    }
}