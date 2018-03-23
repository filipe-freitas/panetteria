const url = '/panetteria.getProducts';
fetch(url)
.then(response=>response.json())
.then(data=>{
    let tb = document.getElementById('produtos');
    let key = ['id', 'tipo', 'marca', 'preco'];
    for(let i =  0; i <= data.length - 1; i++){
        let tbRow  = document.createElement('tr');
        for (let y = 0; y <= key.length - 1; y++){
            let tbData = document.createElement('td');
            let dados = document.createTextNode(data[i][key[y]]);
            tbData.appendChild(dados);
            tbRow.appendChild(tbData);
            tbRow.setAttribute('id', data[i]._id);
        }
        tb.appendChild(tbRow);
    }
})
.catch((error)=>{
    console.log(error);
});

$(document).on('click', 'tr', function(){
    window.location.href = 'cadastroProduto.html#'+ $(this).closest('tr').attr('id');
});

function cadastrar(){
    document.getElementById('footer').className = 'navbar fixed-bottom bg-success';
    setTimeout(function(){document.getElementById('footer').className = 'navbar fixed-bottom bg-primary'}, 2000);
}