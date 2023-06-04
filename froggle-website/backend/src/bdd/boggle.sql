-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 02, 2023 at 11:05 PM
-- Server version: 8.0.32
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `boggle`
--

-- --------------------------------------------------------

--
-- Table structure for table `b_appartient`
--

CREATE TABLE `b_appartient` (
  `ID_Joueur` bigint UNSIGNED NOT NULL,
  `ID_Liste` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `b_appartient`
--

INSERT INTO `b_appartient` (`ID_Joueur`, `ID_Liste`) VALUES
(5, 6),
(7, 6),
(6, 7),
(6, 8);

-- --------------------------------------------------------

--
-- Table structure for table `b_chat`
--

CREATE TABLE `b_chat` (
  `ID_Chat` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `b_chat`
--

INSERT INTO `b_chat` (`ID_Chat`) VALUES
(1);

-- --------------------------------------------------------

--
-- Table structure for table `b_chat_ligne`
--

CREATE TABLE `b_chat_ligne` (
  `ID_Chat_Ligne` bigint UNSIGNED NOT NULL,
  `Creer_a` time DEFAULT NULL,
  `ligne_de_texte` varchar(255) DEFAULT NULL,
  `ID_Joueur` bigint UNSIGNED NOT NULL,
  `ID_Chat` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `b_chat_ligne`
--

INSERT INTO `b_chat_ligne` (`ID_Chat_Ligne`, `Creer_a`, `ligne_de_texte`, `ID_Joueur`, `ID_Chat`) VALUES
(3, '00:00:00', 'va te coucher', 6, 1),
(4, '00:01:04', 'j\'avoue je suis crevé', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `b_discute`
--

CREATE TABLE `b_discute` (
  `ID_Joueur` bigint UNSIGNED NOT NULL,
  `ID_Chat` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `b_joueur`
--

CREATE TABLE `b_joueur` (
  `ID_Joueur` bigint UNSIGNED NOT NULL,
  `pseudo` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `mdp` varchar(255) DEFAULT NULL,
  `XP_Actuel` int DEFAULT NULL,
  `Photo_De_Profile` int DEFAULT NULL,
  `Est_Prive` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `b_joueur`
--

INSERT INTO `b_joueur` (`ID_Joueur`, `pseudo`, `mail`, `mdp`, `XP_Actuel`, `Photo_De_Profile`, `Est_Prive`) VALUES
(4, 'root', 'test@gmail.fr', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 0, 0, 0),
(5, 'polux', 'polux@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 0, 0, 0),
(6, 'bleps', 'bleps@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 0, 0, 0),
(7, 'Joshua', 'joshua@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `b_liste`
--

CREATE TABLE `b_liste` (
  `ID_Liste` bigint UNSIGNED NOT NULL,
  `ID_Joueur` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `b_liste`
--

INSERT INTO `b_liste` (`ID_Liste`, `ID_Joueur`) VALUES
(9, 4),
(8, 5),
(6, 6),
(7, 7);

-- --------------------------------------------------------

--
-- Table structure for table `b_participe`
--

CREATE TABLE `b_participe` (
  `ID_Joueur` bigint UNSIGNED NOT NULL,
  `ID_Partie` bigint UNSIGNED NOT NULL,
  `score` int DEFAULT NULL,
  `Podium` int DEFAULT NULL,
  `mots_trouves` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `b_participe`
--

INSERT INTO `b_participe` (`ID_Joueur`, `ID_Partie`, `score`, `Podium`, `mots_trouves`) VALUES
(4, 2, 5, 1, 3),
(4, 3, 1, 2, 1),
(5, 2, 4, 2, 3),
(5, 3, 0, 3, 0),
(6, 3, 3, 1, 2),
(7, 2, 1, 3, 1),
(7, 3, 0, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `b_partie`
--

CREATE TABLE `b_partie` (
  `ID_Partie` bigint UNSIGNED NOT NULL,
  `grille` varchar(50) DEFAULT NULL,
  `Nb_Joueur` int DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `b_partie`
--

INSERT INTO `b_partie` (`ID_Partie`, `grille`, `Nb_Joueur`, `date`) VALUES
(1, 'A R B R M A T E B K L M M P M K', 2, '2023-06-01'),
(2, 'A R B R M A T E B K L M M P M K', 3, '2023-05-17'),
(3, 'A R B R M A T E B K L M M P M K', 4, '2023-05-18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `b_appartient`
--
ALTER TABLE `b_appartient`
  ADD PRIMARY KEY (`ID_Joueur`,`ID_Liste`),
  ADD KEY `B_Appartient_ibfk_2` (`ID_Liste`);

--
-- Indexes for table `b_chat`
--
ALTER TABLE `b_chat`
  ADD PRIMARY KEY (`ID_Chat`),
  ADD UNIQUE KEY `ID_Chat` (`ID_Chat`);

--
-- Indexes for table `b_chat_ligne`
--
ALTER TABLE `b_chat_ligne`
  ADD PRIMARY KEY (`ID_Chat_Ligne`),
  ADD UNIQUE KEY `ID_Chat_Ligne` (`ID_Chat_Ligne`),
  ADD KEY `B_CHAT_LIGNE_ibfk_1` (`ID_Joueur`),
  ADD KEY `B_CHAT_LIGNE_ibfk_2` (`ID_Chat`);

--
-- Indexes for table `b_discute`
--
ALTER TABLE `b_discute`
  ADD PRIMARY KEY (`ID_Joueur`,`ID_Chat`),
  ADD KEY `B_Discute_ibfk_2` (`ID_Chat`);

--
-- Indexes for table `b_joueur`
--
ALTER TABLE `b_joueur`
  ADD PRIMARY KEY (`ID_Joueur`),
  ADD UNIQUE KEY `ID_Joueur` (`ID_Joueur`);

--
-- Indexes for table `b_liste`
--
ALTER TABLE `b_liste`
  ADD PRIMARY KEY (`ID_Liste`),
  ADD UNIQUE KEY `ID_Joueur` (`ID_Joueur`),
  ADD UNIQUE KEY `ID_Liste` (`ID_Liste`);

--
-- Indexes for table `b_participe`
--
ALTER TABLE `b_participe`
  ADD PRIMARY KEY (`ID_Joueur`,`ID_Partie`),
  ADD KEY `B_Participe_ibfk_2` (`ID_Partie`);

--
-- Indexes for table `b_partie`
--
ALTER TABLE `b_partie`
  ADD PRIMARY KEY (`ID_Partie`),
  ADD UNIQUE KEY `ID_Partie` (`ID_Partie`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `b_chat`
--
ALTER TABLE `b_chat`
  MODIFY `ID_Chat` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `b_chat_ligne`
--
ALTER TABLE `b_chat_ligne`
  MODIFY `ID_Chat_Ligne` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `b_joueur`
--
ALTER TABLE `b_joueur`
  MODIFY `ID_Joueur` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `b_liste`
--
ALTER TABLE `b_liste`
  MODIFY `ID_Liste` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `b_partie`
--
ALTER TABLE `b_partie`
  MODIFY `ID_Partie` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `b_appartient`
--
ALTER TABLE `b_appartient`
  ADD CONSTRAINT `B_Appartient_ibfk_1` FOREIGN KEY (`ID_Joueur`) REFERENCES `b_joueur` (`ID_Joueur`),
  ADD CONSTRAINT `B_Appartient_ibfk_2` FOREIGN KEY (`ID_Liste`) REFERENCES `b_liste` (`ID_Liste`);

--
-- Constraints for table `b_chat_ligne`
--
ALTER TABLE `b_chat_ligne`
  ADD CONSTRAINT `B_CHAT_LIGNE_ibfk_1` FOREIGN KEY (`ID_Joueur`) REFERENCES `b_joueur` (`ID_Joueur`),
  ADD CONSTRAINT `B_CHAT_LIGNE_ibfk_2` FOREIGN KEY (`ID_Chat`) REFERENCES `b_chat` (`ID_Chat`);

--
-- Constraints for table `b_discute`
--
ALTER TABLE `b_discute`
  ADD CONSTRAINT `B_Discute_ibfk_1` FOREIGN KEY (`ID_Joueur`) REFERENCES `b_joueur` (`ID_Joueur`),
  ADD CONSTRAINT `B_Discute_ibfk_2` FOREIGN KEY (`ID_Chat`) REFERENCES `b_chat` (`ID_Chat`);

--
-- Constraints for table `b_liste`
--
ALTER TABLE `b_liste`
  ADD CONSTRAINT `B_LISTE_1` FOREIGN KEY (`ID_Joueur`) REFERENCES `b_joueur` (`ID_Joueur`);

--
-- Constraints for table `b_participe`
--
ALTER TABLE `b_participe`
  ADD CONSTRAINT `B_Participe_ibfk_1` FOREIGN KEY (`ID_Joueur`) REFERENCES `b_joueur` (`ID_Joueur`),
  ADD CONSTRAINT `B_Participe_ibfk_2` FOREIGN KEY (`ID_Partie`) REFERENCES `b_partie` (`ID_Partie`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
