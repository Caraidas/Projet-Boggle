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

session_start();

// Vérifie si l'utilisateur est déjà authentifié
if (isset($_SESSION['user_id'])) {
  exit();
}

$data = json_decode(file_get_contents('php://input'), true);

// Vérifie si le formulaire de connexion a été soumis
if ($data['email'] && $data['password']) {
  // Vérifie les ideemail'];
  $password = $data['password'];
  $username = $data['email'];

  // Établir la connexion à la base de données via PDO
  $pdo = new PDO('mysql:host=localhost;dbname=boggle;charset=utf8', 'user', 'password');

  // Prépare la requête de sélection de l'utilisateur
  $statement = $pdo->prepare('SELECT *  FROM B_JOUEUR WHERE mail = :email');

  // Lie le paramètre :username à la valeur de l'input username
  $statement->bindValue(':email', $username, PDO::PARAM_STR);

  // Exécute la requête préparée
  $statement->execute();

  // Récupère la première ligne du résultat de la requête
  $user = $statement->fetch(PDO::FETCH_ASSOC);


  // Vérifie si l'utilisateur a été trouvé et si le mot de passe est correct
  if ($user && (hash('sha256', $password) === $user['mdp'])) {
    $_SESSION['user_id'] = $user['ID_Joueur'];
    $_SESSION['email'] = $user['mail'];

    

    // collecte historique du joueur

    $statement = $pdo->prepare('SELECT ID_Partie, Podium, date, mots_trouves, score FROM b_participe NATURAL JOIN b_partie WHERE ID_Joueur = :id_joueur');
    $statement->bindValue(':id_joueur', $user['ID_Joueur'], PDO::PARAM_STR);
    $statement->execute();
    $historique = $statement->fetchAll(PDO::FETCH_ASSOC);
    
    
    // collecte des images des joueurs des parties de l'historique
    $joueurs = [];
    for ($i = 0; sizeof($historique) > $i; $i++){
      $statement = $pdo->prepare('SELECT Photo_De_Profile FROM b_joueur NATURAL JOIN b_participe WHERE b_participe.ID_Partie = :id_partie');
      $statement->bindValue(':id_partie', $historique[$i]['ID_Partie'], PDO::PARAM_STR);
      $statement->execute();
      $photo = $statement->fetchAll(PDO::FETCH_ASSOC);
      $historique[$i][] = $photo;
    }

    $statement = $pdo->prepare('SELECT COUNT(Podium) AS nbClassement, Podium FROM b_participe WHERE ID_Joueur = 4 GROUP BY Podium');
    $statement->bindValue(':id_joueur', $user['ID_Joueur'], PDO::PARAM_STR);
    $statement->execute();
    $PodiumPartie = $statement->fetchAll(PDO::FETCH_ASSOC);

    // $sessionData = $_SESSION['user_id']; Retourne une réponse JSON avec un code de statut 200 et un message d'authentification réussie
    $sessionData = array('pseudo' => $user['pseudo'], 'XP_Actuel' => $user['XP_Actuel'], 'Photo_De_Profile' => $user['Photo_De_Profile'], 'Est_Prive' => $user['Est_Prive']);
    
    echo json_encode(array('status' => 'success', 'message' => 'Authentification réussie','sessionData' => $sessionData, 'historique' => $historique, 'classementData' => $PodiumPartie));
    http_response_code(200);
    // Ret$sessionData = $_SESSION['user_id'];ourne une réponse JSON avec un code de statut 200 et un message d'authentification réussie
    exit();
  } else {
    // Retourne une réponse JSON avec un code de statut 401 et un message d'échec d'authentification
    
    echo json_encode(array('status' => 'error', 'message' => 'L\'adresse e-mail ou le mot de passe est incorrect.'));
    exit();
  }
}