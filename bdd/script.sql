CREATE TABLE B_PARTIE(
    id_partie INT NOT NULL AUTO_INCREMENT,
    grille VARCHAR(255),
    nb_joueur INT,
    PRIMARY KEY(id_partie)
);

CREATE TABLE B_JOUEUR(
    id_joueur INT NOT NULL AUTO_INCREMENT,
    pseudo VARCHAR(8),
    mail VARCHAR(50),
    mdp VARCHAR(255),
    xp_actuel INT,
    photo_de_profil BLOB,
    compte_prive INT,
    PRIMARY KEY(id_joueur),
    UNIQUE(mail)
);

CREATE TABLE B_LISTE(
    id_liste INT NOT NULL AUTO_INCREMENT,
    id_joueur INT NOT NULL,
    PRIMARY KEY(id_liste),
    UNIQUE(id_joueur),
    FOREIGN KEY(id_joueur) REFERENCES B_JOUEUR(id_joueur)
);

CREATE TABLE B_CHAT(chat_id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(chat_id));

CREATE TABLE B_CHAT_LIGNE(
    chat_ligne_id BIGINT NOT NULL AUTO_INCREMENT,
    created_at DATE,
    line_text TEXT,
    id_joueur INT NOT NULL,
    chat_id INT NOT NULL,
    PRIMARY KEY(chat_ligne_id),
    FOREIGN KEY(id_joueur) REFERENCES B_JOUEUR(id_joueur),
    FOREIGN KEY(chat_id) REFERENCES B_CHAT(chat_id)
);

CREATE TABLE B_MOTS(mot VARCHAR(255), PRIMARY KEY(mot));

CREATE TABLE B_participe(
    id_partie INT NOT NULL AUTO_INCREMENT,
    id_joueur INT,
    score INT,
    a_gagne INT,
    PRIMARY KEY(id_partie, id_joueur),
    FOREIGN KEY(id_partie) REFERENCES B_PARTIE(id_partie),
    FOREIGN KEY(id_joueur) REFERENCES B_JOUEUR(id_joueur)
);

CREATE TABLE B_appartient(
    id_joueur INT NOT NULL AUTO_INCREMENT,
    id_liste INT,
    PRIMARY KEY(id_joueur, id_liste),
    FOREIGN KEY(id_joueur) REFERENCES B_JOUEUR(id_joueur),
    FOREIGN KEY(id_liste) REFERENCES B_LISTE(id_liste)
);

CREATE TABLE B_discute(
    id_joueur INT NOT NULL AUTO_INCREMENT,
    chat_id INT,
    PRIMARY KEY(id_joueur, chat_id),
    FOREIGN KEY(id_joueur) REFERENCES B_JOUEUR(id_joueur),
    FOREIGN KEY(chat_id) REFERENCES B_CHAT(chat_id)
);

CREATE TABLE B_trouve(
    id_partie INT NOT NULL AUTO_INCREMENT,
    id_joueur INT,
    mot VARCHAR(255),
    PRIMARY KEY(id_partie, id_joueur, mot),
    FOREIGN KEY(id_partie) REFERENCES B_PARTIE(id_partie),
    FOREIGN KEY(id_joueur) REFERENCES B_JOUEUR(id_joueur),
    FOREIGN KEY(mot) REFERENCES B_MOTS(mot)
);