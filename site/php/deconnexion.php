<?php
session_start();

if (isset($_SESSION["id_joueur"])) {
    unset($_SESSION["id_joueur"]);
}

session_destroy();
header("Location: ../html/connexion.html");