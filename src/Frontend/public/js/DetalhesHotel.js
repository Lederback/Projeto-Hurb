console.log(localStorage.getItem("idHurb"));

$(document).ready(function(){
    //Taking ranking info from database.
    var url = "https://projeto-hurb-grupo1.herokuapp.com/getPartnerDataByID/" + localStorage.getItem("idHurb");

    $.get(url, function(resultado){
        var objeto = JSON.parse(resultado);
        console.log(objeto)
        
        $(".details").append(`<h2>Dados Gerais</h2>
                                <h3>ID</h3>
                                <span>` + objeto[0].id + `</span>

                                <h3>Razão Social</h3>
                                <span>` + objeto[0].RazaoSocial + `</span>

                                <h3>Celular</h3>
                                <span>` + objeto[0].Celular + `</span>

                                <h3>Email</h3>
                                <span>` + objeto[0].Email + `</span>

                                <h3>Logradouro</h3>
                                <span>` + objeto[0].Logradouro + " " + objeto[0].NomedoLogradouro + `</span>

                                <h3>Número</h3>
                                <span>` + objeto[0].Número + `</span>

                                <h3>Bairro</h3>
                                <span>` + objeto[0].Bairro + `</span>

                                <h3>Estado</h3>
                                <span>` + objeto[0].Estado + `</span>

                                <h3>CEP</h3>
                                <span>` + objeto[0].CEP + `</span>

                                <h2>Dados Bancários</h2>
                                <h3>Titular Da Conta</h3>
                                <span>` + objeto[0].TitulardaConta + `</span>

                                <h3>Número da Conta</h3>
                                <span>` + objeto[0].NúmerodaConta + `</span>
                                
                                <h3>Agência</h3>
                                <span>` + objeto[0].Agência + `</span>`);
    });
});
