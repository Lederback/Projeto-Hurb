const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'src/Backend/DataBase/BancoHurb.db';

const port = process.env.PORT || 5555;

app.use(express.static("src/Frontend/public"));
app.use(express.static("src/Frontend/public/html"));

app.listen(port, () => {
	console.log(`Server running at :${port}/`);
});

app.get('/serverStatus')

app.get('/getInvoiceDataForPartner/:id', (req, res) => { //pega as faturas não finalizadas do hotel que esta "logado"
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	const { id } = req.params;

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT
					Fatura.id,
					TipoAntecipacao.Nome AS TipoAntecipação,
					Fatura.NotaFiscal AS NotaFiscal,
					Fatura.ValorRecebido as ValorRecebido,
					Fatura.ValorTaxado as ValorTaxado,
					Fatura.Data as Data,
					Fatura.Status as Status
                FROM Fatura
                    INNER JOIN TipoAntecipacao ON TipoAntecipacao.id = Fatura.TipoAntecipacao_id
				WHERE Fatura.Status != "Finalizado" AND Fatura.Estabelecimento_id = ?`;

	db.all(sql, id, (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(JSON.stringify(rows));
	});
	db.close(); // Fecha o banco
});

app.get('/getInvoiceData', (req, res) => { //Pega todas as faturas não finalizadas
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT
                    Fatura.id,
					Estabelecimento.id AS IDdoParceiro,
					Estabelecimento.Razao AS NomeDoParceiro,
					TipoAntecipacao.Nome AS TipoAntecipação,
					Fatura.NotaFiscal AS NotaFiscal,
					Fatura.ValorRecebido as ValorRecebido,
					Fatura.ValorTaxado as ValorTaxado,
					Fatura.Data as Data,
					Fatura.Status as Status
                FROM Fatura
                    INNER JOIN Estabelecimento ON Estabelecimento.id = Fatura.Estabelecimento_id
                    INNER JOIN TipoAntecipacao ON TipoAntecipacao.id = Fatura.TipoAntecipacao_id
				WHERE Fatura.Status != "Finalizado"`;

	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(JSON.stringify(rows));
	});
	db.close(); // Fecha o banco
});

app.get('/getInvoiceDataByNf/:nf', (req, res) => { //filtro para pesquisas do admin, pesquisando pelo id da fatura
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	const { nf } = req.params;

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT
                    Fatura.id,
					Estabelecimento.id AS IDdoParceiro,
					Estabelecimento.Razao AS NomeDoParceiro,
					TipoAntecipacao.Nome AS TipoAntecipação,
					Fatura.NotaFiscal AS NotaFiscal,
					Fatura.ValorRecebido as ValorRecebido,
					Fatura.ValorTaxado as ValorTaxado,
					Fatura.Data as Data,
					Fatura.Status as Status
                FROM Fatura
                    INNER JOIN Estabelecimento ON Estabelecimento.id = Fatura.Estabelecimento_id
                    INNER JOIN TipoAntecipacao ON TipoAntecipacao.id = Fatura.TipoAntecipacao_id
				WHERE Fatura.Status != "Finalizado" AND Fatura.NotaFiscal = ?`;

	db.all(sql, nf, (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(JSON.stringify(rows));
	});
	db.close(); // Fecha o banco
});

app.get('/getPaidInvoiceData', (req, res) => { //pega todas as faturas finalizadas
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT
                    Fatura.id,
					Estabelecimento.id AS IDdoParceiro,
					Estabelecimento.Razao AS NomeDoParceiro,
					TipoAntecipacao.Nome AS TipoAntecipação,
					Fatura.NotaFiscal AS NotaFiscal,
					Fatura.ValorRecebido as ValorRecebido,
					Fatura.ValorTaxado as ValorTaxado,
					Fatura.Data as Data,
					Fatura.Status as Status
                FROM Fatura
                    INNER JOIN Estabelecimento ON Estabelecimento.id = Fatura.Estabelecimento_id
                    INNER JOIN TipoAntecipacao ON TipoAntecipacao.id = Fatura.TipoAntecipacao_id
				WHERE Fatura.Status = "Finalizado"`;

	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(JSON.stringify(rows));
	});
	db.close(); // Fecha o banco
});

app.get('/getPaidInvoiceDataForPartner/:id', (req, res) => { //pega faturas ja finalizadas, filtrando de acordo com o id do hotel
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	const { id } = req.params;

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT
					Fatura.id,
					TipoAntecipacao.Nome AS TipoAntecipação,
					Fatura.NotaFiscal AS NotaFiscal,
					Fatura.ValorRecebido as ValorRecebido,
					Fatura.ValorTaxado as ValorTaxado,
					Fatura.Data as Data,
					Fatura.Status as Status
                FROM Fatura
                    INNER JOIN TipoAntecipacao ON TipoAntecipacao.id = Fatura.TipoAntecipacao_id
				WHERE Fatura.Status = "Finalizado" AND Fatura.Estabelecimento_id = ?`;

	db.all(sql, id, (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(JSON.stringify(rows));
	});
	db.close(); // Fecha o banco
});

app.get('/getPaidInvoiceDataByNf/:nf', (req, res) => { //pega faturas ja finalizadas, filtrando de acordo com o id da fatura
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	const { nf } = req.params;

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT
                    Fatura.id,
					Estabelecimento.id AS IDdoParceiro,
					Estabelecimento.Razao AS NomeDoParceiro,
					TipoAntecipacao.Nome AS TipoAntecipação,
					Fatura.NotaFiscal AS NotaFiscal,
					Fatura.ValorRecebido as ValorRecebido,
					Fatura.ValorTaxado as ValorTaxado,
					Fatura.Data as Data,
					Fatura.Status as Status
                FROM Fatura
                    INNER JOIN Estabelecimento ON Estabelecimento.id = Fatura.Estabelecimento_id
                    INNER JOIN TipoAntecipacao ON TipoAntecipacao.id = Fatura.TipoAntecipacao_id
				WHERE Fatura.Status = "Finalizado" AND Fatura.NotaFiscal = ?`;

	db.all(sql, nf, (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(JSON.stringify(rows));
	});
	db.close(); // Fecha o banco
});

app.get('/getRanking', (req, res) => { //pega as informações das quantidades de antecipações de cada hotel, montando o ranking em ordem decrescente
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT
					Estabelecimento.id,
					Estabelecimento.Razao AS RazaoSocial,
					Estabelecimento.QuantidadeAntecipacao AS QuantidadeAntecipacao,
					(SELECT SUM(Fatura.ValorRecebido) FROM Fatura WHERE Fatura.Estabelecimento_id = Estabelecimento.id) AS ValorAntecipado
				FROM Estabelecimento
				ORDER BY Estabelecimento.QuantidadeAntecipacao DESC`;

	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(JSON.stringify(rows));
	});
	db.close(); // Fecha o banco
});

app.get('/getGeneralVision', (req, res) => { //pega as informações do dashboard da pagina principal do admin
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT
					(SELECT SUM(Estabelecimento.QuantidadeAntecipacao) FROM Estabelecimento) As TotalDeAntecipações,
					SUM(Fatura.ValorRecebido) As ValorTotalAntecipado,
					SUM(Fatura.ValorTaxado) As ValorTotalTaxado,
					(SELECT TipoAntecipacao.Nome FROM TipoAntecipacao WHERE TipoAntecipacao.Quantidade = (SELECT MAX(TipoAntecipacao.Quantidade) FROM TipoAntecipacao)) As TipoMaisAntecipado
				FROM Fatura`;

	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(JSON.stringify(rows));
	});
	db.close(); // Fecha o banco
});

app.get('/getPartnerData', (req, res) => { //pega as informações do parceiro para a página de detalhes do hotel por parte do admin
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT
					Estabelecimento.id,
                    Estabelecimento.Razao AS RazaoSocial,
                    Estabelecimento.CNPJ AS CNPJ,
                    Estabelecimento.Celular AS Celular,
                    Estabelecimento.QuantidadeAntecipacao AS QuantidadeAntecipação,
                    Login.Email AS Email,
                    Endereco.Logradouro AS Logradouro,
                    Endereco.Nome AS NomedoLogradouro,
                    Endereco.Numero AS Número,
                    Endereco.Bairro AS Bairro,
                    Endereco.Estado AS Estado,
                    Endereco.CEP AS CEP,
                    ContaBancaria.TitularDaConta AS TitulardaConta,
                    ContaBancaria.NumeroDaConta AS NúmerodaConta,
                    ContaBancaria.Agencia AS Agência
                FROM Estabelecimento
                    INNER JOIN Login ON Login.Estabelecimento_id = Estabelecimento.id
                    INNER JOIN Endereco ON Endereco.Estabelecimento_id = Estabelecimento.id
                    INNER JOIN ContaBancaria ON ContaBancaria.Estabelecimento_id = Estabelecimento.id;`;

	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(JSON.stringify(rows));
	});
	db.close(); // Fecha o banco
});

app.get('/getPartnerDataByID/:id', (req, res) => { //pega as informações do parceiro para a página de detalhes do hotel por parte do hoteleiro
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	const { id } = req.params;

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT
					Estabelecimento.id,
                    Estabelecimento.Razao AS RazaoSocial,
                    Estabelecimento.CNPJ AS CNPJ,
                    Estabelecimento.Celular AS Celular,
                    Estabelecimento.QuantidadeAntecipacao AS QuantidadeAntecipação,
                    Login.Email AS Email,
                    Endereco.Logradouro AS Logradouro,
                    Endereco.Nome AS NomedoLogradouro,
                    Endereco.Numero AS Número,
                    Endereco.Bairro AS Bairro,
                    Endereco.Estado AS Estado,
                    Endereco.CEP AS CEP,
                    ContaBancaria.TitularDaConta AS TitulardaConta,
                    ContaBancaria.NumeroDaConta AS NúmerodaConta,
                    ContaBancaria.Agencia AS Agência
                FROM Estabelecimento
                    INNER JOIN Login ON Login.Estabelecimento_id = Estabelecimento.id
                    INNER JOIN Endereco ON Endereco.Estabelecimento_id = Estabelecimento.id
                    INNER JOIN ContaBancaria ON ContaBancaria.Estabelecimento_id = Estabelecimento.id
				WHERE Estabelecimento.id = ?;`;

	db.all(sql, id, (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(JSON.stringify(rows));
	});
	db.close(); // Fecha o banco
});

app.get('/checkLogin/:email', (req, res) => { //confere as informações do login
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	const { email } = req.params;

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT * FROM Login WHERE Login.Email=?`;

	db.all(sql, [email], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(JSON.stringify(rows));
	});

	db.close(); // Fecha o banco

});

app.get('/getValorReservasNaoFaturadas/:id', (req, res) => { //pega os valores das reservas não faturadas, para formar o valor total do saldo
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')// Isso é importante para evitar o erro de CORS

	const { id } = req.params;

	var db = new sqlite3.Database(DBPATH) // Abre o banco
	var sql = `SELECT SUM(Valor) AS Valor FROM Reserva WHERE Reserva.Fatura_id IS NULL AND Reserva.Estabelecimento_id = ?`

	db.all(sql, id, (err, rows) => {
		if (err) {
			throw err
		}
		res.send(JSON.stringify(rows))
	})
	db.close()// Fecha o banco
})

app.get('/getReservasNaoFaturadas/:id', (req, res) => { //mostra quais são as reservas que formam o valor do saldo
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')// Isso é importante para evitar o erro de CORS

	const { id } = req.params;

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT 
					Reserva.id AS ID,
					Reserva.Fatura_id AS IDFatura,
					Reserva.Valor AS Valor,
					Reserva.DataCheckin AS DataEntrada,
					Reserva.DataCheckout AS DataSaida
				FROM 
					Reserva
				WHERE 
					Reserva.Fatura_id IS NULL AND Reserva.Estabelecimento_id = ?
				ORDER BY Reserva.Valor ASC`

	db.all(sql, id, (err, rows) => {
		if (err) {
			throw err
		}
		res.send(JSON.stringify(rows))
	})
	db.close()// Fecha o banco
})

app.post('/postInvoiceData', (req, res) => { //Adiciona uma nova fatura na tabela quando um valor é faturado pelo hoteleiro
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `INSERT INTO Fatura (Estabelecimento_id, TipoAntecipacao_id, NotaFiscal, ValorRecebido, ValorTaxado, Data, Status)
			 	VALUES 
					(?, ?, ?, ?, ?, ?, ?)`;

	let param = [];
	param.push(req.body.EstabelecimentoID, req.body.TipoAntecipacaoID, req.body.NotaFiscal, req.body.ValorRecebido, req.body.ValorTaxado, req.body.Data, req.body.Status);

	db.all(sql, param, (err, rows) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.post('/postReservationData', (req, res) => { //atribui um id de fatura nas reservas que foram faturadas
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `UPDATE Reserva SET Fatura_id = ? WHERE Reserva.id = ?`;

	let param = [];
	param.push(req.body.FaturaID, req.body.ReservaID);
	console.log(param);

	db.all(sql, param, (err, rows) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.post('/postTypeData', (req, res) => { //aumenta a quantidade de faturas feitas em determinado tipo de antecipação
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `UPDATE TipoAntecipacao SET Quantidade = Quantidade + 1 WHERE TipoAntecipacao.id = ?`;

	let param = [];
	param.push(req.body.TipoAntecipacaoID);
	console.log(param);

	db.all(sql, param, (err, rows) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.post('/postPartnerData', (req, res) => { //aumenta a quantidade de antecipações registradas em um determinado estabelecimento
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `UPDATE Estabelecimento SET QuantidadeAntecipacao = QuantidadeAntecipacao + 1 WHERE Estabelecimento.id = ?`;

	let param = [];
	param.push(req.body.id);
	console.log(param);

	db.all(sql, param, (err, rows) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.get('/getTotalFatura', (req, res) => { //seleciona o id da fatura mais recente
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT MAX(ID) AS FaturaID FROM FATURA`;

	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
})

app.get('/getReservasFaturadas/:id', (req, res) => { //pega as reservas que já foram faturadas
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')

	const { id } = req.params;

	var db = new sqlite3.Database(DBPATH);
	var sql = `SELECT 
					Reserva.id AS ID,
					Reserva.Fatura_id AS IDFatura,
					Reserva.Valor AS Valor,
					Reserva.DataCheckin AS DataEntrada,
					Reserva.DataCheckout AS DataSaida
				FROM 
					Reserva
				WHERE 
					Reserva.Fatura_id IS NOT NULL AND Reserva.Fatura_id = ?`

	db.all(sql, id, (err, rows) => {
		if (err) {
			throw err
		}
		res.send(JSON.stringify(rows))
	})
	db.close()
})