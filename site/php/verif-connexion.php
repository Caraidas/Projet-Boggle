<?php
    session_start();
    require_once('Cnx.php');
    $cnx = new Cnx(); // Connexion.

    if (isset($_POST['email']) and isset($_POST['password'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];
    }

    //Hash the password using sha-3
    $passwordHash = hash('sha512', $password);

    //Check for valid email and password 
    $result = $cnx->q("SELECT id_joueur FROM B_JOUEUR WHERE mail='$email' AND mdp='$passwordHash';");

    if ($result == null or count($result) <= 0) {
        //Login failed
        echo "Login failed. Please check your email and password.";

        //Redirect to login page
        header("Location: ../html/connexion.html");
    }
    else {
        //Login successful
        echo "Login successful!";
        $_SESSION["id_joueur"] = $result[0]->id_joueur;

        //Redirect to menu page
        header("Location: ../index.php");
    }
