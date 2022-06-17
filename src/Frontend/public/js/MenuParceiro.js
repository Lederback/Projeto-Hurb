function changePage(index){
    switch (index){
        case 0:
            window.location = 'SolicitaçãoAntecipação.html';
            break;
        case 1:
            window.location = 'HistoricoSolicitacao.html';
            break;
        case 2:
            window.location = 'EditarPerfil.html';
            break;
    }
}

$(document).ready(function(){
    var url = "http://127.0.0.1:5555/getPartnerDataByID/" + localStorage.getItem("id_used"); 
    $.get(url, function(resultado){
        var objeto = JSON.parse(resultado);
        console.log(objeto);
        console.log(Object.keys(objeto).length);
        $("#nome").html("Olá " + objeto[0].RazaoSocial + ", seja bem-vindo!");
    });
});    
