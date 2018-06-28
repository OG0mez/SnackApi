create database snack ;
use snack;


create table products(
	id int(11) unsigned not null auto_increment primary key,
    product_name varchar(25),
    brand varchar(25),
    price float(4,2),
    quantity int(20),
    like_count int(20),
    aviable tinyint(1)
);


create table users(
	id int(11) unsigned not null auto_increment primary key,
    user varchar(25) not null,
    pass varchar(25) not null,
    is_admin tinyint(1) not null
);


create table likes(
	id int (11) unsigned not null auto_increment primary key,
    liked tinyint(1),
    id_products int(11) unsigned not null,
    id_users int(11) unsigned not null
);



alter table likes
add foreign key (id_products) references products(id);

alter table likes
add foreign key (id_users) references users(id);


insert into products (id,product_name,brand,price,quantity,like_count,aviable)
values
(01,"chocolate","popeye",0.25,100,0,1);