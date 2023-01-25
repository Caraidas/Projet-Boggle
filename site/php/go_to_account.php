<?php
    session_start();
    require_once("Cnx.php");

    $cnx = new Cnx();

    if (!isset($_SESSION["id_joueur"])) { // Si pas connecté, redirection vers la connexion
        header("Location: ../html/connexion.html");
    }

    if (isset($_GET["target"])) {
        $_SESSION['target']= $_GET["target"];
    }

    header("Location: compte.php");