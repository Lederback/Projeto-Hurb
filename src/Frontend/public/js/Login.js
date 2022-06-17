function checkLogin(){ 
    var EMAIL = $("#log").val();
    var PASSWORD = $("#pass").val(); 

    var url = "http://127.0.0.1:5555/checkLogin/" + EMAIL;   

    $.get(url, function(resultado){
        
        var objeto = JSON.parse(resultado);
        console.log(objeto);
        console.log(objeto[0].Estabelecimento_id);
        //console.log(Object.keys(objeto).length);
        
        localStorage.clear();
        localStorage.setItem("id_used", objeto[0].Estabelecimento_id);
        

        if(objeto[0].Senha == PASSWORD){loadPage(objeto[0].Estabelecimento_id);}
       
    });
}

function loadPage (id) {
    if(id){location.replace("MenuParceiro.html");}

    else{location.replace("MenuAdmin.html");}
}