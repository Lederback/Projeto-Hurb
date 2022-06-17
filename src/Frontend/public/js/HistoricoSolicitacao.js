$(document).ready(function(){
    var url1 = "http://127.0.0.1:5555/getInvoiceDataForPartner/" + localStorage.getItem("id_used");
    var url2 = "http://127.0.0.1:5555/getPaidInvoiceDataForPartner/" + localStorage.getItem("id_used");

    //Taking ranking info from database.
    $.get(url1, function(resultado){
        var objeto = JSON.parse(resultado);
        console.log(objeto)
        var aux = 1;
        for(i = 0; i < Object.keys(objeto).length; i ++){
            if (aux == 1){
                $("#pending-table").append(`<tr>
                                                <td class="nf">` + objeto[i].NotaFiscal + `</td>
                                                <td class="total-value">` + (objeto[i].ValorRecebido).toFixed(2) + `</td>
                                                <td class="receive-value">` + (objeto[i].ValorTaxado).toFixed(2) + `</td>
                                                <td class="antecipation-type">` + objeto[i].TipoAntecipação + `</td>
                                                <td class="date">` + objeto[i].Data + `</td>
                                                <td class="status">` + objeto[i].Status + `</td>
                                                <td class="details"><button onclick="modal(` + objeto[i].id + `)" type="button" class="btn" data-toggle="modal" data-target="#modal-hist">Mais detalhes</button></td>
                                            </tr>`);
            }
            else{
                $("#pending-table").append(`<tr>
                                                <td class="nf" style="background-color: #F2F2F2">` + objeto[i].NotaFiscal + `</td>
                                                <td class="total-value" style="background-color: #F2F2F2">` + (objeto[i].ValorRecebido).toFixed(2) + `</td>
                                                <td class="receive-value" style="background-color: #F2F2F2">` + (objeto[i].ValorTaxado).toFixed(2) + `</td>
                                                <td class="antecipation-type" style="background-color: #F2F2F2">` + objeto[i].TipoAntecipação + `</td>
                                                <td class="date" style="background-color: #F2F2F2">` + objeto[i].Data + `</td>
                                                <td class="status" style="background-color: #F2F2F2">` + objeto[i].Status + `</td>
                                                <td class="details" style="background-color: #F2F2F2"><button onclick="modal(` + objeto[i].id + `)" type="button" class="btn" data-toggle="modal" data-target="#modal-hist">Mais detalhes</button></td>
                                            </tr>`);
            }

            aux = -aux;
        }
    });

    $.get(url2, function(resultado){
        var objeto = JSON.parse(resultado);
        aux = 1;
        for(i = 0; i < Object.keys(objeto).length; i ++){
            if (aux == 1){
                $("#past-table").append(`<tr>
                                            <td class="nf">` + objeto[i].NotaFiscal + `</td>
                                            <td class="total-value">` + (objeto[i].ValorRecebido).toFixed(2) + `</td>
                                            <td class="receive-value">` + (objeto[i].ValorTaxado).toFixed(2) + `</td>
                                            <td class="antecipation-type">` + objeto[i].TipoAntecipação + `</td>
                                            <td class="date">` + objeto[i].Data + `</td>
                                            <td class="status">` + objeto[i].Status + `</td>
                                            <td class="details"><button onclick="modal(` + objeto[i].id + `)" type="button" class="btn" data-toggle="modal" data-target="#modal-hist">Mais detalhes</button></td>
                                        </tr>`);
            }
            else{
                $("#past-table").append(`<tr>
                                            <td class="nf" style="background-color: #F2F2F2">` + objeto[i].NotaFiscal + `</td>
                                            <td class="total-value" style="background-color: #F2F2F2">` + (objeto[i].ValorRecebido).toFixed(2) + `</td>
                                            <td class="receive-value" style="background-color: #F2F2F2">` + (objeto[i].ValorTaxado).toFixed(2) + `</td>
                                            <td class="antecipation-type" style="background-color: #F2F2F2">` + objeto[i].TipoAntecipação + `</td>
                                            <td class="date" style="background-color: #F2F2F2">` + objeto[i].Data + `</td>
                                            <td class="status" style="background-color: #F2F2F2">` + objeto[i].Status + `</td>
                                            <td class="details" style="background-color: #F2F2F2"><button onclick="modal(` + objeto[i].id + `)" type="button" class="btn" data-toggle="modal" data-target="#modal-hist">Mais detalhes</button></td>
                                        </tr>`);
            }

            aux = -aux;
        }
    });
});



function modal(idFatura) {
    $("#modal-table").html(`<tr>
                                <th class="id-modal" id="left-border-table">ID da Reserva</th>
                                <th class="id-invoice-modal">ID da Fatura</th>
                                <th class="value-modal">Valor</th>
                                <th class="checkin-modal">Data do Check-in</th>
                                <th class="checkout-modal" id="right-border-table">Data do Check-out</th>
                            </tr>`);

    var url = "http://127.0.0.1:5555/getReservasFaturadas/" + idFatura;
    console.log(idFatura)

    $.get(url, function(resultado){
        var objeto = JSON.parse(resultado);

        console.log(objeto)

        var aux = 1;
        for(i = 0; i < Object.keys(objeto).length; i ++){
            if (aux == 1){
                $("#modal-table").append(`<tr>
                                                <td class="id-modal">` + objeto[i].ID + `</td>
                                                <td class="id-invoice-modal">` + (objeto[i].IDFatura) + `</td>
                                                <td class="value-modal">` + (objeto[i].Valor).toFixed(2) + `</td>
                                                <td class="checkin-modal">` + objeto[i].DataEntrada + `</td>
                                                <td class="checkout-modal">` + objeto[i].DataSaida + `</td>
                                            </tr>`);
            }
            else{
                $("#modal-table").append(`<tr>
                                                <td class="id-modal" style="background-color: #F2F2F2">` + objeto[i].ID + `</td>
                                                <td class="id-invoice-modal" style="background-color: #F2F2F2">` + (objeto[i].IDFatura) + `</td>
                                                <td class="value-modal" style="background-color: #F2F2F2">` + (objeto[i].Valor).toFixed(2) + `</td>
                                                <td class="checkin-modal" style="background-color: #F2F2F2">` + objeto[i].DataEntrada + `</td>
                                                <td class="checkout-modal" style="background-color: #F2F2F2">` + objeto[i].DataSaida + `</td>
                                            </tr>`);
            }
    
            aux = -aux;
        }
    });    
}