










function logar(){
    var vsNome  = document.getElementById('username').value;
    let vsSenha = document.getElementById('password').value;
    if(vsNome.toUpperCase() == 'FILIPE' && vsSenha == 'teste'){
        document.getElementById('footer').className = 'navbar fixed-bottom bg-success';
        setTimeout(function(){
            document.getElementById('footer').className = 'navbar fixed-bottom bg-primary';
            window.open("index.html", "_self");
        }, 2000);
    }else{
        document.getElementById('footer').className = 'navbar fixed-bottom bg-danger';
        setTimeout(function(){document.getElementById('footer').className = 'navbar fixed-bottom bg-primary'}, 2000);
    }
}