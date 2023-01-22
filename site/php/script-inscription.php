<?php
    require_once('Cnx.php');
    $cnx = new Cnx(); // Connexion.

    //Récupération des données
    $mail = $_POST['email'];
    $pseudo = $_POST['pseudo'];
    $password = hash('sha512', $_POST['password']);
    echo $password;

    //Préparation de la requête
    $result = $cnx->count("SELECT pseudo FROM B_JOUEUR WHERE '$pseudo' = pseudo;");
    if ($result > 0) {
        header("Location: ../html/inscription.html");
    } else {
        $cnx->i("INSERT INTO B_JOUEUR (pseudo, mail, mdp, xp_actuel, photo_de_profil, compte_prive) VALUES('$pseudo', '$mail', '$password', 0, null, 0);");
        header("Location: ../html/connexion.html");
    }

