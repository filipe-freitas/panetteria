//Código para o Modal de Cliente
$(document).on("click", "#nomeCliente", ()=>{
    $("#pesquisaClienteModal").modal("show");
});

$(document).on("click", "#buscarClienteModal", ()=>{
    const url = "/panetteria.searchCustomer/" + document.getElementById("dadoClienteModal")["value"];
    const key = ["nome", "sobrenome", "telefone", "cpf"];

    fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
        let tb = document.getElementById("clientes");
        for(let i =  0; i <= data.length - 1; i++){
            let tbRow  = document.createElement("tr");
            for (let y = 0; y <= key.length - 1; y++){
                let tbData = document.createElement("td");
                let dados = document.createTextNode(data[i][key[y]]);
                tbData.appendChild(dados);
                tbRow.appendChild(tbData);
            }
            tb.appendChild(tbRow);
        }
    });
});

$(document).on("click", "#clientes tr", function(){
    let nome      = $("td", this).get(0);
    let sobrenome = $("td", this).get(1);
    let cpf       = $("td", this).get(3);

    let nomeCompleto = $(nome).text() + " " + $(sobrenome).text();

    document.getElementById("nomeCliente")["value"] = null;
    document.getElementById("cpfCliente") ["value"] = null;

    document.getElementById("nomeCliente")["value"] = nomeCompleto;
    document.getElementById("cpfCliente") ["value"] = $(cpf).text();

    $("#pesquisaClienteModal").modal("hide");
});
//Código para o Modal de Produto
$(document).on("click", "#descricaoProduto", ()=>{
    $("#pesquisaProdutoModal").modal("show");
});

$(document).on("click", "#buscarProdutoModal", ()=>{
    const url = "/panetteria.searchProduct/" + document.getElementById("dadoProdutoModal")["value"];
    const key = ["tipo", "marca", "descricao", "peso", "preco"];

    fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
        let tb = document.getElementById("produtos");
        for(let i =  0; i <= data.length - 1; i++){
            let tbRow  = document.createElement("tr");
            for (let y = 0; y <= key.length - 1; y++){
                if(data[i][key[y]] == undefined){
                    data[i][key[y]] = "-";
                }
                let tbData = document.createElement("td");
                let dados = document.createTextNode(data[i][key[y]]);
                tbData.appendChild(dados);
                tbRow.appendChild(tbData);
            }
            tb.appendChild(tbRow);
        }
    });
});

$(document).on("click", "#produtos tr", function(){
    let tipo      = $("td", this).get(0);
    let marca     = $("td", this).get(1);
    let descricao = $("td", this).get(2);
    let peso      = $("td", this).get(3);
    let preco     = $("td", this).get(4);

    let produto = $(tipo).text() + " " + $(marca).text() + " " + $(descricao).text() + " " + $(peso).text();

    document.getElementById("descricaoProduto")["value"] = null;
    document.getElementById("descricaoProduto")["value"] = produto;

    $("#pesquisaProdutoModal").modal("hide");
});