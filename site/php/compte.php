<?php
    session_start();
    require_once("Cnx.php");

    $cnx = new Cnx();

    if (!isset($_SESSION["id_joueur"])) { // Si pas connecté, redirection vers la connexion
        header("Location: ../html/connexion.html");
    }

    if (isset($_SESSION['target'])) {
        $id_joueur = $_SESSION["target"];
    } else {
        $id_joueur = $_SESSION["id_joueur"];
    }

    $result = $cnx->q("SELECT * FROM B_JOUEUR WHERE id_joueur = '$id_joueur';");
    $_SESSION["pseudo"] = $result[0]->pseudo;
    $_SESSION["photo_de_profil"] = $result[0]->photo_de_profil;
    $_SESSION["date_creation"] = $result[0]->date_creation;
    $_SESSION["email"] = $result[0]->mail;
    $_SESSION["compte_prive"] = $result[0]->compte_prive;
    $_SESSION["xp_actuel"] = $result[0]->xp_actuel;

    $pseudo = $_SESSION["pseudo"];
    $photo_de_profil = $_SESSION["photo_de_profil"];
    $date_creation = $_SESSION["date_creation"];
    $email = $_SESSION["email"];
    $compte_prive = $_SESSION["compte_prive"];
    $xp_actuel = $_SESSION["xp_actuel"];

    function calculerNiveauJoueur($pointsXP) {
        $niveau = 1;
        $pointsXPNiveau = 100;
        while ($pointsXP >= $pointsXPNiveau) {
            $pointsXP -= $pointsXPNiveau;
            $pointsXPNiveau += $pointsXPNiveau * 0.2;
            $niveau++;
        }
        return $niveau;
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Froggle - <?php echo $pseudo;?></title>
</head>

<body>
    <h1>Compte de <?php echo $pseudo;?></h1>
    <?php
        if ($compte_prive == 1) {
            echo "Les informations de ce compte sont privés<br>";
        } else {
            echo
            "
            <ul>
                <li>
                    Pseudo : $pseudo
                </li>
        
                <li>
                    Date de creation : $date_creation
                </li>";

            if ($id_joueur == $_SESSION["id_joueur"]) { // si on est sur notre compte
                echo
                "
                        <li>
                            Email : $email
                        </li>
                    </ul>
                ";
            } else {
                $niveau = calculerNiveauJoueur($xp_actuel);
                echo
                "
                        <li>
                            Niveau : $niveau
                        </li>
                    </ul>
                ";
            }
        }

        if ($id_joueur != $_SESSION["id_joueur"]) { // si on est sur le compte de qqun d'autre
            $str = "social.php";
            $lien = "Retour au social";
        } else {
            $str = "../index.php";
            $lien = "Retour au menu";
        }

        echo "<a href=$str>$lien</a>";
    ?>
</body>
</html>
