console.log(localStorage.getItem("idHurb"));

$(document).ready(function(){ //organiza os dados do estabelecimento na tela de "Detalhes do Hotel", na área do admin
    //Taking ranking info from database.
    var url = "https://projeto-hurb-grupo1.herokuapp.com/getPartnerDataByID/" + localStorage.getItem("idHurb");

    $.get(url, function(resultado){
        var objeto = JSON.parse(resultado);
        console.log(objeto)
        $("#id-info").html(objeto[0].id);
        $("#name-info").html(objeto[0].RazaoSocial);
        $("#cel-info").html(objeto[0].Celular);
        $("#email-info").html(objeto[0].Email);
        $("#logradouro-info").html(objeto[0].Logradouro);
        $("#logradouro-name-info").html(objeto[0].NomedoLogradouro);
        $("#number-info").html(objeto[0].Número);
        $("#neighbourhood-info").html(objeto[0].Bairro);
        $("#state-info").html(objeto[0].Estado);
        $("#zip-info").html(objeto[0].CEP);
        $("#account-name-info").html(objeto[0].TitulardaConta);
        $("#account-number-info").html(objeto[0].NúmerodaConta);
        $("#agency-info").html(objeto[0].Agência);
    });
});
