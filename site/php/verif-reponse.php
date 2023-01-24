<?php
session_start();

$word = $_POST['word'];
$grid = $_SESSION['grid'];

$word = strtoupper($word);
$formated_grid = join(" ", $grid);

if (strpos($word, 'QU') !== false) {
    $word_replace = preg_replace('/QU/', '9', $word); // marche pas vraiment, il faut y'aller occurences de QU par occurences de QU
    exec("./../../moteur-de-jeu/grid_path $word_replace 4 4 $formated_grid", $out, $res);

    $_SESSION['word'] = $word;
    $_SESSION['path'] = $out;

    if (!empty($out)) {
        echo "oui";
        //header("Location: game.php");
    }
}

exec("./../../moteur-de-jeu/grid_path $word 4 4 $formated_grid", $out, $res);

$_SESSION['word'] = $word;
$_SESSION['path'] = $out;



header("Location: game.php");
