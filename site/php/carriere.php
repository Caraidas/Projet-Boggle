<?php
    session_start();
    require_once("Cnx.php");

    $cnx = new Cnx();

    if (!isset($_SESSION["id_joueur"])) { // Si pas connecté, redirection vers la connexion
        header("Location: ../html/connexion.html");
    }

    $id_joueur = $_SESSION["id_joueur"];

    $result = $cnx->q("SELECT * FROM B_JOUEUR WHERE id_joueur = '$id_joueur';");
    $_SESSION["pseudo"] = $result[0]->pseudo;
    $_SESSION["xp_actuel"] = $result[0]->xp_actuel;
    $_SESSION["photo_de_profil"] = $result[0]->photo_de_profil;

    $pseudo = $_SESSION["pseudo"];
    $photo_de_profil = $_SESSION["photo_de_profil"];
    $xp_actuel = $_SESSION["xp_actuel"];
    
    $history = $cnx->q("SELECT * FROM B_participe participe JOIN B_PARTIE partie ON participe.id_partie = partie.id_partie JOIN B_JOUEUR joueur ON joueur.id_joueur = participe.id_joueur WHERE joueur.id_joueur = '$id_joueur';");

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

    function xpRestantPourNiveauSuivant($pointsXP) {
        $niveau = 1;
        $pointsXPNiveau = 100;
        while ($pointsXP >= $pointsXPNiveau) {
            $pointsXP -= $pointsXPNiveau;
            $pointsXPNiveau += $pointsXPNiveau * 0.2;
            $niveau++;
        }
        return ceil($pointsXPNiveau - $pointsXP);
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Froggle - Carrière</title>
</head>

<body>
    <h1>Carrière :</h1>
    Pseudo : <?php echo $pseudo;?>
    <br>
    Niveau: <?php echo calculerNiveauJoueur($xp_actuel);?>
    <br>
    Xp actuel: <?php echo $xp_actuel;?>
    <br>
    Xp restant: <?php echo xpRestantPourNiveauSuivant($xp_actuel);?>
    <br><br>
    <div class="history-card-container">
        <?php

            while($row = $qry->fetch()){
                $id_partie = $row->id_partie;
                $grid = $row->grille;
                $nb_joueur = $row->nb_joueur;
                $score = $row->score;
                $victory = $row->a_gagne;
                $status = "";
                $color="";
                if($victory == 1){
                    $status = "VICTOIRE";
                    $color = "green";
                }else $color = "red"; $status = "DEFAITE";

                echo "<div class='history-card'>
                        <h2>Partie N°".$id_partie."</h2>
                        <div class='history-grid'>
                            <h3>Grille</h3>"
                                .$grid.
                        "</div>
                        <div class='history-content'>
                            <div class='content-elem'>
                                <h4>Nombre de joueurs: </h4>"
                                    .$nb_joueur.
                            "</div>
                            <div class='content-elem'>
                                <h4>Score: </h4>"
                                .$score.
                            "</div>
                            <div class='content-elem'>
                                <h2 style=color:$color>"
                                    .$status.
                                "</h2>
                            <div>
                        </div>
                    </div>";  
            }
        ?>
    </div>
    <a href="../index.php">Retour au menu</a>
</body>
</html>
