DROP DATABASE IF EXISTS comments;

CREATE DATABASE comments;
USE comments;

DROP TABLE IF EXISTS artists;

CREATE TABLE artists (
    id integer not null PRIMARY KEY auto_increment,
    name varchar(50),
    imageURL text
);

DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
    id integer not null PRIMARY KEY auto_increment,
    plays integer,
    likes integer,
    reposts integer, 
    songlength integer,
    artist_Id integer
);

DROP TABLE IF EXISTS comment;

CREATE TABLE comment (
    id integer not null PRIMARY KEY auto_increment,
    text varchar(1000) not null,
    createdAt timestamp not null,
    songtime integer not null,
    artist_Id integer,
    song_Id integer
);

DROP TABLE IF EXISTS reply;

CREATE TABLE reply (
    id integer not null PRIMARY KEY auto_increment,
    text varchar(1000) not null,
    createdAt timestamp not null,
    comment_Id integer,
    artist_Id integer
);

ALTER TABLE `songs` ADD FOREIGN KEY (artist_Id) REFERENCES `artists` (`id`);
ALTER TABLE `comment` ADD FOREIGN KEY (artist_Id) REFERENCES `artists` (`id`);
ALTER TABLE `comment` ADD FOREIGN KEY (song_Id) REFERENCES `songs` (`id`);
ALTER TABLE `reply` ADD FOREIGN KEY (comment_Id) REFERENCES `comment` (`id`);
ALTER TABLE `reply` ADD FOREIGN KEY (artist_Id) REFERENCES `artists` (`id`);

