

create database if not exists store;

use store;


create table products (id int, name varchar(255), price int, quantity int);

create table user (id int, rol varchar(255), name varchar(255), email varchar(255), password varchar(255));

create table orders (id int, user_id int, product_id int, quantity int, total int);

create table order_details (id int, order_id int, product_id int, quantity int, total int);

create table categories (id int, name varchar(255));

create table product_categories (id int, product_id int, category_id int);

create table product_images (id int, product_id int, image blob);

create table product_reviews (id int, product_id int, user_id int, review varchar(255), rating int);


insert into user (id, rol, name, email, password) values (1, 'admin', 'admin', 'alex@gmail.com', 'admin');

