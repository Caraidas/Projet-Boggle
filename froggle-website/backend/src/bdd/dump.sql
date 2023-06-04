-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 04, 2023 at 10:50 PM
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
(4, 'roota', 'test@gmail.fr', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 0, 2, 0),
(5, 'quoi', 'polux@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 330, 0, 0),
(6, 'bleps', 'bleps@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 0, 2, 0),
(7, 'Joshua', 'joshua@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 330, 3, 0);

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
(5, 4, 8, 2, 2),
(5, 5, 0, 2, 0),
(5, 6, 0, 2, 0),
(5, 7, 17, 2, 11),
(5, 8, 17, 2, 11),
(5, 9, 0, 2, 0),
(5, 10, 0, 2, 0),
(5, 11, 42, 2, 15),
(5, 12, 1, 2, 1),
(5, 13, 1, 2, 1),
(5, 14, 0, 2, 0),
(5, 15, 0, 2, 0),
(5, 16, 0, 2, 0),
(5, 17, 0, 2, 0),
(5, 18, 4, 2, 4),
(5, 19, 4, 2, 4),
(5, 20, 5, 2, 5),
(5, 21, 5, 2, 5),
(5, 22, 5, 2, 5),
(5, 23, 5, 2, 5),
(5, 24, 3, 2, 3),
(5, 25, 3, 2, 3),
(5, 26, 3, 2, 3),
(5, 27, 3, 2, 3),
(5, 28, 6, 2, 6),
(5, 29, 6, 2, 6),
(5, 30, 2, 2, 2),
(5, 31, 2, 2, 2),
(5, 32, 1, 2, 1),
(5, 33, 1, 2, 1),
(5, 34, 3, 1, 3),
(5, 35, 3, 2, 3),
(5, 36, 0, 1, 0),
(5, 37, 0, 2, 0),
(5, 38, 0, 1, 0),
(5, 39, 0, 2, 0),
(5, 41, 0, 2, 0),
(5, 42, 0, 1, 0),
(5, 43, 0, 2, 0),
(5, 44, 0, 2, 0),
(5, 45, 0, 2, 0),
(5, 46, 0, 2, 0),
(5, 47, 0, 2, 0),
(5, 48, 0, 2, 0),
(5, 49, 0, 2, 0),
(5, 50, 0, 2, 0),
(5, 51, 0, 2, 0),
(5, 52, 0, 2, 0),
(5, 53, 0, 2, 0),
(5, 54, 0, 2, 0),
(5, 55, 0, 2, 0),
(5, 56, 0, 2, 0),
(5, 57, 0, 2, 0),
(5, 58, 0, 2, 0),
(5, 59, 0, 2, 0),
(5, 60, 0, 2, 0),
(5, 61, 0, 2, 0),
(5, 62, 0, 2, 0),
(5, 63, 0, 2, 0),
(5, 64, 0, 2, 0),
(5, 65, 0, 2, 0),
(5, 67, 2, 1, 2),
(5, 68, 12, 1, 4),
(5, 69, 12, 1, 6),
(5, 70, 3, 1, 3),
(5, 71, 1, 1, 1),
(5, 72, 11, 1, 9),
(5, 73, 5, 1, 5),
(6, 3, 3, 1, 2),
(7, 2, 1, 3, 1),
(7, 3, 0, 3, 0),
(7, 5, 17, 2, 5),
(7, 6, 17, 2, 5),
(7, 7, 0, 2, 0),
(7, 8, 0, 2, 0),
(7, 9, 7, 2, 7),
(7, 10, 7, 2, 7),
(7, 11, 0, 2, 0),
(7, 12, 0, 2, 0),
(7, 13, 0, 2, 0),
(7, 14, 3, 2, 3),
(7, 15, 3, 2, 3),
(7, 16, 3, 2, 3),
(7, 17, 3, 2, 3),
(7, 18, 0, 2, 0),
(7, 19, 0, 2, 0),
(7, 20, 0, 2, 0),
(7, 21, 0, 2, 0),
(7, 22, 0, 2, 0),
(7, 23, 0, 2, 0),
(7, 24, 0, 2, 0),
(7, 25, 0, 2, 0),
(7, 26, 0, 2, 0),
(7, 27, 0, 2, 0),
(7, 28, 0, 2, 0),
(7, 29, 0, 2, 0),
(7, 30, 0, 2, 0),
(7, 31, 0, 2, 0),
(7, 32, 0, 2, 0),
(7, 33, 0, 2, 0),
(7, 34, 0, 1, 0),
(7, 35, 0, 2, 0),
(7, 36, 26, 1, 11),
(7, 37, 26, 2, 11),
(7, 38, 7, 1, 4),
(7, 39, 7, 2, 4),
(7, 41, 3, 2, 3),
(7, 42, 22, 1, 7),
(7, 43, 22, 2, 7),
(7, 44, 9, 1, 4),
(7, 45, 9, 1, 4),
(7, 46, 7, 1, 7),
(7, 47, 7, 1, 7),
(7, 48, 5, 1, 5),
(7, 49, 5, 1, 5),
(7, 50, 5, 1, 2),
(7, 51, 5, 1, 2),
(7, 52, 4, 1, 4),
(7, 53, 4, 1, 4),
(7, 54, 5, 1, 5),
(7, 55, 5, 1, 5),
(7, 56, 17, 1, 5),
(7, 57, 17, 1, 5),
(7, 58, 8, 1, 8),
(7, 59, 8, 1, 8),
(7, 60, 3, 1, 3),
(7, 61, 3, 1, 3),
(7, 62, 5, 1, 5),
(7, 63, 5, 1, 5),
(7, 64, 3, 1, 3),
(7, 65, 3, 1, 3),
(7, 67, 0, 2, 0),
(7, 68, 0, 2, 0),
(7, 69, 0, 2, 0),
(7, 70, 0, 2, 0),
(7, 71, 0, 2, 0),
(7, 72, 0, 2, 0),
(7, 73, 0, 2, 0);

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
(3, 'A R B R M A T E B K L M M P M K', 4, '2023-05-18'),
(4, 'B R A N E R U I E I I P F T T I', 1, '2023-06-04'),
(5, 'I A Q A T Q R L A 9 Q F A I I G', 2, '2023-06-04'),
(6, 'I A Q A T Q R L A 9 Q F A I I G', 2, '2023-06-04'),
(7, 'A U D C R D E E Q F E S B E I O', 2, '2023-06-04'),
(8, 'A U D C R D E E Q F E S B E I O', 2, '2023-06-04'),
(9, 'A E E E E Q I Q I I L N N N N Q', 2, '2023-06-04'),
(10, 'A E E E E Q I Q I I L N N N N Q', 2, '2023-06-04'),
(11, 'F T R P E C A E N A N A Q U U S', 2, '2023-06-04'),
(12, 'U S X A 9 L T D N Q I P G O E A', 2, '2023-06-04'),
(13, 'U S X A 9 L T D N Q I P G O E A', 2, '2023-06-04'),
(14, 'D E E O A O E O A A S A C S O I', 2, '2023-06-04'),
(15, 'D E E O A O E O A A S A C S O I', 2, '2023-06-04'),
(16, 'T F E A R T I D E C R Q N N P I', 2, '2023-06-04'),
(17, 'T F E A R T I D E C R Q N N P I', 2, '2023-06-04'),
(18, 'N R D L L A A I O N Q S A E I U', 2, '2023-06-04'),
(19, 'N R D L L A A I O N Q S A E I U', 2, '2023-06-04'),
(20, 'E N B A C E A Q X E I S I O R C', 2, '2023-06-04'),
(21, 'E N B A C E A Q X E I S I O R C', 2, '2023-06-04'),
(22, 'I E U B R I N E T L Q T P O E T', 2, '2023-06-04'),
(23, 'I E U B R I N E T L Q T P O E T', 2, '2023-06-04'),
(24, 'L I U A N N D S R D N 9 U U T I', 2, '2023-06-04'),
(25, 'L I U A N N D S R D N 9 U U T I', 2, '2023-06-04'),
(26, 'A S A N I T E A A E O A E N K E', 2, '2023-06-04'),
(27, 'A S A N I T E A A E O A E N K E', 2, '2023-06-04'),
(28, 'N S N L S U T D T O Q E X X S E', 2, '2023-06-04'),
(29, 'N S N L S U T D T O Q E X X S E', 2, '2023-06-04'),
(30, 'E M E I A F N A L G N D A S B A', 2, '2023-06-04'),
(31, 'E M E I A F N A L G N D A S B A', 2, '2023-06-04'),
(32, 'N L T L I L A Q I Q T I L E V A', 2, '2023-06-04'),
(33, 'N L T L I L A Q I Q T I L E V A', 2, '2023-06-04'),
(34, 'I S N D S E S D U D B P I E E D', 2, '2023-06-04'),
(35, 'I S N D S E S D U D B P I E E D', 2, '2023-06-04'),
(36, 'Q E A L A L A I B A D U N I I N', 2, '2023-06-04'),
(37, 'Q E A L A L A I B A D U N I I N', 2, '2023-06-04'),
(38, 'I Q I P Q U L A U I Q A N E I A', 2, '2023-06-04'),
(39, 'I Q I P Q U L A U I Q A N E I A', 2, '2023-06-04'),
(40, 'M V S F S E I Q F R P Q E U I T', 2, '2023-06-04'),
(41, 'M V S F S E I Q F R P Q E U I T', 2, '2023-06-04'),
(42, 'T O N E L H B P D A S Q T A E I', 2, '2023-06-04'),
(43, 'T O N E L H B P D A S Q T A E I', 2, '2023-06-04'),
(44, 'A E A U E V A A I R O R S E C I', 2, '2023-06-04'),
(45, 'A E A U E V A A I R O R S E C I', 2, '2023-06-04'),
(46, 'E E Q I T R I P E E M N I A P T', 2, '2023-06-04'),
(47, 'E E Q I T R I P E E M N I A P T', 2, '2023-06-04'),
(48, 'A N E E A D D S S A E A P A I Q', 2, '2023-06-04'),
(49, 'A N E E A D D S S A E A P A I Q', 2, '2023-06-04'),
(50, 'A Q I C T I F S I F X C A F I L', 2, '2023-06-04'),
(51, 'A Q I C T I F S I F X C A F I L', 2, '2023-06-04'),
(52, 'E N S N C L T I T N E T U E S O', 2, '2023-06-04'),
(53, 'E N S N C L T I T N E T U E S O', 2, '2023-06-04'),
(54, 'R N T C A O I E E I X A A E I A', 2, '2023-06-04'),
(55, 'R N T C A O I E E I X A A E I A', 2, '2023-06-04'),
(56, 'S F A B S T N C 9 R S S I N G A', 2, '2023-06-04'),
(57, 'S F A B S T N C 9 R S S I N G A', 2, '2023-06-04'),
(58, 'T O Q I E C S D D A I N E R E D', 2, '2023-06-04'),
(59, 'T O Q I E C S D D A I N E R E D', 2, '2023-06-04'),
(60, 'B N E R I L N R E N L I N X P A', 2, '2023-06-04'),
(61, 'B N E R I L N R E N L I N X P A', 2, '2023-06-04'),
(62, 'F M A I I T T P S E Q O L I I S', 2, '2023-06-04'),
(63, 'F M A I I T T P S E Q O L I I S', 2, '2023-06-04'),
(64, 'H O E E N V N I L E V E S R I T', 2, '2023-06-04'),
(65, 'H O E E N V N I L E V E S R I T', 2, '2023-06-04'),
(66, 'A L I F L I E A U E L S N L A S', 1, '2023-06-04'),
(67, 'E I T U I L J L V N U E D S N B', 2, '2023-06-04'),
(68, 'P N A I G O X E I U E D D D I M', 2, '2023-06-04'),
(69, 'P I C F M F C E T A A I P A T E', 2, '2023-06-04'),
(70, 'N D R S A I P N E N V Q E A D B', 2, '2023-06-04'),
(71, 'V N S T E N D S S E N E O F A H', 2, '2023-06-04'),
(72, 'A E O A T S L A T I D I O F A E', 2, '2023-06-04'),
(73, 'A V T A L F P N I L F N E M D C', 2, '2023-06-04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `b_joueur`
--
ALTER TABLE `b_joueur`
  ADD PRIMARY KEY (`ID_Joueur`),
  ADD UNIQUE KEY `ID_Joueur` (`ID_Joueur`);

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
-- AUTO_INCREMENT for table `b_joueur`
--
ALTER TABLE `b_joueur`
  MODIFY `ID_Joueur` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `b_partie`
--
ALTER TABLE `b_partie`
  MODIFY `ID_Partie` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- Constraints for dumped tables
--

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
