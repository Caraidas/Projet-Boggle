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

    $pseudo = $data['pseudo'];
    $id_joueur = $data['id_joueur'];

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


    if($pseudo != ""){
        $query = $db->prepare("SELECT COUNT(*) AS s from b_joueur WHERE pseudo = :pseudo");
        $query->bindParam(':pseudo', $pseudo);
        $query->execute();
        $result = $query->fetch();
        if ($result['s'] == 0){
            $query = $db->prepare("UPDATE b_joueur SET pseudo = :pseudo WHERE ID_Joueur = :id_joueur");
            $query->bindParam(':pseudo', $pseudo);
            $query->bindParam(':id_joueur', $id_joueur);
            $query->execute();
        }
    }
  }

?>