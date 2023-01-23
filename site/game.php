<?php
    require_once("init_jeu.php");
    $grid = $_SESSION['grid'];

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
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

                        if ($grid[$ind] == "&") {
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
            <form>
                <input type="text" class="word-input">
                <input type="submit" value="">
            </form>
        </div>
        <a href="php/deconnexion.php">deconnexion fdp</a>
        <a href="index.php">Quitter la partie</a>
    </section>
</body>

</html>