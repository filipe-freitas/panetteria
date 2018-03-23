module.exports = (app)=>{
    //Variáveis globais
    const db      = require('../db');
    const Cliente = db.Mongoose.model('cliente', db.ClienteSchema, 'cliente');
    //FUNCTION para Sequence de clientes
    function idSequence(callback){
        Cliente.find(
            {},
            {_id: 0, id: 1}).sort({id: -1}).limit(1).lean().exec((err, docs)=>{
                if(callback){
                    callback(docs[0].id);
                }
            });
    };
    //GET todos os clientes ativos
    app.get("/panetteria.getClientele", (req, res)=>{
        Cliente.find({status: "A"}).lean().exec((err, docs)=>{
            if(err){
                res.status(500).json({error: err.message});
                res.end();
                return;
            }
            res.status(200).json(docs);
            res.end();
        });
    });
    //GET cliente específico
    app.get("/panetteria.getCustomer/:id", (req, res)=>{
        Cliente.find({_id: req.params.id}).lean().exec((err, docs)=>{
            if(err){
                res.status(500).json({error: err.message});
                res.end();
                return;
            }
            res.status(200).json(docs[0]);
            res.end();
        });
    });
    //GET cliente por nome
    app.get("/panetteria.getCustomerByName/:nome", (req, res)=>{
        Cliente.find({"$or":[{nome: req.params.nome}, {sobrenome:req.params.nome}]}).lean().exec((err, docs)=>{
            if(err){
                res.status(500).json({error: err.message});
                res.end();
                return;
            }
            res.status(200).json(docs);
            res.end();
        });
    });
    //GET cliente por cpf
    app.get("/panetteria.getCustomerByCPF/:cpf", (req, res)=>{
        Cliente.find({cpf: req.params.cpf}).lean().exec((err, docs)=>{
            if(err){
                res.status(500).json({error: err.message});
                res.end();
                return;
            }
            res.status(200).json(docs[0]);
            res.end();
        });
    });
    //GET cliente por telefone
    app.get("/panetteria.getCustomerByTelefone/:telefone", (req, res)=>{
        Cliente.find({telefone: req.params.telefone}).lean().exec((err, docs)=>{
            if(err){
                res.status(500).json({error: err.message});
                res.end();
                return;
            }
            res.status(200).json(docs);
            res.end();
        });
    });
    //GET cliente
    app.get("/panetteria.searchCustomer/:data", (req, res)=>{
        Cliente.find({"$or":[{nome: req.params.data}, {sobrenome: req.params.data}, {telefone: req.params.data}, {cpf: req.params.data}]})
        .lean().exec((err, docs)=>{
            if(err){
                res.status(500).json({error: err.message});
                res.end();
                return;
            }
            res.status(200).json(docs);
            res.end();
        });
    });
    //POST cliente
    app.post("/panetteria.addCustomer", (req, res)=>{
        idSequence((valor)=>{
            const novoCliente = new Cliente({id: Number(valor) + 1,
                                           nome: req.body.nome,
                                      sobrenome: req.body.sobrenome,
                                       telefone: req.body.telefone,
                                            cpf: req.body.cpf,
                                            cep: req.body.cep,
                                         estado: req.body.estado,
                                         cidade: req.body.cidade,
                                     logradouro: req.body.logradouro,
                                  numLogradouro: req.body.numLogradouro,
                                         status: "A"});
            novoCliente.save((err)=>{
                if(err){
                    res.status(500).json({error: err.message});
                    res.end();
                    return;
                }
                res.status(201).json(novoCliente);
                res.redirect("/");
                res.end();
            });
        });
    });
    //PUT cliente específico
    app.put("/panetteria.saveCustomer/:id", (req, res)=>{
        Cliente.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true}, (err, docs)=>{
            if(err){
                res.status(500).json({error: err.message});
                res.end();
                return;
            }
            res.status(200).redirect("/");
            res.end();
        });
    });
    //DELETE cliente específico
    app.delete("/panetteria.delCustomer/:id", (req, res)=>{
        Cliente.findOneAndUpdate({_id: req.params.id}, {status: "I"}, {upsert: true}, (err, docs)=>{
            if(err){
                res.status(500).json({error: err.message});;
                res.end();
                return;
            }
            res.status(200).redirect("/");
            res.end();
        });
    });
};