create database vidrolaser;

use vidrolaser;

CREATE TABLE VLFuncionarios (
    idFuncionario INT AUTO_INCREMENT NOT NULL,
    Nome CHAR(100),
    setor CHAR(50),
    CONSTRAINT pk_funcionarios PRIMARY KEY (idFuncionario)
)  ENGINE=INNODB;



CREATE TABLE VLCars (
    idCar INT AUTO_INCREMENT NOT NULL,
    License VARCHAR(10) NOT NULL,
    Model VARCHAR(21),
    Cor CHAR(11),
    CONSTRAINT pk_cars PRIMARY KEY (idCar)
)  ENGINE=INNODB;
    
CREATE TABLE IF NOT EXISTS VLInstalacao (
    idInstalacao INT AUTO_INCREMENT NOT NULL,
    idFuncionario INT NOT NULL,
    idFuncionario2 VARCHAR(10),
    idFuncionario3 VARCHAR(10),
    idFuncionario4 VARCHAR(10),
    idFuncionario5 VARCHAR(10),
    nPedido VARCHAR(11) NOT NULL,
    saida DATETIME,
    chegada DATETIME,
    idCar INT NOT NULL,
    descricao VARCHAR(500),
    CONSTRAINT pk_instalacao PRIMARY KEY (idInstalacao),
    CONSTRAINT pk_instalacao_funcionarios FOREIGN KEY (idFuncionario)
        REFERENCES VLfuncionarios (idFuncionario),
    CONSTRAINT pk_instalacao_cars FOREIGN KEY (idCar)
        REFERENCES VLCars (idCar)
);
        
drop table vlinstalacao;
        
insert into vlFuncionarios 
		(Nome, Setor)
        values 
		("RODRIGO","INSTALADOR"),
		("SIDNEY","INSTALADOR"),
        ("JOÃO VITOR","INSTALADOR"),
        ("JUNOR","INSTALADOR"),
        ("MAURICIO","INSTALADOR"),
        ("ALEXANDRE","INSTALADOR"),
        ("DOUGLAS","INSTALADOR"),
        ("LEANDRO","AJUDANTE"),
        ("JORDAN","AJUDANTE"),
        ("GUSTAVO","AJUDANTE"),
        ("WELTON","AJUDANTE"),
        ("PEDRO","AJUDANTE"),
        ("LUCAS","AJUDANTE"),
        ("THIAGO","INSTALADOR"),
        ("ROGER","INSTALADOR"),
        ("FRANCISCO","INSTALADOR"),
        ("RÉGIS","INSTALADOR"),
        ("VALTER","INSTALADOR"),
        ("EDUARDO","AJUDANTE"),
        ("ROBERTO","AJUDANTE"),
        ("PABLO","AJUDANTE"),
        ("ROBERTO","AJUDANTE"),
        ("ADALHO","INSTALADOR"),
        ("PAULO","INSTALADOR"),
        ("ALESSANDRO","INSTALADOR"),
        ("JOCIEL","INSTALADOR"),
        ("ERASMO","INSTALADOR"),
        ("ALAN","INSTALADOR"),
        ("KAIO","INSTALADOR"),
        ("FABIO","AJUDANTE"),
        ("JACKSON","AJUDANTE"),
        ("BRUNO","AJUDANTE"),
        ("DOUGLAS","AJUDANTE"),
        ("ANDRÉ","AJUDANTE"),
        ("EVAILTON","AJUDANTE"),
        ("GIOVANI","AJUDANTE"
        );
        
insert into vlCars (License, Model, Cor)
	values 
    ("CSQ-2901","STRADA", "PRETA"),
    ("GJU-0312","BONGO",""),
    ("FKL-4E41","MONTANA", "BRANCA"),
    ("FPY-2914","EFFA",""),
    ("FGJ-7853","MONTANA", "BRANCA"),
    ("AZY-9563","STRADA", "VINHO"),
    ("QLH-1913","HR", "BRANCA"),
    ("CSY-2646","PALI0",""),
    ("DDR-4748","COURIER", "PRATA"),
    ("DZJ-0948","PRISMA",""),
    ("FAQ-9097","HR",""),
    ("FRF-4197","MONTANA", "PRATA"),
    ("DBQ-9000","COURIER", "PRATA"),
    ("FHA-9320","MONTANA","PRETA"
    );
        
select * FROM vlcars;


insert INTO VLINSTALACAO (idFuncionario , idFuncionario2, idFuncionario3, idFuncionario4,
							idFuncionario5, nPedido, idCar, descricao)
                            values("11","LEANDRO","GUSTAVO","","","98524","9","OBRA TAL");
                            



UPDATE vlinstalacao 
SET 
    chegada = current_timestamp()
WHERE
    idFuncionario = 11;
    


SELECT 
idInstalacao, Nome, Model, License, nPedido, saida, chegada, descricao
FROM
    vlinstalacao c
        INNER JOIN
    vlcars a ON c.idcar = a.idcar
		INNER JOIN
	vlfuncionarios b on c.idFuncionario = b.idFuncionario;
    

    
alter table 
	vlcars 
modify 
    License 
varchar(10) Unique key not null;








        

        
    
