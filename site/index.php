<?php
session_start();
require_once("php/Cnx.php");

if (!isset($_SESSION["id_joueur"])) { // Si pas connecté alors on redirige vers la page de connexion
    header("Location: html/connexion.html");
} else {
    $id_joueur = $_SESSION["id_joueur"];
}

$cnx = new Cnx();
$pseudo = $cnx->q("SELECT pseudo FROM B_JOUEUR WHERE id_joueur = $id_joueur;");
$pseudo = $pseudo[0]->pseudo;

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Froggle - Menu</title>
</head>

<body>
    <div>
        <a href="php/compte.php"><?php echo "Compte de $pseudo";?></a>
    </div>
    <section class="menu">
        <a href="php/game.php">Jouer(WIP)</a>
        <a href="php/carriere.php">Carrière</a>
        <a href="php/social.php">Social</a>
        <a href="php/definitions.php">Définitions</a>
    </section>
    <a href="php/deconnexion.php">deconnexion</a>
</body>
</html>
