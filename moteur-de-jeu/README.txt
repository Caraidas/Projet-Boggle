--------------Moteur de jeu--------------
Bonjour, bienvenu dans le README concernant le moteur du jeu.
Vous trouverez dedans :
- Qu'est ce qui a été réaliser
- Commandes à copier coller dans le terminal
- une description de chaques programmes effectuer 
- les problèmes rencontré

--------------Qu'est ce qui a été réaliser ?--------------
Pour ce projet, nous avons réalisé tout les programmes demandés mis à part Solve qui nous était optionnel en tant qu'alternant.
Tous nos programmes contiennent des vérifications de sécurité par rapport aux paramètres ou s'il y a une erreur dans le programme.
S'il s'agit d'un probleme de paramètre alors le programme renvoie 255,254,253...
S'il s'agit d'un probleme dans le programme alors le programme renvoie 1,2,3...
Si le programme fonctionne il renvera 0.

-------------- Commandes à copier coller dans le terminal --------------

Compiler dictionnary_build.c :
- gcc dictionnary_build.c arbres.c -o dictionnary_build

Lancer dictionnary_build.c (Linux) :
- ./dictionnary_build dico.txt dico.lex

Lancer dictionnary_build.c (Windows) :
- dictionnary_build.exe dico.txt dico.lex



Compiler dictionnary_lookup.c :
- gcc dictionnary_lookup.c -o dictionnary_lookup

Lancer dictionnary_lookup.c (Linux) :
- ./dictionnary_lookup dico.lex BONJOUR

Lancer dictionnary_lookup.c (Windows) :
- dictionnary_lookup.exe dico.lex BONJOUR



Compiler grid_build.c :
- gcc grid_build.c -o grid_build

Lancer grid_build.c (Linux) :
- ./grid_build frequences.txt 4 4

Lancer grid_build.c (Windows) :
- grid_build.exe frequences.txt 4 4



Compiler grid_path.c :
- gcc grid_path.c -o grid_path

Lancer grid_path.c (Linux) :
- ./grid_path OUI 4 4 G A I R R U V E R E O T A S M J

Lancer grid_path.c (Windows) :
- grid_path.exe OUI 4 4 G A I R R U V E R E O T A S M J



Compiler score.c :
- gcc score.c -o score

Lancer score.c (Linux) :
- ./score  OUI VIE

Lancer score.c (Windows) :
- score.exe  OUI VIE


-------------- dictionnary_build.c --------------
Le programme prend 2 paramètres :
- Le fichier dico.txt (dictionnaire des mots)
- Le fichier (existant ou non) binaire qui accueil le dictionnaire final

Le programme dictionnary_build.c sert à construire un dictionnaire binaire à partir d'un fichier de mots en texte. 
Il prend en entrée le fichier de mots en texte et le fichier binaire de destination, et suit les étapes imposées par le sujet 
pour construire le dictionnaire en utilisant plusieurs fonctions.

-------------- dictionnary_lookup.c --------------
Le programme prend 2 paramètres :
- Le fichier dico.lex (dico binaire)
- Le mot à chercher

Le programme dictionnary_lookup.c permet de chercher un mot dans un dictionnaire binaire. 
Il prend en entrée le fichier binaire du dictionnaire et le mot à chercher, 
et utilise des fonctions de lecture de fichier binaire pour récupérer les cellules 
nécessaires et vérifier si le mot se trouve dans le dictionnaire.

-------------- grid_build.c --------------
Le programme prend 3 paramètres qui sont :
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
Le programme prend "4" paramètres :
- Le mot à chercher
- Les dimensions de la grille
- La grille en elle même

-------------- score.c --------------
Le programme score.c permet de calculer le score d'un chemin de mots donné. 
Il prend en entrée le chemin de mots sous forme de chaîne de caractères et 
utilise une formule donnée pour calculer le score total du chemin.

Le score part du principe que au minimum un mot est égale à 1 point. 
Le programme va parcourir chaque mots et va passer sur certaines vérifications qui sont :
- Si le mot contient X,W,Z,K ou Y alors cela donne 5 points supplémentaires
- Si le mot contient H,G,Q,V,B ou F alors cela donne 3 points supplémentaires
- Si le mot à une taille de 5 caractère, cela donne 2 points supplémentaire
- Si le mot à une taille de 8 caractère, cela donne 4 points supplémentaire
- Si le mot à une taille de 12 caractère, cela donne 9 points supplémentaire

-------------- les problèmes rencontrés --------------
- Problèmes de mémoires divers ... Les joies du C !


AUTEURS :
- Nidal IDRISSI
- Laura LEROY
- Paul LUCAS
