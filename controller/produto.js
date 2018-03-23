module.exports = (app)=>{
    //Variáveis globais
    const db      = require("../db");
    const Produto = db.Mongoose.model('produto', db.ProdutoSchema, 'produto');
    //FUNCTION para Sequence de produtos
    function idSequence(callback){
        Produto.find(
            {},
            {_id: 0, id: 1}).sort({id: -1}).limit(1).lean().exec((err, docs)=>{
                if(callback){
                    callback(docs[0].id);
                }
            });
    };
    //GET para todos os produtos
    app.get("/panetteria.getProducts", (req, res)=>{
        Produto.find({status: "A"}).lean().exec((err, docs)=>{
            if(err){
                res.status(500).json({error: err.message});
                res.end();
                return;
            }
            res.status(201).json(docs);
            res.end();
        });
    });
    //GET para um produto específico
    app.get("/panetteria.getProduct/:id", (req, res)=>{
        Produto.find({_id: req.params.id}).lean().exec((err, docs)=>{
            if(err){
                res.status(500).json({error: err.message});
                res.end();
                return;
            }
            res.status(201).json(docs[0]);
            res.end();
        });
    });
    //GET produto
    app.get("/panetteria.searchProduct/:data", (req, res)=>{
        Produto.find({"$or": [{categoria: req.params.data}, {tipo: req.params.data}, {marca: req.params.data}]}).lean().exec((err, docs)=>{
            if(err){
                res.status(500).json({error: err.message});
                res.end();
                return;
            }
            res.status(200).json(docs);
            res.end();
        });
    });
    //POST para um produto
    app.post("/panetteria.addProduct", (req, res)=>{
        idSequence((valor)=>{
            const novoProduto = new Produto({id: Number(valor) + 1,
                                      categoria: req.body.categoria,
                                           tipo: req.body.tipo,
                                          marca: req.body.marca,
                                      descricao: req.body.descricao,
                                           peso: req.body.peso,
                                          preco: req.body.preco,
                                         status: "A"});
            novoProduto.save((err)=>{
                if(err){
                    res.status(500).json({error: err.message});
                    res.end();
                    return;
                }
                res.status(201).json(novoProduto);
                res.redirect("/");
                res.end();
            });
        });
    });
    //PUT para um produto
    app.put("/panetteria.saveProduct/:id", (req, res)=>{
        Produto.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true}, (err, docs)=>{
            if(err){
                res.status(500).json({error: err.message});
                res.end();
                return;
            }
            res.status(200).redirect("/");
            res.end();
        });
    });
    //DEL para um produto
    app.delete("/panetteria.delProduct/:id", (req, res)=>{
        Produto.findOneAndUpdate({_id: req.params.id}, {status: "I"}, {upsert: true}, (err, docs)=>{
            if(err){
                res.status(500).json({error: err.message});
                res.end();
                return;
            }
            res.status(200).redirect("/");
            res.end();
        });
    });
}