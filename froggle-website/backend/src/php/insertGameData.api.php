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

    var_dump($stats);
    //database connexion
    $host = 'localhost';
    $dbname = 'boggle';
    $usernamebdd = 'username';
    $pass = 'password';

    try {
        $db = new PDO("mysql:host=$host;dbname=$dbname", $usernamebdd, $pass);
    } catch (PDOException $e) {
        die("Erreur de connexion à la base de données: " . $e->getMessage());
    }

    $qryGame = $db->prepare("INSERT INTO B_PARTIE (grille, Nb_Joueur, date) VALUES (:grid, :nb_players, :todaysDate)");
    $nb_players =  count($stats);
    $date = date('Y-m-d');
    $qryGame->bindParam(':grid', $grid);
    $qryGame->bindParam(':nb_players',$nb_players);
    $qryGame->bindParam(':todaysDate',$date );
    if($qryGame->execute()){
        echo "SUCCESS GAME";
    }

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
        } else {
            echo "Aucun joueur trouvé avec ce pseudo.";
        }

        $rank = 2;
        $nbrWords = count($value[1]);

        $query = $db->prepare("INSERT INTO B_PARTICIPE (ID_Joueur, ID_Partie, score, Podium, mots_trouves) VALUES (:idPlayer, :idGame, :score, :rank, :foundWords)");
        $query->bindParam(':idPlayer', $id_joueur);
        $query->bindParam(':idGame', $idGame);
        $query->bindParam(':score', $value[0]);
        $query->bindParam(':rank', $rank);
        $query->bindParam(':foundWords',$nbrWords);

        if($query->execute()){
            echo "SUCCESS PARTICIPE";
        }
    }
}