-- phpMyAdmin SQL Dump
-- version 4.6.6deb4+deb9u2
-- https://www.phpmyadmin.net/
--
-- Client :  sqletud.u-pem.fr
-- Généré le :  Lun 22 Mai 2023 à 14:34
-- Version du serveur :  5.7.30-log
-- Version de PHP :  7.0.33-0+deb9u12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `paul.lucas_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `B_Appartient`
--

CREATE TABLE `B_Appartient` (
  `ID_Joueur` bigint(20) UNSIGNED NOT NULL,
  `ID_Liste` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `B_Appartient`
--



-- --------------------------------------------------------

--
-- Structure de la table `B_CHAT`
--

CREATE TABLE `B_CHAT` (
  `ID_Chat` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `B_CHAT`
--



-- --------------------------------------------------------

--
-- Structure de la table `B_CHAT_LIGNE`
--

CREATE TABLE `B_CHAT_LIGNE` (
  `ID_Chat_Ligne` bigint(20) UNSIGNED NOT NULL,
  `Creer_a` time DEFAULT NULL,
  `ligne_de_texte` varchar(255) DEFAULT NULL,
  `ID_Joueur` bigint(20) UNSIGNED NOT NULL,
  `ID_Chat` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Structure de la table `B_Discute`
--

CREATE TABLE `B_Discute` (
  `ID_Joueur` bigint(20) UNSIGNED NOT NULL,
  `ID_Chat` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `B_Discute`
--


-- --------------------------------------------------------

--
-- Structure de la table `B_JOUEUR`
--

CREATE TABLE `B_JOUEUR` (
  `ID_Joueur` bigint(20) UNSIGNED NOT NULL,
  `pseudo` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `mdp` varchar(255) DEFAULT NULL,
  `XP_Actuel` int(11) DEFAULT NULL,
  `Photo_De_Profile` blob,
  `Est_Prive` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `B_JOUEUR`
--


-- --------------------------------------------------------

--
-- Structure de la table `B_LISTE`
--

CREATE TABLE `B_LISTE` (
  `ID_Liste` bigint(20) UNSIGNED NOT NULL,
  `ID_Joueur` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `B_LISTE`


-- --------------------------------------------------------

--
-- Structure de la table `B_MOTS`
--

CREATE TABLE `B_MOTS` (
  `mot` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `B_MOTS`
--


-- --------------------------------------------------------

--
-- Structure de la table `B_Participe`
--

CREATE TABLE `B_Participe` (
  `ID_Joueur` bigint(20) UNSIGNED NOT NULL,
  `ID_Partie` bigint(20) UNSIGNED NOT NULL,
  `score` int(11) DEFAULT NULL,
  `A_Gagne` int(11) DEFAULT NULL,
  `mots_trouves` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `B_Participe`
--


-- --------------------------------------------------------

--
-- Structure de la table `B_Partie`
--

CREATE TABLE `B_Partie` (
  `ID_Partie` bigint(20) UNSIGNED NOT NULL,
  `grille` varchar(50) DEFAULT NULL,
  `Nb_Joueur` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `B_Partie`


-- --------------------------------------------------------

--
-- Structure de la table `B_Trouve`
--

CREATE TABLE `B_Trouve` (
  `ID_Joueur` bigint(20) UNSIGNED NOT NULL,
  `ID_Partie` bigint(20) UNSIGNED NOT NULL,
  `mot` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `B_Trouve`
--


--
-- Index pour les tables exportées
--

--
-- Index pour la table `B_Appartient`
--
ALTER TABLE `B_Appartient`
  ADD PRIMARY KEY (`ID_Joueur`,`ID_Liste`),
  ADD KEY `B_Appartient_ibfk_2` (`ID_Liste`);

--
-- Index pour la table `B_CHAT`
--
ALTER TABLE `B_CHAT`
  ADD PRIMARY KEY (`ID_Chat`),
  ADD UNIQUE KEY `ID_Chat` (`ID_Chat`);

--
-- Index pour la table `B_CHAT_LIGNE`
--
ALTER TABLE `B_CHAT_LIGNE`
  ADD PRIMARY KEY (`ID_Chat_Ligne`),
  ADD UNIQUE KEY `ID_Chat_Ligne` (`ID_Chat_Ligne`),
  ADD KEY `B_CHAT_LIGNE_ibfk_1` (`ID_Joueur`),
  ADD KEY `B_CHAT_LIGNE_ibfk_2` (`ID_Chat`);

--
-- Index pour la table `B_Discute`
--
ALTER TABLE `B_Discute`
  ADD PRIMARY KEY (`ID_Joueur`,`ID_Chat`),
  ADD KEY `B_Discute_ibfk_2` (`ID_Chat`);

--
-- Index pour la table `B_JOUEUR`
--
ALTER TABLE `B_JOUEUR`
  ADD PRIMARY KEY (`ID_Joueur`),
  ADD UNIQUE KEY `ID_Joueur` (`ID_Joueur`);

--
-- Index pour la table `B_LISTE`
--
ALTER TABLE `B_LISTE`
  ADD PRIMARY KEY (`ID_Liste`),
  ADD UNIQUE KEY `ID_Joueur` (`ID_Joueur`),
  ADD UNIQUE KEY `ID_Liste` (`ID_Liste`);

--
-- Index pour la table `B_MOTS`
--
ALTER TABLE `B_MOTS`
  ADD PRIMARY KEY (`mot`);

--
-- Index pour la table `B_Participe`
--
ALTER TABLE `B_Participe`
  ADD PRIMARY KEY (`ID_Joueur`,`ID_Partie`),
  ADD KEY `B_Participe_ibfk_2` (`ID_Partie`);

--
-- Index pour la table `B_Partie`
--
ALTER TABLE `B_Partie`
  ADD PRIMARY KEY (`ID_Partie`),
  ADD UNIQUE KEY `ID_Partie` (`ID_Partie`);

--
-- Index pour la table `B_Trouve`
--
ALTER TABLE `B_Trouve`
  ADD PRIMARY KEY (`ID_Joueur`,`ID_Partie`,`mot`),
  ADD KEY `mot` (`mot`),
  ADD KEY `B_Trouve_ibfk_2` (`ID_Partie`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `B_CHAT`
--
ALTER TABLE `B_CHAT`
  MODIFY `ID_Chat` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `B_CHAT_LIGNE`
--
ALTER TABLE `B_CHAT_LIGNE`
  MODIFY `ID_Chat_Ligne` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `B_JOUEUR`
--
ALTER TABLE `B_JOUEUR`
  MODIFY `ID_Joueur` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `B_LISTE`
--
ALTER TABLE `B_LISTE`
  MODIFY `ID_Liste` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `B_Partie`
--
ALTER TABLE `B_Partie`
  MODIFY `ID_Partie` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `B_Appartient`
--
ALTER TABLE `B_Appartient`
  ADD CONSTRAINT `B_Appartient_ibfk_1` FOREIGN KEY (`ID_Joueur`) REFERENCES `B_JOUEUR` (`ID_Joueur`),
  ADD CONSTRAINT `B_Appartient_ibfk_2` FOREIGN KEY (`ID_Liste`) REFERENCES `B_LISTE` (`ID_Liste`);

--
-- Contraintes pour la table `B_CHAT_LIGNE`
--
ALTER TABLE `B_CHAT_LIGNE`
  ADD CONSTRAINT `B_CHAT_LIGNE_ibfk_1` FOREIGN KEY (`ID_Joueur`) REFERENCES `B_JOUEUR` (`ID_Joueur`),
  ADD CONSTRAINT `B_CHAT_LIGNE_ibfk_2` FOREIGN KEY (`ID_Chat`) REFERENCES `B_CHAT` (`ID_Chat`);

--
-- Contraintes pour la table `B_Discute`
--
ALTER TABLE `B_Discute`
  ADD CONSTRAINT `B_Discute_ibfk_1` FOREIGN KEY (`ID_Joueur`) REFERENCES `B_JOUEUR` (`ID_Joueur`),
  ADD CONSTRAINT `B_Discute_ibfk_2` FOREIGN KEY (`ID_Chat`) REFERENCES `B_CHAT` (`ID_Chat`);

--
-- Contraintes pour la table `B_LISTE`
--
ALTER TABLE `B_LISTE`
  ADD CONSTRAINT `B_LISTE_1` FOREIGN KEY (`ID_Joueur`) REFERENCES `B_JOUEUR` (`ID_Joueur`);

--
-- Contraintes pour la table `B_Participe`
--
ALTER TABLE `B_Participe`
  ADD CONSTRAINT `B_Participe_ibfk_1` FOREIGN KEY (`ID_Joueur`) REFERENCES `B_JOUEUR` (`ID_Joueur`),
  ADD CONSTRAINT `B_Participe_ibfk_2` FOREIGN KEY (`ID_Partie`) REFERENCES `B_Partie` (`ID_Partie`);

--
-- Contraintes pour la table `B_Trouve`
--
ALTER TABLE `B_Trouve`
  ADD CONSTRAINT `B_Trouve_ibfk_1` FOREIGN KEY (`ID_Joueur`) REFERENCES `B_JOUEUR` (`ID_Joueur`),
  ADD CONSTRAINT `B_Trouve_ibfk_2` FOREIGN KEY (`ID_Partie`) REFERENCES `B_Partie` (`ID_Partie`),
  ADD CONSTRAINT `B_Trouve_ibfk_3` FOREIGN KEY (`mot`) REFERENCES `B_MOTS` (`mot`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
