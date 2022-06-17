var tpAnt = 0;
var taxado = 0;
var recebido = 0;
var idFatura = 0;

function calc(taxa) {
    var montant = parseFloat(document.getElementById("valores").value);
    taxado = montant * taxa;
    recebido = montant - taxado;
    taxado = taxado.toFixed(2);
    recebido = recebido.toFixed(2);
    document.getElementById("receberá").innerHTML = "Você receberá: R$ " + recebido;
    document.getElementById("taxado").innerHTML = "Foi taxado: R$ " + taxado;
    if (taxa == 0.12) {
        tpAnt = 1;
    }
    if (taxa == 0.09) {
        tpAnt = 2;
    }
    if (taxa == 0.06) {
        tpAnt = 3;
    }
    if (taxa == 0) {
        tpAnt = 4;
    }
    console.log(tpAnt)
}

let allReservas = 0;
let minInvoicedReservations = [];
let maxInvoicedReservations = [];
var value = 0;
var minValue = 0;
var max = 0;

function getAllReservations() {
    var url = "https://projeto-hurb-grupo1.herokuapp.com/getReservasNaoFaturadas/" + sessionStorage.getItem("id_used");

    $.get(url, function (resultado) {
        var objeto = JSON.parse(resultado)

        allReservas = objeto;
    })
}

function simulate() {
    var montante = parseFloat(document.getElementById("montante").value);
    var count = -1;
    minInvoicedReservations = [];
    maxInvoicedReservations = [];
    value = 0;
    minValue = 0;

    if (montante != null) {
        if (montante > max) {
            document.getElementById("min-value").innerHTML = "Você não tem esse valor para faturar";
        }
        else if (montante >= allReservas[0].Valor) {
            while (value < montante) {
                count++;
                if (count <= allReservas.length) {
                    minInvoicedReservations.push(allReservas[count]);
                    maxInvoicedReservations.push(allReservas[count]);
                    value += allReservas[count].Valor;
                }
            }

            if (value > montante) {
                minValue = value - allReservas[count].Valor;
                minInvoicedReservations.pop();
                document.getElementById("min-value").innerHTML = "Valores mais próximos possiveis são:" + `<br>` + `<select id="valores" name="valores">  ` + `<option value="` + minValue.toFixed(2) + `">` + minValue.toFixed(2) + `</option>` + `<br>` + `<option value="` + value.toFixed(2) + `">` + value.toFixed(2) + `</option>` + `</select>`;
                var options = document.querySelector(".choose");
                options.style.display = 'block'
            }
            else if (value == montante) {
                var options = document.querySelector(".choose");
                options.style.display = 'block'
                document.getElementById("min-value").innerHTML = "Valor válido" + `<select id="valores" name="valores" style="display: none">` + `<option selected="selected" value="` + montante + `">` + `</option>` + `</select>`
            }
        }
        else {
            document.getElementById("min-value").innerHTML = `Valor mínimo a se retirar é ${allReservas[0].Valor.toFixed(2)}`
        }
    }
}

$(document).ready(function () {
    var url = "https://projeto-hurb-grupo1.herokuapp.com/getValorReservasNaoFaturadas/" + sessionStorage.getItem("id_used");

    $.get(url, function (resultado) {
        var objeto = JSON.parse(resultado)
        max = objeto[0].Valor;

        for (i = 0; i < Object.keys(objeto).length; i++) {
            $('#saldo').html("R$ " + (objeto[i].Valor).toFixed(2))
            $('#valMax').html("R$ " + (objeto[i].Valor).toFixed(2))
        }
    })

    getTotalFatura();

    getAllReservations();
})

function confirmar() {
    $.ajax({
        type: 'POST',
        url: "https://projeto-hurb-grupo1.herokuapp.com/postInvoiceData",
        data: {
            EstabelecimentoID: sessionStorage.getItem("id_used"),
            TipoAntecipacaoID: tpAnt,
            NotaFiscal: 231521,
            ValorRecebido: recebido,
            ValorTaxado: taxado,
            Data: "10/06/22",
            Status: "A Pagar"
        }
    }).done(function () {
        console.log("enviado com sucesso");
    })

    var reservation = [];
    var teste = parseFloat(document.getElementById("valores").value);
    var teste2 = parseFloat(document.getElementById("montante").value);

    if (teste > teste2) {
        reservation = maxInvoicedReservations;
    }
    else {
        reservation = minInvoicedReservations;
    }

    var id = idFatura + 1;
    var contador = 0;

    updateAmountData();

    while (contador < reservation.length) {
        changeReservationFaturaId(id, reservation[contador].ID);
        contador++;
    }
}

function changeReservationFaturaId(fatura, reserva) {
    $.ajax({
        type: 'POST',
        url: "https://projeto-hurb-grupo1.herokuapp.com/postReservationData",
        data: {
            FaturaID: fatura,
            ReservaID: reserva
        }
    }).done(function () {
        console.log("enviado com sucesso");
    })
}

function updateAmountData() {
    $.ajax({
        type: 'POST',
        url: "https://projeto-hurb-grupo1.herokuapp.com/postTypeData",
        data: {
            TipoAntecipacaoID: tpAnt
        }
    }).done(function () {
        console.log("enviado com sucesso");
    })

    $.ajax({
        type: 'POST',
        url: "https://projeto-hurb-grupo1.herokuapp.com/postPartnerData",
        data: {
            id: sessionStorage.getItem("id_used")
        }
    }).done(function () {
        console.log("enviado com sucesso");
    })
}

function getTotalFatura() {
    var url = "https://projeto-hurb-grupo1.herokuapp.com/getTotalFatura";

    $.get(url, function (resultado) {
        idFatura = resultado[0].FaturaID;
    })
}

function addTable() {
    $("#table").html(`<tr>
                        <th>ID</th>
                        <th>Valor</th>
                        <th>Data de Check-in</th>
                        <th>Data de Check-out</th>
                    </tr>`);
    var reservation = [];
    var teste = parseFloat(document.getElementById("valores").value);
    var teste2 = parseFloat(document.getElementById("montante").value);

    if (teste > teste2) {
        reservation = maxInvoicedReservations;
    }
    else {
        reservation = minInvoicedReservations;
    }

    for (i = 0; i < reservation.length; i++) {
        $("#table").append(`<tr>
                                <td>` + reservation[i].ID + `</td>
                                <td>` + reservation[i].Valor + `</td>
                                <td>` + reservation[i].DataEntrada + `</td>
                                <td>` + reservation[i].DataSaida + `</td>
                            </tr>`);
    }
}