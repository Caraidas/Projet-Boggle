<?php
    require_once("init_jeu.php");
    $grid = $_SESSION['grid'];

    $word = "";

    if (isset($_SESSION['word'])) {
        $word = $_SESSION['word'];
    }

    $path = "";
    $classe_input = "";
    if (isset($_SESSION['path'])) {
        $path = $_SESSION['path'];

        if (empty($path)) {
            $classe_input = "red";
        }
    }

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    <title>Froggle - Partie</title>
</head>

<body>
    <section class="board">
        <div class="columns">
            <?php
                for ($i = 0; $i < 4; $i++) {
                    echo"<div class='row'>";
                    for ($j = 0; $j < 4; $j++) {
                        $ind = $i * 4 + $j;
                        $lettre = $grid[$ind];
                        $classe = "";

                        if ($grid[$ind] == "9") {
                            $lettre = "QU";
                            $classe = "QU";
                        }

                        echo
                        "<div class='cell'>
                            <p class='$classe'>$lettre</p>
                        </div>";
                    }
                    echo"</div>";
                }
            ?>
            <form action="verif-reponse.php" method="POST" id="word_form">
                <input type="text" class="word-input <?php echo "$classe_input";?>" id="word" name="word" value="<?php echo $word; ?>">
                <input type="submit" value="" style="display: none">
            </form>
            
            <?php
                if ($classe_input == "red") {
                    echo "<div class='red'>Ce mot n'est pas dans la grille ...</div>";
                }
                print_r($path);
                $g = join(" ", $grid);
                echo "$g";
            ?>
        </div>
        <a href="deconnexion.php">deconnexion fdp</a>
        <a href="quitter_game.php">Quitter la partie</a>
    </section>
</body>

</html>