CREATE DATABASE IF NOT EXISTS musicians;
USE musicians;

DROP TABLE IF EXISTS artists;
CREATE TABLE artists (
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    name TINYTEXT NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS albums;
CREATE TABLE albums (
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    title TINYTEXT NOT NULL,
    artist_id INT(11) UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    KEY `artist_id` (artist_id),

    CONSTRAINT `album_artist_id` FOREIGN KEY (artist_id) REFERENCES `artists` (id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS songs;
CREATE TABLE songs (
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    title TINYTEXT NOT NULL,
    artist_id INT(11) UNSIGNED NOT NULL,
    album_id INT(11) UNSIGNED,
    PRIMARY KEY (`id`),
    KEY `artist_id` (artist_id),
    KEY `album_id` (album_id),

    CONSTRAINT `song_artist_id` FOREIGN KEY (artist_id) REFERENCES `artists` (id) ON DELETE CASCADE,
    CONSTRAINT `song_album_id` FOREIGN KEY (album_id) REFERENCES `albums` (id) ON DELETE CASCADE
);

INSERT INTO artists SET name="The Weekend";
INSERT INTO albums SET title="Dawn FM", artist_id=1;
INSERT INTO songs SET title="Take My Breath", artist_id=1, album_id=1;
INSERT INTO songs SET title="Sacrifice", artist_id=1, album_id=1;

INSERT INTO artists SET name="Lizzo";
INSERT INTO albums SET title="Special", artist_id=2;
INSERT INTO songs SET title="About Damn Time", artist_id=2, album_id=2;
INSERT INTO songs SET title="Special", artist_id=2, album_id=2;

INSERT INTO artists SET name="Taylor Swift";
INSERT INTO albums SET title="Midnights", artist_id=3;
INSERT INTO songs SET title="Anti-Hero", artist_id=3, album_id=3;
INSERT INTO songs SET title="Lavender Haze", artist_id=3, album_id=3;
