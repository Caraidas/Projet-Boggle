<?php
    session_start();
    require_once("Cnx.php");

    $cnx = new Cnx();

    if (!isset($_SESSION["id_joueur"])) { // Si pas connecté, redirection vers la connexion
        header("Location: ../html/connexion.html");
    }

    if (isset($_SESSION["target"])) {
        unset($_SESSION["target"]);
    }

    if (isset($_SESSION["id_amis"])) {
        $id_amis = $_SESSION["id_amis"];
    }

    $id_joueur = $_SESSION["id_joueur"];

    // Récupération de la liste des amis
    $id_liste_amis = $cnx->q("SELECT * FROM B_LISTE WHERE id_joueur = $id_joueur");
    $id_liste_amis = $id_liste_amis[0]->id_liste;
    //echo($id_liste_amis);

    $id_amis = $cnx->q("SELECT id_joueur FROM B_appartient WHERE id_liste = $id_liste_amis;");
    //print_r($id_amis);
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
    <h1>Mes amis :</h1>
    <ul>
        <?php
            for ($i = 0; $i < count($id_amis); $i++) {
                $id = $id_amis[$i]->id_joueur;
                $result = $cnx->q("SELECT pseudo FROM B_JOUEUR WHERE id_joueur = $id;");
                $result = $result[0]->pseudo;
                $str = "go_to_account.php?target=$id";
                echo "<li><a href=$str>$result</a></li>";
            }
        ?>
    </ul>
    <a href="../index.php">Retour au menu</a>
</body>
</html>

