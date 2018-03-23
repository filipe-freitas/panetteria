const idProduto = window.location.href.split("#");

if (idProduto[1]){
    //alterações no front-end caso um único cliente seja selecionado
    document.getElementById("cadastrarProduto").innerHTML = "salvar";
    document.getElementById("tituloPagina")    .innerHTML = "produto";
    document.getElementById("produto")         .innerHTML = "#" + idProduto[1];
    document.getElementById("form")            .className = "";
    document.getElementById("excluirProduto").style.visibility = "visible";
    //Alterações para Inativar um Produto
    $(document).on("click", "#excluirProduto", ()=>{
        document.getElementById("excluirProduto").type      = "button";
        document.getElementById("modal-title")   .innerHTML = "Exclusão de Produto";
        document.getElementById("modal-message") .innerHTML = "Tem certeza que deseja excluir o produto?";
        document.getElementById("botaoModal")    .className = "btn btn-outline-danger";
        $("#validacaoModal").modal("show");
    });
    $(document).on("click", "#botaoModal", ()=>{
        document.getElementById("excluirProduto").type   = "submit"
        document.getElementById("form")          .action = "panetteria.delProduct/" + idProduto[1] + "?_method=DELETE";
        document.getElementById("form")          .submit();
    });
    //Alterações para Atualizar um Produto
    $(document).on("click", "#cadastrarProduto", ()=>{
        document.getElementById("cadastrarProduto").type      = "button";
        document.getElementById("modal-title")     .innerHTML = "Atualização de Produto";
        document.getElementById("modal-message")   .innerHTML = "Tem certeza que deseja atualizar o produto?";
        document.getElementById("botaoModal")      .className = "btn btn-outline-primary";
        $("#validacaoModal").modal("show");
    });
    $(document).on("click", "#botaoModal", ()=>{
        document.getElementById("cadastrarProduto").type   = "submit";
        document.getElementById("form")            .action = "panetteria.saveProduct/" + idProduto[1] + "?_method=PUT";
        document.getElementById("form")            .submit();
    });
    //Buscando os dados pra popular os campos da tela
    const url = "/panetteria.getProduct/" + idProduto[1];
    fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
        let keys = Object.keys(data);
        for(let i = 0; i <= keys.length; i++){
            if ((keys[i] != "_id") && (keys[i] != "id") && (keys[i] != "status") && (keys[i] != "__v") && (keys[i] != undefined)){
                let key = keys[i];
                document.getElementById(key + "Produto")["value"] = data[key];
            }
        }
    })
    .catch((error)=>{
        console.log(error);
    });
}

function cadastrar(){
    document.getElementById("footer").className = "navbar fixed-bottom bg-success";
    setTimeout(function(){document.getElementById("footer").className = "navbar fixed-bottom bg-primary"}, 2000);
}