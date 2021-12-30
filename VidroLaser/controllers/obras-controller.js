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
                const response = result.map(obras => {
                    return{
                            idInstalacao: obras.idInstalacao,
                            pedido: obras.nPedido,
                            saida: obras.saida,
                            chegada: obras.chegada,
                            descricao: obras.descricao,
                            modelo: obras.Model,
                            placa: obras.License,
                            nome: obras.Nome,
                            url: {
                                url: 'http://143.110.153.236:8080/obras/' + obras.idInstalacao}
                    }   
                
                })
                return res.status(200).send(response)
                
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
                const response = result.map(obras => {
                    return {
                    instalacao: obras.idInstalacao,
                    nome: obras.Nome,
                    pedido: obras.nPedido,
                    placa: obras.License,
                    saida: obras.saida,
                    chegada: obras.chegada 
                    }   
                })
                
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

    
                conn.query('select complete from vlinstalacao where idCar = ?',
                [req.body.idCar],
                (error, result, field) => {
                    const complete = result.map(fim => {
                        return saidas = {saida: fim.complete}
                        
                    })
                    const filtraSaida = complete.filter(function(item){
                        return item.saida == 0
                    });
                    
                    if (error){
                        return res.status(500).send({error: error})
                    }
                    if(filtraSaida.length > 0){
                        return res.status(403).send ({mensagem: 'Existe uma saída em aberto para este carro'})
                    }
                    //Verificar esta parte do código!!
                    conn.query(`Select * from vlinstalacao where complete = 0`,
                    (error, result, field) => {
                        const todasSaidas = result.map(dados => {
                            return resultados = 
                                /*motorista:*/ dados.idFuncionario
                                /*ajudante2:*/// dados.idFuncionario2,
                                /*ajudante3:*/ //dados.idFuncionario3,
                                /*ajudante4:*/ //dados.idFuncionario4,
                                /*ajudante5:*/ //dados.idFuncionario5
                                /*veiculo:*/// dados.idCar
    
                        })
                        //console.log(todasSaidas)
                        if (error){
                            return res.status(500).send({error: error})
                        }
                        insert = [
                            req.body.idFuncionario,
                            req.body.Funcionario2,
                            req.body.Funcionario3 ? req.body.Funcionario3 : "N/F3",
                            req.body.Funcionario4 ? req.body.Funcionario4 : "N/F4", 
                            req.body.Funcionario5 ? req.body.Funcionario5 : "N/F5", 
                            req.body.nPedido ? req.body.nPedido : "N/P",
                            datetime = new Date(),
                            req.body.idCar,
                            req.body.descricao
                            ],
                            hasDuplicates(insert)
                            if(hasDuplicates(insert) == true){
                                    return res.status(401).send({mensagem: 'Há valores repetidos'})
                                }  
                        
                        conn.query(`insert INTO vlinstalacao (idFuncionario , idFuncionario2, idFuncionario3, idFuncionario4, idFuncionario5, nPedido, saida, idCar, descricao) 
                                    values(?,?,?,?,?,?,?,?,?)`,
                            insert = [
                            req.body.idFuncionario,
                            req.body.Funcionario2,
                            req.body.Funcionario3 ? req.body.Funcionario3 : "N/F3",
                            req.body.Funcionario4 ? req.body.Funcionario4 : "N/F4", 
                            req.body.Funcionario5 ? req.body.Funcionario5 : "N/F5", 
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
                                
                                const response =  'Instalação número ' + result.insertId
                                
                                
                                /* mensagem: 'Saída realizada, sua instalação é ' + result.insertId,
                                    url: 'http://143.110.153.236:8080/obras/cadastro' + result.insertId*/
                                

                                
                                return res.status(201).send(
                                    response
                                
                                )             
                    }
                    
                )
            }
        )
    
    }) }) })
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
                conn.query('Select complete from vlinstalacao where idInstalacao = ?',
                    [req.body.idInstalacao],
                    (error, result, field) => {
                        //Verificar código
                       const dados =  result.map(dados => {
                           
                            return dados.complete
                        
                        })
                        if (dados == 1) {
                            return res.status(204).send({dados})
                        }
                        if (error) {
                            return res.status(500).send({error: error})
                        }
                        conn.query('Update vlinstalacao set chegada = ?, complete = 1 where idInstalacao = ?',
                            [chegada = new Date() , req.body.idInstalacao],
                            (error, result, field) =>{
                                conn.release();
                                if (error) {
                                    return res.status(500).send({error: error})
                                }
                                const response = {
                                        mensagem: 'Instalação concluida com sucesso',
                                        chegada: chegada,
                                        url: 'http://143.110.153.236:8080/obras/' + req.body.idInstalacao
                                            
                                    }
                                
                                return res.status(202).send(
                                    response
                                )
                            
                }   )    }   )
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
                    
                }
                return res.status(202).send(response)
        }   )
    })
}


exports.getObrasAbertas  = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send ({error: error})
        }
        conn.query( `SELECT
                        c.idInstalacao, b.Nome, a.Model, a.License, c.nPedido,
                        date_format(c.saida, '%d/%m/%Y %H:%i:%s') as saida,
                        date_format(c.chegada, '%d/%m/%Y %H:%i:%s') as chegada, c.descricao
                    FROM
                        vlinstalacao c
                            INNER JOIN
                        vlcars a ON c.idCar = a.idCar
                            INNER JOIN
                        vlfuncionarios b on c.idFuncionario = b.idFuncionario 
                            where complete = 0`,
        (error, result, field) => {
           
            conn.release();
            if (error) {
                return res.status(500).send({error: error})
            }
            if (result < 1 ) {
                
                return res.status(200).send({mensagem: "Não há saídas em aberto"})
            }
            const response = result.map(element => {
                return{
                    instalacao: element.idInstalacao,
                    nome: element.Nome,
                    placa: element.License,
                    pedido: element.nPedido,
                    saida: element.saida


                }
            })
           return res.status(200).send(response)
           
        })   
        
    })
}




//Verificando se há valores duplicados dentro do array
function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}
