
<?php
/*
    Cette page permet de récupérer les définitons extraite grâce au programme java. Il nécessite les fichiers suivant:
    -definitions.index -> fichier binaire comprenant l'ensemble des coordonnées des définitions du fichier definitions.txt
    -definitions.txt -> ensemble des définitons extaite du wikitionary en format json (mais extension .txt)
    -dictionnary.jar -> jar contenant l'ensemble des programmes java utiles à la recherches de définitions mais aussi, dans un autre contexte d'utilisation, à l'extration de définition d'un fichier de définitions wikitionary
 */
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
    if(empty($output)){
        $output[] = "";
    }
    if($output[0] != null){
        
        $output_json = json_encode($output,JSON_UNESCAPED_UNICODE);

        echo $output_json;
    }

?>







