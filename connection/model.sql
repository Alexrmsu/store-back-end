

create database if not exists store;

use store;

create table products (id int, name varchar(255), description varchar(255), image varchar(255), price int);

drop table products;

create table user (id int, rol varchar(255), name varchar(255), email varchar(255), password varchar(255));

create table orders (id int, user_id int, product_id int, quantity int, total int);

create table order_details (id int, order_id int, product_id int, quantity int, total int);

create table categories (id int, name varchar(255));

insert into user (id, rol, name, email, password) values (1, 'admin', 'admin', 'alex@gmail.com', 'admin');

