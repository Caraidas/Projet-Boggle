<?php
    // Lancement de grid build
    exec("../moteur-de-jeu/test.exe 4", $out);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Froggle - Menu</title>
</head>

<body>
    <section class="board">
        <div class="columns">
            <diqv class="row">
                <div class="cell">
                    <p>A</p>
                </div>

                <div class="cell">
                    <p>A</p>
                </div>

                <div class="cell">
                    <p>A</p>
                </div>

                <div class="cell">
                    <p>A</p>
                </div>
            </diqv>

            <div class="row">
                <div class="cell">
                    <p>A</p>
                </div>

                <div class="cell">
                    <p>A</p>
                </div>

                <div class="cell">
                    <p>A</p>
                </div>

                <div class="cell">
                    <p>A</p>
                </div>
            </div>

            <div class="row">
                <div class="cell">
                    <p>A</p>
                </div>

                <div class="cell">
                    <p>A</p>
                </div>

                <div class="cell">
                    <p>A</p>
                </div>

                <div class="cell">
                    <p>A</p>
                </div>
            </div>

            <div class="row">
                <div class="cell">
                    <p>A</p>
                </div>

                <div class="cell">
                    <p>A</p>
                </div>

                <div class="cell">
                    <p>A</p>
                </div>

                <div class="cell">
                    <p>A</p>
                </div>
            </div>
            <form>
                <?php
                    print_r($out);
                ?>
                <input type="text" class="word-input">
                <input type="submit" value="">
            </form>
        </div>
    </section>
</body>

</html>