function checkLogin(){ 
    var EMAIL = $("#log").val();
    var PASSWORD = $("#pass").val(); 

    var url = "https://projeto-hurb-grupo1.herokuapp.com/checkLogin/" + EMAIL;   

    $.get(url, function(resultado){
        
        var objeto = JSON.parse(resultado);
        console.log(objeto);
        console.log(objeto[0].Estabelecimento_id);
        //console.log(Object.keys(objeto).length);
        
        sessionStorage.clear();
        sessionStorage.setItem("id_used", objeto[0].Estabelecimento_id);
        

        if(objeto[0].Senha == PASSWORD){loadPage(objeto[0].Estabelecimento_id);}
       
    });
}

function loadPage (id) {
    if(id){location.replace("MenuParceiro.html");}

    else{location.replace("MenuAdmin.html");}
}