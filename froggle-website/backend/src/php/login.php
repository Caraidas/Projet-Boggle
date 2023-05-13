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
  // Vérifie les identifiants d'utilisateur dans la base de données
  $username = $data['email'];
  $password = $data['password'];

  // Établir la connexion à la base de données via PDO
  $pdo = new PDO('mysql:host=localhost;dbname=boggle;charset=utf8', 'username', 'password');

  // Prépare la requête de sélection de l'utilisateur
  $statement = $pdo->prepare('SELECT * FROM user WHERE email = :email');

  // Lie le paramètre :username à la valeur de l'input username
  $statement->bindValue(':email', $username, PDO::PARAM_STR);

  // Exécute la requête préparée
  $statement->execute();

  // Récupère la première ligne du résultat de la requête
  $user = $statement->fetch(PDO::FETCH_ASSOC);

  // Vérifie si l'utilisateur a été trouvé et si le mot de passe est correct
  if ($user && (hash('sha256', $password) === $user['password'])) {
    // Authentification réussie, stocke les informations d'utilisateur dans la session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['email'] = $user['email'];

    // Retourne une réponse JSON avec un code de statut 200 et un message d'authentification réussie

    echo json_encode(array('status' => 'success', 'message' => 'Authentification réussie'));
    http_response_code(200);
    exit();
  } else {
    // Retourne une réponse JSON avec un code de statut 401 et un message d'échec d'authentification
    
    echo json_encode(array('status' => 'error', 'message' => 'L\'adresse e-mail ou le mot de passe est incorrect.'));
    exit();
  }
}