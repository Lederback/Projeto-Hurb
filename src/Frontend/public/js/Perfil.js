
$(document).ready(function(){
    var url = "https://projeto-hurb-grupo1.herokuapp.com/getPartnerDataByID/" + localStorage.getItem("id_used"); 

    $.get(url, function(resultado){
        var objeto = JSON.parse(resultado);
        console.log(objeto);
        console.log(Object.keys(objeto).length);
        $("#hotel-name").html(objeto[0].RazaoSocial);
        $("#cnpj-hotel").html(objeto[0].CNPJ);
        $("#cell-hotel").html(objeto[0].Celular);
        $("#email-hotel").html(objeto[0].Email);
        $("#logradouro-hotel").html(objeto[0].Logradouro);
        $("#logradouro-name-hotel").html(objeto[0].NomedoLogradouro);
        $("#neighbourhood-hotel").html(objeto[0].Bairro);
        $("#number-hotel").html(objeto[0].Número);
        $("#zip-hotel").html(objeto[0].CEP);
        $("#state-hotel").html(objeto[0].Estado);
        $("#account-name").html(objeto[0].TitulardaConta);
        $("#account-number").html(objeto[0].NúmerodaConta);
        $("#agency").html(objeto[0].Agência);

    });
});    