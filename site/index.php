<?php
session_start();
require_once("php/Cnx.php");

if (!isset($_SESSION["id_joueur"])) { // Si pas connecté alors on redirige vers la page de connexion
    header("Location: html/connexion.html");
} else {
    $id_joueur = $_SESSION["id_joueur"];
}

$cnx = new Cnx();

$result = $cnx->q("SELECT * FROM B_JOUEUR WHERE id_joueur = '$id_joueur';");
//print_r($result);
$_SESSION["pseudo"] = $result[0]->pseudo;
$_SESSION["xp_actuel"] = $result[0]->xp_actuel;
$_SESSION["photo_de_profil"] = $result[0]->photo_de_profil;
$_SESSION["date_creation"] = $result[0]->date_creation;

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
    <section class="menu">
        <a href="php/game.php">Jouer(WIP)</a>
        <a href="php/carriere.php">Carrière</a>
        <a href="php/social.php">Social</a>
        <a href="php/definitions.php">Définitions</a>
    </section>
    <?php
        echo $_SESSION["pseudo"];
        echo $_SESSION["photo_de_profil"];
        echo $_SESSION["xp_actuel"];
        echo $_SESSION["date_creation"];
    ?>
</body>
</html>
