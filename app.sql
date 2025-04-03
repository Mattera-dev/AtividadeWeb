create database atvWeb;

use atvWeb;

create table User(
    id int primary key auto_increment,
    name varchar(40) not null ,
    pass varchar(255) not null ,
    tel varchar(11) not null ,
    cpf char(11) not null
);

create table Produto(
    id int primary key auto_increment,
    name varchar(50) not null ,
    qnt int not null ,
    price decimal(10, 2) not null
);