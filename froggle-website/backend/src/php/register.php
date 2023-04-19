<?php
// Vérifie si le formulaire d'inscription a été soumis
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Récupère les valeurs du formulaire
  $username = $_POST['username'];
  $email = $_POST['email'];
  $password = $_POST['password'];

  // Vérifie si les champs sont vides
  if (empty($username) || empty($email) || empty($password)) {
    $message = 'Veuillez remplir tous les champs';
  } else {
    // Connexion à la base de données
    $host = 'localhost';
    $dbname = 'boggle';
    $username = 'root';
    $password = 'pass';

    try {
      $db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    } catch (PDOException $e) {
      die("Erreur de connexion à la base de données: " . $e->getMessage());
    }

    // Vérifie si l'adresse email est déjà utilisée
    $query = $db->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
    $query->bindParam(':email', $email);
    $query->execute();
    $count = $query->fetchColumn();

    if ($count > 0) {
      $message = 'Cette adresse e-mail est déjà utilisée';
    } else {
      // Hachage du mot de passe
      $hashed_password = hash('sha256', $password);

      // Insertion de l'utilisateur dans la base de données
      $query = $db->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
      $query->bindParam(':username', $username);
      $query->bindParam(':email', $email);
      $query->bindParam(':password', $hashed_password);
      $query->execute();

      // Redirige l'utilisateur vers la page de connexion
      header("Location: login.php");
      exit;
    }
  }
}
?>