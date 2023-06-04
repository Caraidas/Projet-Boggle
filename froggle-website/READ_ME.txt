-----------------------------PROJET BOGGLE----------------------------------------

Ceci est un texte explicatif visant à décrire le projet et montrer les étapes de configuration du site pour son déploiement.
 
----------------------------Description du site---------------------------------

Ce projet consiste à implanter une plateforme de jeu en ligne ‘Boggle’, un jeu de lettres consistant à trouver le maximum de mots sur une grille tirée aléatoirement.
L'ensemble du site est codé en utilisant le Framework React js. La plupart des fichiers utilisent le langage Typescript et javascript. Nous avons également choisit d'utiliser la librairie styled-components pour structurer nos composants et leurs feuilles de style respective.

Le jeu utilise un système de websocket dérivé du chatac de M.CHILOWICZ(https://gitlab.com/codefish42/chatac). Ce système nous permet d'avoir une communication bidirectionnelle entre le webscoket et les clients, et ainsi implémenter un chat en ligne et actualiser dynamiquement les données lors des parties de jeu.

Le websocket permet entre autres de gérer le jeu en lui même. C'est lui qui va communiquer avec le moteur de jeu en C et transmettre les informations au front-end React.

Certaines de nos pages telles que la page de connexion, d'inscription, de définitons et enfin le jeu en lui-même appelle des API PHP pour intéragir avec la base de données MySQL.

La page de définitions utilise le dictionnaire de définitions implémenter en Java lors du premier semestre.

----------------------------Configuration du site---------------------------------

-Récuperer l'archive .zip et l'extraire. Cette archive comprend le répertoire parent 
IDRISSI_LUCAS_LEROY qui contient toute la structure du site.

-Dans le dossier /backend/src/bdd récupérer le fichier dump.sql qui correspond au dump de notre base de données avec des jeux de données.
Il faut ensuite importer ce fichier dans une base de données MySQL appellée "boggle".

-Les fichiers PHP doivent être impérativement placé dans un serveur web apache ou autre. 
Pour notre part nous utilisons laragon pour exécuter nos fichiers en localhost. Dans le dossier /www de votre serveur web, créer un dossier /boggle puis dans celui ci un dossier /php.
Récupérer dans le dossier /backend/src/php du projet l'ensemble des fichiers php et autres fichiers et les mettres dans le dossier /www/boggle/php créer précédemment dans le serveur web. 
Il faut penser à changer dans les fichier login.php, register.php et insertGameData.api.php les variable de connexion à la base de données.

ATTENTION: 

Les nodes_modules utilisé dans le projet ne sont pas fournit dans l'archive zip.
Si vous voulez les installer , il faut lancer la commander npm install dans chacun des dossier ( dossier racine, /backend et /frontend)

--------------------------Lancer le site---------------------------------------
Pour lancer le site :
	-positionnez-vous dans /backend puis lancer : npm start
	-Ouvrez un nouveau terminal et positionnez-vous dans /backend puis lancer :  chatac-server -i localhost -p 8090
	-Ouvrez un nouveau terminal et positionnez-vous dans /frontend puis lancer : npm start

Bravo le site est bien lancé ! 
Vous pouvez maintenant choisir de vous inscrire, ou choisir de vous connecter avec les login mis à disposition dans la base de données.
Pour cela prennez un des email de la table B_JOUEUR. Le mot de passe pour chacun d'entre eux est "password"

-----------------------Problèmes ---------------------------

Certaines de nos variables utilise le localstorage de react. Les données étant en cache, certaines actualisation ne se font pas comme espéré.
Le background du site peut parfois être décalé selon le format de l'appareil (très rare)
Actuellement la grille peut prendre n'importe quelle taille, mais le front-end est codé de façon à ce que seul une grille de 4 x 4 soit esthétiquement joli, ,nous avons donc choisit de ne pas laisser le joueur choisir la taille de la grille

