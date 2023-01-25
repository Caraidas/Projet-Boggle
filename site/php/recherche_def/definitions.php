<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="definitions-style.css">
    <title>Document</title>
</head>
<body>

    <div class="wrapper">
        <div class="header">
            <form action="definitions.php" method="get" class="search-container">
                <input class="search-bar" type="search" id="site-search" name="word" placeholder="Chercher une définition">
                <input class="btn-submit" type="submit" value="Rechercher">
            </form>
        </div>
        <div class="content">
            <?php

                if(isset($_GET['word'])){
                    $word = $_GET['word'];
                }else $word = "";
                
                exec("java -Dfile.encoding=UTF-8 -cp dictionnary.jar fr.uge.jdict.DictionarySearcher definitions ".$word, $output);
                $output = str_replace("\u2019", "'", $output);
                $output = str_replace("[[","", $output);
                $output = str_replace("]]","", $output);

                for($i = 0; $i < count($output) ; $i++){
                    $originalString = $output[$i];
                    while (preg_match('/\|\w+/u', $originalString)) {
                        $originalString = preg_replace('/\|\w+/u', '', $originalString);
                    }
                    $output[$i] = $originalString;
                    $output[$i] = json_decode($output[$i], true);
                }
               
                if(count($output)>1){
                    array_pop($output);
                }
                echo "<div class='card-container'>";
                if(empty($output)){
                    $output[] = "";
                }
                if($output[0] != null){

                    foreach ($output as $word){

                        $title = $word['title'];
                        echo "<div class='card'>
                                <h3>"
                                    .$title.
                                "</h3>";
                        foreach ($word["définitions"] as $type => $defs) {
                            echo "<h4>" . $type . "</h4>
                                <ul>";
                            foreach ($defs as $def) {
                                $def = str_replace('"',"", $def);
                                echo "<li>" . $def . "</li>";
                            }
                            echo "</ul>";
                        }
                        echo "</div>";
                    }
                }
                else{
                    echo "<center>Le mot ne se trouve pas dans notre dictionnaire de définitions</center>";
                }
                echo "</div>";
            ?>
        </div>
        <div class="footer"></div>
    </div>
</body>
</html>






