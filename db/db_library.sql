CREATE DATABASE IF NOT EXISTS library;
-- Tabla Author
CREATE TABLE library.author
(
	authorId int not null auto_increment,
	author varchar(80) not null,
    primary key (AuthorId)
)ENGINE=INNODB;

-- Tabla book
CREATE TABLE library.book
(
	bookId int not null auto_increment,
	authorId int not null,
	title varchar(100) not null,	
	year_publication smallint not null,
	editorial varchar(80) not null,
	category varchar(50) not null,
	place varchar(100) not null,
	primary key (bookId),
	foreign key (authorId) references library.author(authorId)
)ENGINE=INNODB;

