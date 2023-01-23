<?php
session_start();

if (!isset($_SESSION["connecte"])) { // Si pas connecté alors on redirige vers la page de connexion
    header("Location: html/connexion.html");
}


if (isset($_SESSION["grid"])) {
    unset($_SESSION['grid']);
}

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
    <a href="game.php">Jouer</a>
</body>
</html>
