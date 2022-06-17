let searchType = "Estabelecimento";

$(document).ready(function(){
    changeSearchType()

    //Taking ranking info from database.
    $.get("https://projeto-hurb-grupo1.herokuapp.com/getRanking", function(resultado){
        var objeto = JSON.parse(resultado);
        var aux = 1;
        for(i = 0; i < Object.keys(objeto).length; i ++){
            if (aux == 1){
                $("#ranking-table").append(`<tr>
                                                <td class="ranking-table-position">` + (i + 1) + `</td>
                                                <td class="ranking-table-id">` + objeto[i].id + `</td>
                                                <td class="ranking-table-razao">` + objeto[i].RazaoSocial + `</td>
                                                <td class="ranking-table-qtd">` + objeto[i].QuantidadeAntecipacao + `</td>
                                                <td class="ranking-table-total">` + (objeto[i].ValorAntecipado).toFixed(2) + `</td>
                                            </tr>`);
            }
            else{
                $("#ranking-table").append(`<tr>
                                                <td class="ranking-table-position" style="background-color: #F2F2F2">` + (i + 1) + `</td>
                                                <td class="ranking-table-id" style="background-color: #F2F2F2">` + objeto[i].id + `</td>
                                                <td class="ranking-table-razao" style="background-color: #F2F2F2">` + objeto[i].RazaoSocial + `</td>
                                                <td class="ranking-table-qtd" style="background-color: #F2F2F2">` + objeto[i].QuantidadeAntecipacao + `</td>
                                                <td class="ranking-table-total" style="background-color: #F2F2F2">` + (objeto[i].ValorAntecipado).toFixed(2) + `</td>
                                            </tr>`);
            }
            aux = -aux;
        }
    });

    //Taking the general info section from database.
    $.get("https://projeto-hurb-grupo1.herokuapp.com/getGeneralVision", function(resultado){
        var objeto = JSON.parse(resultado);
        $("#total-amount-anticipations").html(objeto[0].TotalDeAntecipações);
        $("#total-amount-advance").html((objeto[0].ValorTotalAntecipado).toFixed(2));
        $("#total-taxed-amount").html((objeto[0].ValorTotalTaxado).toFixed(2));
        $("#most-requested-type").html(objeto[0].TipoMaisAntecipado);
    });
});

function resetTable(){
    $("#search-table").html(`<tr id="partner-list">
                                        <th class="hotel-id" id="left-border-table">ID</th>
                                        <th class="hotel-name">Razão Social</th>
                                        <th class="hotel-state">Estado</th>
                                        <th class="hotel-tel">Telefone</th>
                                        <th class="hotel-more" id="right-border-table"></th>
                                    </tr>
                                    <tr id="invoice-list">
                                        <th class="invoice-note" id="left-border-table">Nota Fiscal</th>
                                        <th class="invoice-partner-id">Esta. ID</th>
                                        <th class="invoice-received-value">Valor Recebido</th>
                                        <th class="invoice-taxed-value">Valor Taxado</th>
                                        <th class="invoice-type">Tipo</th>
                                        <th class="invoice-status">Status</th>
                                        <th class="invoice-date" id="right-border-table">Data</th>
                                    </tr>`);

    switch(document.getElementById("search-type").value){
        case "Estabelecimento":
            searchType = "Estabelecimento";
            $("#partner-list").css("display", "flex");
            $("#invoice-list").css("display", "none");
            break;
        case "Pendentes":
            searchType = "Pendentes";
            $("#partner-list").css("display", "none");
            $("#invoice-list").css("display", "flex");
            break;
        case "Passadas":
            searchType = "Passadas";
            $("#partner-list").css("display", "none");
            $("#invoice-list").css("display", "flex");
            break;
    }
}

function changeSearchType(){
    resetTable();

    switch(document.getElementById("search-type").value){
        case "Estabelecimento":
            searchType = "Estabelecimento";
            showPartnerData();
            $("#partner-list").css("display", "flex");
            $("#invoice-list").css("display", "none");
            break;
        case "Pendentes":
            searchType = "Pendentes";
            showInvoiceData();
            $("#partner-list").css("display", "none");
            $("#invoice-list").css("display", "flex");
            break;
        case "Passadas":
            searchType = "Passadas";
            showPaidInvoiceData();
            $("#partner-list").css("display", "none");
            $("#invoice-list").css("display", "flex");
            break;
    }
}

function showInvoiceData(){
    $.get("https://projeto-hurb-grupo1.herokuapp.com/getInvoiceData", function(resultado){
        var objeto = JSON.parse(resultado);
        var aux = 1;
        for(i = 0; i < Object.keys(objeto).length; i ++){
            if(aux == 1){
                $("#search-table").append(`<tr id="invoice-list">
                                                <td class="invoice-note">` + objeto[i].NotaFiscal + `</td>
                                                <td class="invoice-partner-id">` + objeto[i].IDdoParceiro + `</td>
                                                <td class="invoice-received-value">` + (objeto[i].ValorRecebido).toFixed(2) + `</td>
                                                <td class="invoice-taxed-value">` + (objeto[i].ValorTaxado).toFixed(2) + `</td>
                                                <td class="invoice-type">` + objeto[i].TipoAntecipação + `</td>
                                                <td class="invoice-status">` + objeto[i].Status + `</td>
                                                <td class="invoice-date">` + objeto[i].Data + `</td>
                                            </tr>`);
            }
            else{
                console.log("result");
                $("#search-table").append(`<tr id="invoice-list">
                                                <td class="invoice-note" style="background-color: #F2F2F2">` + objeto[i].NotaFiscal + `</td>
                                                <td class="invoice-partner-id" style="background-color: #F2F2F2">` + objeto[i].IDdoParceiro + `</td>
                                                <td class="invoice-received-value" style="background-color: #F2F2F2">` + (objeto[i].ValorRecebido).toFixed(2) + `</td>
                                                <td class="invoice-taxed-value" style="background-color: #F2F2F2">` + (objeto[i].ValorTaxado).toFixed(2) + `</td>
                                                <td class="invoice-type" style="background-color: #F2F2F2">` + objeto[i].TipoAntecipação + `</td>
                                                <td class="invoice-status" style="background-color: #F2F2F2">` + objeto[i].Status + `</td>
                                                <td class="invoice-date" style="background-color: #F2F2F2">` + objeto[i].Data + `</td>
                                            </tr>`);
            }
            
            aux = -aux;
        }
        $("#invoice-list").css("display", "flex");
    });
}

function showPaidInvoiceData(){
    $.get("https://projeto-hurb-grupo1.herokuapp.com/getPaidInvoiceData", function(resultado){
        var objeto = JSON.parse(resultado);
        var aux = 1;
        for(i = 0; i < Object.keys(objeto).length; i ++){
            if(aux == 1){
                $("#search-table").append(`<tr id="invoice-list">
                                                <td class="invoice-note">` + objeto[i].NotaFiscal + `</td>
                                                <td class="invoice-partner-id">` + objeto[i].IDdoParceiro + `</td>
                                                <td class="invoice-received-value">` + (objeto[i].ValorRecebido).toFixed(2) + `</td>
                                                <td class="invoice-taxed-value">` + (objeto[i].ValorTaxado).toFixed(2) + `</td>
                                                <td class="invoice-type">` + objeto[i].TipoAntecipação + `</td>
                                                <td class="invoice-status">` + objeto[i].Status + `</td>
                                                <td class="invoice-date">` + objeto[i].Data + `</td>
                                            </tr>`);
            }
            else{
                console.log("result");
                $("#search-table").append(`<tr id="invoice-list">
                                                <td class="invoice-note" style="background-color: #F2F2F2">` + objeto[i].NotaFiscal + `</td>
                                                <td class="invoice-partner-id" style="background-color: #F2F2F2">` + objeto[i].IDdoParceiro + `</td>
                                                <td class="invoice-received-value" style="background-color: #F2F2F2">` + (objeto[i].ValorRecebido).toFixed(2) + `</td>
                                                <td class="invoice-taxed-value" style="background-color: #F2F2F2">` + (objeto[i].ValorTaxado).toFixed(2) + `</td>
                                                <td class="invoice-type" style="background-color: #F2F2F2">` + objeto[i].TipoAntecipação + `</td>
                                                <td class="invoice-status" style="background-color: #F2F2F2">` + objeto[i].Status + `</td>
                                                <td class="invoice-date" style="background-color: #F2F2F2">` + objeto[i].Data + `</td>
                                            </tr>`);
            }

            aux = -aux;
        }
        $("#invoice-list").css("display", "flex");
    });
}

function showPartnerData(){
    $.get("https://projeto-hurb-grupo1.herokuapp.com/getPartnerData", function(resultado){
        var objeto = JSON.parse(resultado);
        var aux = 1;
        for(i = 0; i < Object.keys(objeto).length; i ++){
            if (aux == 1){
                $("#search-table").append(`<tr id="partner-list">
                                                <td class="hotel-id">`+ objeto[i].id + `</td>
                                                <td class="hotel-name">` + objeto[i].RazaoSocial + `</td>
                                                <td class="hotel-state">` + objeto[i].Estado + `</td>
                                                <td class="hotel-tel">` + objeto[i].Celular + `</td>
                                                <td class="hotel-more"><a href="Detalhes do Hotel.html" onclick="sendID(` + objeto[i].id + `)">Ver Mais</a></td>
                                            </tr>`);
            }
            else{
                $("#search-table").append(`<tr id="partner-list">
                                                <td class="hotel-id" style="background-color: #F2F2F2">`+ objeto[i].id + `</td>
                                                <td class="hotel-name" style="background-color: #F2F2F2">` + objeto[i].RazaoSocial + `</td>
                                                <td class="hotel-state" style="background-color: #F2F2F2">` + objeto[i].Estado + `</td>
                                                <td class="hotel-tel" style="background-color: #F2F2F2">` + objeto[i].Celular + `</td>
                                                <td class="hotel-more" style="background-color: #F2F2F2"><a href="Detalhes do Hotel.html" onclick="sendID(` + objeto[0].id + `)" style="background-color: #F2F2F2">Ver Mais</a></td>
                                            </tr>`);
            }
            
            aux = -aux;
        }
    });
}

function showSearch(){
    resetTable();

    switch(document.getElementById("search-type").value){
        case "Estabelecimento":
            var url = "https://projeto-hurb-grupo1.herokuapp.com/getPartnerDataByID/" + $("#search-text").val();

            $.get(url, function(resultado){
                var objeto = JSON.parse(resultado);

                $("#search-table").append(`<tr id="partner-list">
                                                    <td class="hotel-id">`+ objeto[0].id + `</td>
                                                    <td class="hotel-name">` + objeto[0].RazaoSocial + `</td>
                                                    <td class="hotel-state">` + objeto[0].Estado + `</td>
                                                    <td class="hotel-tel">` + objeto[0].Celular + `</td>
                                                    <td class="hotel-more"><a href="Detalhes do Hotel.html" onclick="sendID(` + objeto[0].id + `)">Ver Mais</a></td>
                                            </tr>`);
            });
            break;
        case "Pendentes":
            var url = "https://projeto-hurb-grupo1.herokuapp.com/getInvoiceDataByNf/" + $("#search-text").val();

            console.log(url);

            $.get(url, function(resultado){
                var objeto = JSON.parse(resultado);

                $("#search-table").append(`<tr id="invoice-list">
                                                    <td class="invoice-note">` + objeto[0].NotaFiscal + `</td>
                                                    <td class="invoice-partner-id">` + objeto[0].IDdoParceiro + `</td>
                                                    <td class="invoice-received-value">` + (objeto[0].ValorRecebido).toFixed(2) + `</td>
                                                    <td class="invoice-taxed-value">` + (objeto[0].ValorTaxado).toFixed(2) + `</td>
                                                    <td class="invoice-type">` + objeto[0].TipoAntecipação + `</td>
                                                    <td class="invoice-status">` + objeto[0].Status + `</td>
                                                    <td class="invoice-date">` + objeto[0].Data + `</td>
                                                </tr>`);

                $("#invoice-list").css("display", "flex");
            });
            break;
        case "Passadas":
            var url = "https://projeto-hurb-grupo1.herokuapp.com/getPaidInvoiceDataByNf/" + $("#search-text").val();

            $.get(url, function(resultado){
                var objeto = JSON.parse(resultado);

                $("#search-table").append(`<tr id="invoice-list">
                                                    <td class="invoice-note">` + objeto[0].NotaFiscal + `</td>
                                                    <td class="invoice-partner-id">` + objeto[0].IDdoParceiro + `</td>
                                                    <td class="invoice-received-value">` + (objeto[0].ValorRecebido).toFixed(2) + `</td>
                                                    <td class="invoice-taxed-value">` + (objeto[0].ValorTaxado).toFixed(2) + `</td>
                                                    <td class="invoice-type">` + objeto[0].TipoAntecipação + `</td>
                                                    <td class="invoice-status">` + objeto[0].Status + `</td>
                                                    <td class="invoice-date">` + objeto[0].Data + `</td>
                                                </tr>`);

                $("#invoice-list").css("display", "flex");
            });
            break;
    }
}

function sendID(id){
    sessionStorage.clear();
    sessionStorage.setItem("idHurb", id);
}