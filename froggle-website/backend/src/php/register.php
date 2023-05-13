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
  $username = $data['username'];
  $email = $data['email'];
  $password = $data['password'];
  $passwordConfirmation = $data['passwordConfirm'];
  
  // Verifies if the fields are empty
  if (empty($username) || empty($email) || empty($password) || empty($passwordConfirmation)) {
    echo json_encode(array('status' => 'error', 'message' => 'Veuillez remplir tout les champs du formulaire.'));
    exit;
  } else {

    if($password != $passwordConfirmation ){
      echo json_encode(array('status' => 'error', 'message' => 'Les mots de passe ne correspondent pas, veuillez réessayer.'));
      exit;
    }

    $host = 'localhost';
    $dbname = 'boggle';
    $username = 'username';
    $pass = 'password';

    try {
      $db = new PDO("mysql:host=$host;dbname=$dbname", $username, $pass);
    } catch (PDOException $e) {
      die("Erreur de connexion à la base de données: " . $e->getMessage());
    }

    // Checks if the email is already in use, then returns an error state and a reusable message
    $query = $db->prepare("SELECT COUNT(*) FROM user WHERE email = :email");
    $query->bindParam(':email', $email);
    $query->execute();
    $count = $query->fetchColumn();

    if ($count > 0) {
      echo json_encode(array('status' => 'error', 'message' => 'Cette adresse email est déjà utilisée'));
      exit;

    } else {
      // Password hash 
      $hashed_password = hash('sha256', $password);

      // Insert the new user in database
      $query = $db->prepare("INSERT INTO user (username, email, password) VALUES (:username, :email, :password)");
      $query->bindParam(':username', $username);
      $query->bindParam(':email', $email);
      $query->bindParam(':password', $hashed_password);

      if($query->execute()){
        echo json_encode(array('status' => 'success', 'message' => 'Authentification réussie'));
        http_response_code(200);
        exit();
      }else{
        echo json_encode(array('status' => 'error', 'message' => 'L\'adresse e-mail ou le mot de passe est incorrect.'));
      }
      exit;
    }
  }
}
?>