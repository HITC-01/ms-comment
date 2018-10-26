DROP DATABASE IF EXISTS comments;

CREATE DATABASE comments;
USE comments;

CREATE TABLE songs (
    id integer not null,
    PRIMARY KEY (`id`),
    plays integer,
    likes integer,
    reposts integer
);

CREATE TABLE artists (
    id integer not null,
    PRIMARY KEY (`id`),
    name varchar(20),
    imageURL TEXT
);

CREATE TABLE comment (
    id integer not null auto_increment,
    text varchar(1000) not null,
    createdAt timestamp not null,
    songtime integer not null,
    PRIMARY KEY (`id`),
    artist_Id integer,
    song_Id integer
);

CREATE TABLE reply (
    id integer not null auto_increment,
    text varchar(1000) not null,
    createdAt timestamp not null,
    PRIMARY KEY (`id`),
    comment_Id integer,
    artist_Id integer,
    song_Id integer

);

ALTER TABLE `comment` ADD FOREIGN KEY (artist_Id) REFERENCES `artists` (`id`);
ALTER TABLE `comment` ADD FOREIGN KEY (song_Id) REFERENCES `songs` (`id`);
ALTER TABLE `reply` ADD FOREIGN KEY (comment_Id) REFERENCES `comment` (`id`);
ALTER TABLE `reply` ADD FOREIGN KEY (artist_Id) REFERENCES `artists` (`id`);
ALTER TABLE `reply` ADD FOREIGN KEY (song_Id) REFERENCES `songs` (`id`);

