const mysql = require('../mysql').pool;

var datetime = new Date().toLocaleString();

exports.getAllCars = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        
         if (error) { return res.status(500).send([{ error: error}])}
         conn.query(
             'SELECT * FROM vlcars;',
             (error, result, fields) => {
                conn.release();
                 if (error) {
                     return res.status(500).send({ error: error})                
                 }
                 if (result < 1 ) {
                     return res.status(404).send([{error: 'Não existe carro cadastrado'}])
                     
                    }
                    response =  result.map(cars =>{
                    return{
                        idCar: cars.idCar,
                        Placa:cars.License,
                        Model: cars.Model,
                        Cor: cars.Cor,
                        request:{
                            tipo: 'GET',
                            descricao: 'Retorna o carro especifico',
                            url: 'http://localhost:3000/cars/' + cars.idCar
                        }
                    }
                })
                
                return res.status(200).send(response)
            }
        )
    });
}


//TODO SELECT*FROM METHOD TO POST AND DELETE!!!

exports.postCars = (req, res, next) => {
    //console.log(req.usuario);
    mysql.getConnection((error, conn)=>{
        
        if (error) { 
            return res.status(500).send([{ error: error}])
        }
        
        conn.query(
            'INSERT INTO vlcars (License, Model, Cor) VALUES (?,?, ?)',
            [req.body.License, req.body.Model, req.body.Cor],
            (error, result, field) => {
                conn.release();
                if (error) { 
                    return res.status(500).send([{ error: error}])
                }
                const response = [{
                        idCarro: result.insertId,
                        Placa: req.body.License,
                        Model: req.body.Model,
                        Cor : req.body.Cor,
                        request: {
                            tipo: 'GET',
                            descricao: 'Carro inserido',
                            url: 'http://localhost:3000/cars/' + result.insertId,
                            mensagem: 'Carro inserido com sucesso'
                        }
                    
                }]
                return res.status(201).send(
                    response
                );
            }
        )

    });


    
};





exports.getOneCar = (req, res, next) =>{
    
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send([{ error: error}])}
        conn.query(
            'SELECT * FROM vlcars where idCar = ?;',
            [req.params.idCar],
            (error, result, fields) => {    
                conn.release();            
                if (error) {
                    return res.status(500).send({ error: error})                
                }
                if (result < 1) {
                    return res.status(404).send({error: 'Id não encontrado'})
                }
                const response = [{

                        idCar: result[0].idCar,
                        License: result[0].License,
                        Model: result[0].Model,
                        Cor: result[0].Cor,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os carros',
                            url: 'http://localhost:3000/cars'
                        }

                    
                    
                }]
                return res.status(200).send(response)
                
            }
            
        )
   });

    
};

exports.deleteCar = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        
        if (error) { 
            return res.status(500).send([{ error: error}])
        }
        
        conn.query(
            'DELETE FROM vlcars WHERE idCar = ?',
            [req.body.idCar],
            (error, result, field) => {
                conn.release();
                if (result < 1) { 
                    return res.status(404).send([{ error: error}])
                }
                
                const response = [{
                    mensagem: 'Carro removido com sucesso',
                    inicio: 'url'
                    
                }]
                return res.status(202).send(
                    response
                   
                );
            }
        )
        


    });
};




