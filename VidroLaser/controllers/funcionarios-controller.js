const mysql = require('../mysql').pool;



exports.getAllFunc = (req, res, next) => {
    mysql.getConnection((error, conn) => {
         if (error) { return res.status(500).send({ error: error})}
         conn.query(
             'SELECT * FROM vlfuncionarios;',
             (error, result, fields) => {
                 if (error) {
                     return res.status(500).send({ error: error})                
                 }
                 if (result < 1 ) {
                     return res.status(404).send({error: 'Não exsite funcionário cadastrado'})
                     
                 }
                 response = 
                     result.map(func =>{
                         return {
                             idFuncionario: func.idFuncionario,
                             Nome:func.Nome,
                             setor: func.setor,
                             request:{
                                 tipo: 'GET',
                                 descricao: 'Retorna o funcionário especifico',
                                 url: 'http://localhost:3000/funcionarios/' + func.idFuncionario
                             }
                         }
                     })
                 
                 return res.status(200).send(response)
             }
         )
    });
}


exports.postFuncionarios = (req, res, next) => {
    //console.log(req.usuario);
    mysql.getConnection((error, conn)=>{
        
        if (error) { 
            return res.status(500).send({ error: error})
        }
        
        conn.query(
            'INSERT INTO vlfuncionarios (nome, setor) VALUES (?,?)',
            [req.body.Nome, req.body.setor],
            (error, result, field) => {
                conn.release();
                if (error) { 
                    return res.status(500).send({ error: error})
                }
                const response =[{
                        idFuncionario: result.insertId,
                        nome: req.body.Nome,
                        setor: req.body.setor,
                        request: {
                            tipo: 'GET',
                            descricao: 'Funcionario inserido',
                            url: 'http://localhost:3000/funcionarios/' + result.insertId
                        }
                    }]
                
                return res.status(201).send(
                    response
                );
            }
        )

    });


    
};

exports.findbyIdFunc = (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error})}
        conn.query(
            'SELECT * FROM vlfuncionarios where idFuncionario = ?;',
            [req.params.idFuncionario],
            (error, result, fields) => {
                
                if (error) {
                    return res.status(500).send({ error: error})                
                }
                if (result < 1) {
                    return res.status(404).send({error: 'Id não encontrado'})
                }
                const response =[ {                  
                        idFuncionario: result[0].idFuncionario,
                        nome: result[0].Nome,
                        setor: result[0].setor,
                        request:{
                            tipo: 'GET',
                            descricao: 'Retorna todos os funcionarios',
                            url: 'http://localhost:3000/funcionarios'
                        }
                    
                }]
                return res.status(200).send(response)
                
            }
        )
   });
    
};

exports.patchFuncionario = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        
        if (error) { 
            return res.status(500).send({ error: error})
        }
        
        conn.query(
            'UPDATE vlfuncionarios set nome = ?, setor = ? where idFuncionario = ?',
            [req.body.nome, req.body.setor, req.body.idFuncionario],
            (error, result, field) => {
                conn.release();
                if (error) { 
                    return res.status(500).send({ error: error})
                }
                const response = [{
                        id_produto: req.body.idFuncionario,
                        nome: req.body.Nome,
                        setor: req.body.setor,
                        request: {
                            tipo: 'GET',
                            descricao : 'Retorna os detalhes do funcioario atualizado',
                            url: 'http://localhost:3000/funcionarios/' + req.body.idFuncionario
                        }
                    
                }]

                return res.status(202).send(
                    response
                );
            }
        )

    });
};

exports.deleteFunc = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        
        if (error) { 
            return res.status(500).send({ error: error})
        }
        
        conn.query(
            'DELETE FROM vlfuncionarios WHERE IDFUNCIONARIO = ?',
            [req.body.idFuncionario],
            (error, resultado, field) => {
                conn.release();
                if (error) { 
                    return res.status(500).send({ error: error})
                }
                const response = {
                    mensagem: 'Funcionario removido com sucesso',
                }
                
                return res.status(202).send([
                   response]
                );
            }
        )

    });
};