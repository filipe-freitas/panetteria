const app = require('./config/custom-express')();

app.listen(8000, ()=>{
    console.log("Panetteria Server ativo na porta 8000");
});