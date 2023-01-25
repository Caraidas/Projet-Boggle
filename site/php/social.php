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

    $id_joueur = $_SESSION["id_joueur"];

    // Récupération de la liste des amis
    $liste_amis = $cnx->q("SELECT * FROM B_LISTE WHERE id_joueur = $id_joueur");
    if ($liste_amis == null) { // Si pas d'amis
        $id_amis = array();
    } else {
        $id_liste_amis = $liste_amis[0]->id_liste;
        $id_amis = $cnx->q("SELECT * FROM B_appartient WHERE id_liste = $id_liste_amis;");
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
    <h1>Mes amis :</h1>
    <ul>
        <?php
            for ($i = 0; $i < count($id_amis); $i++) {
                $id = $id_amis[$i]->id_joueur; // Récupération de l'id de l'amis
                $result = $cnx->q("SELECT pseudo FROM B_JOUEUR WHERE id_joueur = $id;"); // Recupération du pseudo de l'ami

                // Variables pour le lien
                $result = $result[0]->pseudo;
                $str = "go_to_account.php?target=$id";

                if ($id_amis[$i]->acceptation == 1) { // Si flag = 1 (aka : cette personne m'a demandé en ami)
                    echo "<li><a href=$str>$result</a>";
                    echo " vous a demandé en ami ";
        ?>
                    <form method="POST" action="accepter.php">
                        <?php echo "<input type='number' name='id_ami' value='$id' style='display: none;'>" ?>
                        <label for="accepter">Accepter</label>
                        <input type="checkbox" id="accepter" name="acceptation" value="accepter" onclick="submit()" style="display: none;">

                        <label for="refuser">Refuser</label>
                        <input type="checkbox" id="refuser" name="acceptation" value="refuser" onclick="submit()" style="display: none; ">
                    </form>
        <?php
                    echo "</li>";
                } else { // Si flag = 2 (aka : Je t'ai demandé en ami)
                    $liste_amis = $cnx->q("SELECT * FROM B_LISTE WHERE id_joueur = $id");
                    $id_liste_amis = $liste_amis[0]->id_liste;

                    $acceptation = $cnx->q("SELECT * FROM B_appartient WHERE id_joueur = $id_joueur AND id_liste = $id_liste_amis;");
                    $acceptation = $acceptation[0]->acceptation;
                    if ($acceptation == 2) { // Si le flag chez lui est = 2 (aka : On est amis)
                        echo "<li><a href=$str>$result</a></li>";
                    } else { // Si le flag chez lui est = 1 (aka : Il n'a pas encore accepté)
                        echo "<li><a href=$str>$result</a> (En attente d'acceptation) </li>";
                    }
                }
            }
        ?>
    </ul>
    <a href="../index.php">Retour au menu</a>
</body>
</html>

