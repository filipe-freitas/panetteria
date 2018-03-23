const idCliente = window.location.href.split("#");

if (idCliente[1]){
    //Alterações no Front-End caso um único cliente seja selecionado
    document.getElementById("cadastrarCliente").innerHTML = "salvar";
    document.getElementById("tituloPagina")    .innerHTML = "cliente";
    document.getElementById("cliente")         .innerHTML = "#" + idCliente[1];
    document.getElementById("form")            .className = "";
    document.getElementById("excluirCliente").style.visibility = "visible";
    //Alterações para Inativar um Cliente
    $(document).on("click", "#excluirCliente", ()=>{
        document.getElementById("excluirCliente").type      = "button";
        document.getElementById("modal-title")   .innerHTML = "Exclusão de Cliente";
        document.getElementById("modal-message") .innerHTML = "Tem certeza que deseja excluir o cliente?";
        document.getElementById("botaoModal")    .className = "btn btn-outline-danger"
        $("#validacaoModal").modal("show");
    });
    $(document).on("click", "#botaoModal", ()=>{
        document.getElementById("excluirCliente").type   = "submit";
        document.getElementById("form")          .action = "panetteria.delCustomer/" + idCliente[1] + "?_method=DELETE";
        document.getElementById("form")          .submit();
    });
    //Alterações para Atualizar um Cliente
    $(document).on("click", "#cadastrarCliente", ()=>{
        document.getElementById("cadastrarCliente").type      = "button";
        document.getElementById("modal-title")     .innerHTML = "Atualização de Cliente";
        document.getElementById("modal-message")   .innerHTML = "Tem certeza que deseja atualizar as informações do cliente?";
        document.getElementById("botaoModal")      .className = "btn btn-outline-primary"
        $("#validacaoModal").modal("show");
    });
    $(document).on("click", "#botaoModal", ()=>{
        document.getElementById("cadastrarCliente").type   = "submit";
        document.getElementById("form")            .action = "panetteria.saveCustomer/" + idCliente[1] + "?_method=PUT";
        document.getElementById("form")            .submit();
    });
    //Buscando os dados pra popular os campos da tela
    const url = "/panetteria.getCustomer/" + idCliente[1];
    fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
        let keys = Object.keys(data);
        for(let i = 0; i <= keys.length; i++){
            if ((keys[i] != "_id") && (keys[i] != "id") && (keys[i] != "status") && (keys[i] != "__v") && (keys[i] != undefined)){
                let key = keys[i];
                document.getElementById(key + "Cliente")["value"] = data[key];
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