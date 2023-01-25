<?php
session_start();
require_once("Cnx.php");

$cnx = new Cnx();

if (!isset($_SESSION["id_joueur"])) {
    header("Location: ../index.php");
} else {
    $id_joueur = $_SESSION["id_joueur"];
}

if (isset($_POST["acceptation"]) && isset($_POST["id_ami"])) {
    $acc = $_POST["acceptation"];
    $id_ami = $_POST["id_ami"];
}

// Récupération de la liste des amis
$liste_amis = $cnx->q("SELECT * FROM B_LISTE WHERE id_joueur = $id_joueur");
if ($liste_amis == null) { // Si pas d'amis
    $id_amis = array();
} else {
    $id_liste_amis = $liste_amis[0]->id_liste;
    //echo($id_liste_amis);
    $id_amis = $cnx->q("SELECT * FROM B_appartient WHERE id_liste = $id_liste_amis;");
}

// Acceptation / Refus

if ($acc == "accepter") {
    $result = $cnx->q("UPDATE B_appartient SET acceptation = 2 WHERE id_joueur = $id_ami AND id_liste = $id_liste_amis;"); // On update la case en 2
} else {
    $cnx->q("DELETE FROM B_appartient WHERE id_joueur = $id_ami AND id_liste = $id_liste_amis;"); // On efface l'ami de notre liste

    $liste_amis = $cnx->q("SELECT * FROM B_LISTE WHERE id_joueur = $id_ami");
    $id_liste_amis = $liste_amis[0]->id_liste;
    $cnx->q("DELETE FROM B_appartient WHERE id_joueur = $id_joueur AND id_liste = $id_liste_amis;"); // On s'efface de la liste de l'ami
}

header("Location: social.php");
