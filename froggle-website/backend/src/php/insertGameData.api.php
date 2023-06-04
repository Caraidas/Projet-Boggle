<?php

function cors() {
  // Allow from any origin
  if (isset($_SERVER['HTTP_ORIGIN'])) {
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
      header("Access-Control-Allow-Headers: Origin, Authorization, X-Requested-With, Content-Type, Accept");
      header('Access-Control-Allow-Credentials: true');
      header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }

  // Access-Control headers are received during OPTIONS requests
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
          // may also be using PUT, PATCH, HEAD etc
          header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
          header("Access-Control-Allow-Headers: Origin, Authorization, X-Requested-With, Content-Type, Accept");

      exit(0);
  }
}
cors();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents('php://input'), true);
    // Get the react form data
    $stats = $data['stats'];
    $grid = $data['grid'];
    $id_local_player = $data['id'];
    $rank = $data['podium'];
    $xp_Actu = $data['xp'];

    //database connexion
    $host = 'localhost';
    $dbname = 'boggle';
    $usernamebdd = 'user';
    $pass = 'password';

    try {
        $db = new PDO("mysql:host=$host;dbname=$dbname", $usernamebdd, $pass);
    } catch (PDOException $e) {
        die("Erreur de connexion à la base de données: " . $e->getMessage());
    }

    foreach($stats as $key => $value){
        // get player id by username
        $id_joueur = null;
        $qry = $db->prepare("SELECT ID_joueur FROM B_JOUEUR WHERE pseudo = :pseudo");
        $qry->bindParam(':pseudo', $key);
        $qry->execute();

        $result = $qry->fetch();
        if ($result) {
            $id_joueur = $result['ID_joueur'];
        }
        $xp_Actu += $value[0]*10;
        if ($id_joueur == $id_local_player){
            $XP_Joueur = $xp_Actu;
            
            if ($rank[$key] == 1){
                $qryGame = $db->prepare("INSERT INTO B_PARTIE (grille, Nb_Joueur, date) VALUES (:grid, :nb_players, :todaysDate)");

                $nb_players =  count($stats);
                $date = date('Y-m-d');
                $qryGame->bindParam(':grid', $grid);
                $qryGame->bindParam(':nb_players',$nb_players);
                $qryGame->bindParam(':todaysDate',$date );
                $qryGame->execute();
                $idGame = $db->lastInsertId();

                foreach($stats as $key => $value){
                    // get player id by username
                    $id_joueur = null;
                    $qry = $db->prepare("SELECT ID_joueur FROM B_JOUEUR WHERE pseudo = :pseudo");
                    $qry->bindParam(':pseudo', $key);
                    $qry->execute();

                    $result = $qry->fetch();
                    if ($result) {
                        $id_joueur = $result['ID_joueur'];
                    }

                    $nbrWords = count($value[1]);
                    
                    $query = $db->prepare("INSERT INTO B_PARTICIPE (ID_Joueur, ID_Partie, score, Podium, mots_trouves) VALUES (:idPlayer, :idGame, :score, :rank, :foundWords)");
                    $query->bindParam(':idPlayer', $id_joueur);
                    $query->bindParam(':idGame', $idGame);
                    $query->bindParam(':score', $value[0]);
                    $query->bindParam(':rank', $rank[$key]);
                    $query->bindParam(':foundWords',$nbrWords);
                    $query->execute();

                    
                    $query = $db->prepare("UPDATE b_joueur SET XP_Actuel = ':score' WHERE b_joueur.ID_Joueur = :id_joueur");
                    $query->bindParam(':id_joueur', $id_joueur);
                    $query->bindParam(':score', $xp_Actu);
                    $query->execute();
                }
            }
        }
    }
    

    

    // collecte historique du joueur



    $statement = $db->prepare('SELECT ID_Partie, Podium, date, mots_trouves, score FROM b_participe NATURAL JOIN b_partie WHERE ID_Joueur = :id_joueur ORDER by date DESC LIMIT 10');
    $statement->bindValue(':id_joueur', $id_local_player);
    $statement->execute();
    $historique = $statement->fetchAll(PDO::FETCH_ASSOC);
    
    
    // collecte des images des joueurs des parties de l'historique
    $joueurs = [];
    for ($i = 0; sizeof($historique) > $i; $i++){
      $statement = $db->prepare('SELECT Photo_De_Profile FROM b_joueur NATURAL JOIN b_participe WHERE b_participe.ID_Partie = :id_partie');
      $statement->bindValue(':id_partie', $historique[$i]['ID_Partie']);
      $statement->execute();
      $photo = $statement->fetchAll(PDO::FETCH_ASSOC);
      $historique[$i][] = $photo;
    }

    $statement = $db->prepare('SELECT COUNT(Podium) AS nbClassement, Podium FROM b_participe WHERE ID_Joueur = :id_joueur GROUP BY Podium ORDER BY Podium');
    $statement->bindValue(':id_joueur', $id_local_player);
    $statement->execute();
    $PodiumPartie = $statement->fetchAll(PDO::FETCH_ASSOC);


    echo json_encode(array('status' => 'success', 'historique' => $historique, 'classementData' => $PodiumPartie, 'XP_Actuel' => $xp_Actu));
    exit();
}