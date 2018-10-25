DROP DATABASE IF EXISTS comments;

CREATE DATABASE comments;
USE comments;

CREATE TABLE comment (
    id integer not null auto_increment,
    text varchar(1000) not null,
    createdAt timestamp not null,
    songtime integer not null,
    PRIMARY KEY (id),
    FOREIGN KEY (artistId)
        REFERENCES artists(id),
    FOREIGN KEY (songId)
        REFERENCES songs(id)  
);

CREATE TABLE reply (
    id integer not null auto_increment,
    text varchar(1000) not null,
    createdAt timestamp not null,
    PRIMARY KEY (id),
    FOREIGN KEY (commentId)
        REFERENCES comments(id),
    FOREIGN KEY (artistId)
        REFERENCES artists(id),
    FOREIGN KEY (songId)
        REFERENCES songs(id)    
);

CREATE TABLE songs (
    id integer not null,
    PRIMARY KEY (id),
    plays integer,
    likes integer,
    reposts integer,
);

CREATE TABLE artists (
    id integer not null,
    PRIMARY KEY (id),
    name varchar(20),
    imageURL varchar(65535),

);