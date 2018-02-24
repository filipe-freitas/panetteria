const url = '/api.panetteria.clientes';
fetch(url)
.then(response=>response.json())
.then(data=>{
    let tb = document.getElementById('clientes');
    for(let i =  0; i <= data.length; i++){
        let tbRow  = document.createElement('tr');
        for (let key in data[i]){
            let tbData = document.createElement('td');
            if(data[i].hasOwnProperty(key)){
                let dados = document.createTextNode(data[i][key]);
                tbData.appendChild(dados);
                tbRow.appendChild(tbData);
                tbRow.setAttribute('id', data[i].id);
            }
        }
        tb.appendChild(tbRow);
    }
})
.catch((error)=>{
    console.log(error);
});

$(document).on('click', 'tr', function(){
    window.location = 'api.panetteria.cliente/' + $(this).closest('tr').attr('id');
});

function cadastrar(){
    document.getElementById('footer').className = 'navbar fixed-bottom bg-success';
    setTimeout(function(){document.getElementById('footer').className = 'navbar fixed-bottom bg-primary'}, 2000);
}