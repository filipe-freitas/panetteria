module.exports = function(app){
    //Variáveis globais
    const db = require('../db');
    const Panetteria = db.Mongoose.model('cliente', db.PanetteriaSchema, 'cliente');
    //GET para todos os clientes
    app.get("/api.panetteria.cliente", (req, res)=>{
        Panetteria.find({}).lean().exec(function(err,docs){
            if(err){
                res.status(500).json({error: err.message});
                res.end();
                return;
            }
            res.json(docs);
            res.end();
        });
    });
    //GET para listas os clientes
    app.get("/api.panetteria.clientes", (req, res)=>{
        Panetteria.find({}, {id:1, nome:1, sobrenome:1, telefone:1, _id:0}).lean().exec(function(err,docs){
            if(err){
                res.status(500).json({error: err.message});
                res.end();
                return;
            }
            res.json(docs);
            res.end();
        });
    });
    //GET para um cliente
    app.get("/api.panetteria.cliente/:id", (req, res)=>{
        Panetteria.find({id: req.params.id}).lean().exec(function(err,docs){
            if(err){
                res.status(500).json({error: err.message});
                res.end();
                return;
            }
            res.json(docs[0]);
            res.end();
        });
    });
    //POST para um pagamento
    app.post("/api.panetteria.cliente", (req, res)=>{
        const novoCliente = new Panetteria({id: req.body.id,
                                          nome: req.body.nome,
                                     sobrenome: req.body.sobrenome,
                                      telefone: req.body.telefone,
                                           cpf: req.body.cpf,
                                           cep: req.body.cep,
                                        estado: req.body.estado,
                                        cidade: req.body.cidade,
                                    logradouro: req.body.logradouro,
                                 numLogradouro: req.body.numLogradouro});
        novoCliente.save(function(err){
            if(err){
                res.status(500).json({error: err.message});
                res.end();
                return;
            }
            res.status(201).json(novoCliente);
            res.end();
        });
    });
    //PUT para um pagamento
    app.put("/api.panetteria.cliente/:id", (req, res)=>{
        Panetteria.findOneAndUpdate({id:req.params.id}, req.body, {upsert:true}, function(err, doc){
            if(err){
                res.status(500).json({error:err.message});
                res.end();
                return;
            }
            res.json(req.body);
            res.end();
        });
    });
    //DELETE para um pagamento
    app.delete("/api.panetteria.cliente/:id", (req, res)=>{
        Panetteria.findOneAndRemove({id:req.params.id}).remove(err=>{
            if(err){
                res.status(500).json({error: err.message});
                res.end();
                return;
            }
            res.json({success:true});
            res.end();
        });
    });
};