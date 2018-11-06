<<<<<<< HEAD:database/schema.sql
DROP DATABASE IF EXISTS soundcloud_ms;

CREATE DATABASE soundcloud_ms;
USE soundcloud_ms;
=======
DROP DATABASE IF EXISTS feccomments;

CREATE DATABASE feccomments;
USE feccomments;
>>>>>>> 05c0d6b44fb8e170147bb7a03a75e6e7cde85c0d:schema.sql

DROP TABLE IF EXISTS artists;

CREATE TABLE artists (
    artistId integer not null PRIMARY KEY auto_increment,
    name varchar(50),
    imageURL text
);

DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
    songId integer not null PRIMARY KEY auto_increment,
    plays integer,
    likes integer,
    reposts integer, 
    songlength integer,
    artist_Id integer
);

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
    commentId integer not null PRIMARY KEY auto_increment,
    text varchar(1000) not null,
    createdAt timestamp not null,
    songtime integer not null,
    artist_Id integer,
    song_Id integer
);

DROP TABLE IF EXISTS reply;

CREATE TABLE reply (
    replyId integer not null PRIMARY KEY auto_increment,
    text varchar(1000) not null,
    createdAt timestamp not null,
    comment_Id integer,
    artist_Id integer
);

ALTER TABLE `songs` ADD FOREIGN KEY (artist_Id) REFERENCES `artists` (`artistId`);
ALTER TABLE `comments` ADD FOREIGN KEY (artist_Id) REFERENCES `artists` (`artistId`);
ALTER TABLE `comments` ADD FOREIGN KEY (song_Id) REFERENCES `songs` (`songId`);
ALTER TABLE `reply` ADD FOREIGN KEY (comment_Id) REFERENCES `comments` (`commentId`);
ALTER TABLE `reply` ADD FOREIGN KEY (artist_Id) REFERENCES `artists` (`artistId`);

