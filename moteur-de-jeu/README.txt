--------------Moteur de jeu--------------
Bonjour, bienvenu dans le README concernant le moteur du jeu.
Vous trouverez dedans :
- Qu'est ce qui a été réaliser
- Comment toute la structure des programmes fonctionne
- une description de chaques programmes effectuer 
- les problèmes rencontré

--------------Qu'est ce qui a été réaliser ?--------------
Pour ce projet, nous avons réalisé tout les programmes demandés mis à part Solve qu'il nous était optionnel en tant qu'alternant.
Tous nos programmes contiennent des vérifications de sécurités par rapport aux paramètres ou s'il y a une erreur dans le programme.
S'il s'agit d'un probleme de paramètre alors le programme renvoie 255,254,253...
S'il s'agit d'un probleme dans le programme alors le programme renvoie 1,2,3...
Si le programme fonctionne il renverra 0.

--------------Comment toute la structure des programmes fonctionne--------------

--------------description de chaques programmes à effectuer--------------
--------------dictionnary_build.c--------------

--------------dictionnary_lookup.c--------------

--------------grid_build.c--------------
Le programme prend 4 paramètres qui sont :
- le fichier frequences.txt
- les tailles X et Y de la grille à créer 
Le fichier fréquences.txt à un caractere par ligne suivis de sa fréquence. Nous avons décider de construire ce fichier comme ci-dessous:
A 3
B 7
...
Dans cet exemple A à une fréquence de 3 tandis que B à une fréquence de 4. Nous prenons la fréquences de la lettre précédente et l'incrémentons avec la fréquence que l'on souhaite mettre. L'alphabet prend pour caractère supplémentaire '&' qui permet de représenter 'QU'.
La liste de l'alphabet est déjà préimplémentée dans le programme, seul leurs fréquence est lu dans le txt.
Concernant la création de la liste qui est retourné après l'execution du programme, un random est fait entre 0 et la fréquence max+1 et on regarde de la frequence la plus basse jusqu'à la frequences la plus haute si le random est inférieur ou égale à chaques fréquences. Une fois la fréquence trouvé la lettre avec qui elle est liée s'insère dans la liste et répète la boucle jusqu'à ce que la liste soit pleine

--------------grid_path.c--------------

--------------score.c--------------
Le Score part du principe que au minimum un mot est égale à 1 point. 
Le programme va parcourir chaque mots et va passer sur certaines vérifications qui sont :
- Si le mot contient X,W,Z,K ou Y alors cela donne 5 points supplémentaires
- Si le mot contient H,G,Q,V,B ou F alors cela donne 3 points supplémentaires
- Si le mot à une taille de 5 caractère, cela donne 2 points supplémentaire
- Si le mot à une taille de 8 caractère, cela donne 4 points supplémentaire
- Si le mot à une taille de 12 caractère, cela donne 9 points supplémentaire
--------------les problèmes rencontrés--------------
