module.exports = (app)=>{
    //Variáveis globais
    const db      = require("../db");
    const Usuario = db.Mongoose.model('usuario', db.UsuarioSchema, 'usuario');
    //Validar login
    app.get("/panetteria.login", (req, res)=>{
        Usuario.find({nome: String(req.body.username).toLowerCase(),
                     senha: req.body.password,
                    status: "A"}, (err, docs)=>{
                        if(docs.length){
                            console.log('Usuário encontrado!');
                            res.status(200).redirect('index.html');
                        }else{
                            console.log('Usuário inexistente!');
                            console.log(req.body.username);
                            res.status(401).redirect('login.html');
                        }
        });
    });
    //Inserir novos usuários
    app.post('/panetteria.addUser', (req, res)=>{
        const novoUsuario = new Usuario({
            id       : req.body.id,
            nome     : req.body.nome.toLowerCase(),
            senha    : req.body.senha,
            permissao: req.body.permissao,
            status   : "A"
        });
        novoUsuario.save((err)=>{
            if(err){
                res.status(500).json({error: err.message});
                res.end();
                return;
            }else{
                res.status(201).json(novoUsuario).redirect("/");
                res.end();
            }
        });
    });
}
//     if(vsNome.toUpperCase() == 'FILIPE' && vsSenha == 'teste'){
//         document.getElementById('footer').className = 'navbar fixed-bottom bg-success';
//         setTimeout(function(){
//             document.getElementById('footer').className = 'navbar fixed-bottom bg-primary';
//             window.open("index.html", "_self");
//         }, 2000);
//     }else{
//         document.getElementById('footer').className = 'navbar fixed-bottom bg-danger';
//         setTimeout(function(){document.getElementById('footer').className = 'navbar fixed-bottom bg-primary'}, 2000);
//     }