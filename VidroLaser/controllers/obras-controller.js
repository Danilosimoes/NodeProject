const mysql = require('../mysql').pool;


exports.getObras =  (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error})}
        conn.query(
                    `SELECT
                        c.idInstalacao, b.Nome, a.Model, a.License, c.nPedido,
                        date_format(c.saida, '%d/%m/%Y %H:%i:%s') as saida,
                        date_format(c.chegada, '%d/%m/%Y %H:%i:%s') as chegada, c.descricao
                    FROM
                        vlinstalacao c
                            INNER JOIN
                        vlcars a ON c.idCar = a.idCar
                            INNER JOIN
                        vlfuncionarios b on c.idFuncionario = b.idFuncionario `,
            (error, result, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error})                
                }
                if (result < 1 ) {
                    return res.status(404).send({error: 'Não há saída com esse registro'})
                    
                }
                result.map(obras => {
                            obras.idInstalacao,
                            obras.nPedido,
                            obras.saida,
                            obras.chegada,
                            obras.descricao,
                            obras.Model,
                            obras.License,
                            obras.Nome,
                            'http://localhost:3000/obras/' + obras.idInstalacao
                            }
                        
                    )
                
                return res.status(200).send(result)
                
            }
        ) 
   });
};

exports.getFirstObras =  (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error})}
        conn.query(
                    `SELECT
                        c.idInstalacao, b.Nome, a.Model, a.License, c.nPedido,
                        date_format(c.saida, '%d/%m/%Y %H:%i:%s') as saida,
                        date_format(c.chegada, '%d/%m/%Y %H:%i:%s') as chegada, c.descricao
                    FROM
                        vlinstalacao c
                            INNER JOIN
                        vlcars a ON c.idCar = a.idCar
                            INNER JOIN
                        vlfuncionarios b on c.idFuncionario = b.idFuncionario
                            WHERE idInstalacao = ?;`,
            [req.params.idInstalacao],
            (error, result, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({ error: error})                
                }
                if (result < 1 ) {
                    return res.status(404).send({error: 'Não há saída com esse registro'})
                    
                }
                /*result.map(obras => {
                    obras.idInstalacao,
                    obras.Nome,
                    obras.nPedido,
                    obras.License,
                    obras.saida,
                    obras.chegada    
                })*/
                
                const response = [{
                    Instalaçao:{
                        idInstalacao: result[0].idInstalacao,
                        Pedido: result[0].nPedido,
                        saida: result[0].saida,
                        chegada: result[0].chegada,
                        descricao: result[0].descricao
                        ,
                        Carro: {
                            idCar: result[0].idCar,
                            Modelo: result[0].Model,
                            Placa: result[0].License
                        
                        },
                        Funcionário: {
                            idFuncionario: result[0].idFuncionario,
                            Nome: result[0].Nome
                        },
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes da Instalação',
                            url: 'http://localhost:3000/obras/'
                    }   }        
                    
                    
                }]
                
                return res.status(200).send(response) 
            }
        )
   });
};


exports.postObras = (req, res, next) => {
    mysql.getConnection((error, conn)=>{

        
        if (error) { 
            return res.status(500).send({ error: error})
        }
        conn.query('Select * from vlcars where idCar = ?',
            [req.body.idCar],
            (error, result, field) => {
                if (error) {
                    return res.status(500).send ({error: error})
                }
                if (result.length == 0) {
                    return res.status(404).send({
                    mensagem: 'Carro não encontrado'
                })
            }
            
            conn.query('select * from vlfuncionarios where idFuncionario = ?',
            [req.body.idFuncionario],
            (error, result, field) => {
                if (error) {
                    return res.status(500).send ({error: error})
                }
                if (result.length == 0) {
                    return res.status(404).send ({mensagem: 'Funcionário não encontrado'})
                }

                conn.query('select chegada from vlinstalacao where idCar = ?',
                [req.body.idCar],
                (error, result, field) => {
                    if (error){
                        return res.status(500).send({error: error})
                    }
                    if(result === null){
                        return res.status(403).send ({mensagem: 'Existe uma saída em aberto para este carro'})
                    }

                
                    conn.query(`insert INTO vlinstalacao (idFuncionario , idFuncionario2, idFuncionario3, idFuncionario4, idFuncionario5, nPedido, saida, idCar, descricao) 
                                values(?,?,?,?,?,?,?,?,?)`,
                        [
                        req.body.idFuncionario,
                        req.body.Funcionario2,
                        req.body.Funcionario3 ? req.body.Funcionario3 : "N/F",
                        req.body.Funcionario4 ? req.body.Funcionario4 : "N/F", 
                        req.body.Funcionario5 ? req.body.Funcionario5 : "N/F", 
                        req.body.nPedido ? req.body.nPedido : "N/P",
                        datetime = new Date(),
                        req.body.idCar,
                        req.body.descricao
                        ],
                        (error, result, field) => {
                            conn.release();
                            if (error) {
                                return res.status(500).send({error: error})
                            }
                            const response = {
                                mensagem: 'Saída realizada, sua instalação é ' + result.insertId,
                                
                                    idInstalacao: result.idInstalacao,
                                    idFunc: req.body.idFuncionario,
                                    funs2: req.body.Funcionario2,
                                    nPedido: req.body.nPedido,
                                    idCar: req.body.idCar,
                                    descricao: req.body.descricao,
                                    tipo: 'GET',
                                    descricao: 'Retorna a instalação',
                                    url: 'http://localhost:3000/obras/' + result.insertId
                                    
                                
        
                            }
                    
                        return res.status(201).send(
                            [response]
                        )
                    }
                )
            }
        )
    
    }) })
});
};

exports.putObras = (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({error: error})
            
        }
        conn.query('select * from vlinstalacao where idInstalacao = ?',
            [req.body.idInstalacao],
            (error, result, field) => {
                if (error) {
                    return res.status(500).send({error: error})
                }
                if (result < 1) {
                    return res.status(404).send({
                        mensagem: 'Id da instalação não encontrada'
                    })
                } 
                conn.query('Update vlinstalacao set chegada = ? where idInstalacao = ?',
                    [datetime = new Date(), req.body.idInstalacao],
                    (error, result, field) =>{
                        conn.release();
                        if (error) {
                            return res.status(500).send({error: error})
                        }
                        const response = [{
                            mensagem: 'Instalação concluida com sucesso',
                            InstalacaoFinzalizada : {
                                instalacao: req.body.idInstalacao,
                                chegada: datetime,
                                request: {
                                    metodo: 'GET',
                                    descricao: 'Retorna a instalaçao finalizada',
                                    url: 'http://localhost:3000/obras/' + req.body.idInstalacao
                                }

                            }
                    
                        }]
                        return res.status(202).send(
                            response
                        )
                }   )
                
            

        }  )
        
    })
}

exports.deleteObras = (req, res, netxt)=>{
    mysql.getConnection((error, conn)=> {
        if (error) {
            return res.status(500).send({error: error})
        }
        conn.query(`DELETE from vlinstalacao where idInstalacao = ?`,
            [req.body.idInstalacao],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({error: error})
                }
                const response = {
                    mensagem: 'Instalação removida com sucesso',
                    request: {
                        Method: 'POST',
                        url: 'http://localhost:3000/obras'
                    }
                }
                return res.status(202).send(response)
        }   )
    })
}
 
