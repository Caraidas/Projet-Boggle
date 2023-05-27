<?php

    $id_joueur = $_SESSION["user_id"];

    // Récupération de la liste des amis
    $liste_amis = $cnx->q("SELECT * FROM B_LISTE WHERE id_joueur = $id_joueur");
    if ($liste_amis == null) { // Si pas d'amis
        $id_amis = array();
    } else {
        $id_liste_amis = $liste_amis[0]->id_liste;
        $id_amis = $cnx->q("SELECT * FROM B_appartient WHERE id_liste = $id_liste_amis;");
    }
?>


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

