<?php
session_start();

if (!isset($_SESSION['grid'])) {
    // Création de la grille
    exec("./../../moteur-de-jeu/grid_build ../../moteur-de-jeu/frequences.txt 4 4", $out);
    //print_r($out);
    $array_mots = explode(" ", $out[0]);

    $_SESSION["grid"] = $array_mots;
}

