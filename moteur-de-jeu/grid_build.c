#include <stdio.h>
#include <string.h>
#include <time.h>
#include <stdlib.h>

#define MAX_NUMBERS 100

typedef char Element;
typedef struct cellule
{
    Element elem;
    struct cellule *succ;
} Cellule;
typedef Cellule *Liste;

// Constructeur principal d'une liste
Liste cons(Liste queue, Element elem)
{
    Liste l = malloc(sizeof(Cellule));
    l->elem = elem;
    l->succ = queue;
    return l;
}

// Permet d'afficher la liste en paramètre
void print(Liste l)
{
    if (l == NULL)
    {
        printf("\n");
    }
    else
    {
        printf("%c ", l->elem);
        print(l->succ);
    }
}

// permet de vérifier que le fichier en paramètre est bien un fichier texte
int has_txt_extension(char const *name)
{
    size_t len = strlen(name);
    if (len > 4 && strcmp(name + len - 4, ".txt") == 0)
        return 1;
    return 0;
}

int main(int argc, char *argv[])
{
    // vérfication qu'il y est bien 3 arguments passé
    if (argc > 4 || argc < 3)
    {
        printf("il faut 3 arguments pour executer le programme.\n");
        return 254;
    }

    // vérifie si un fichier txt est en paramètre
    int is_TXT = has_txt_extension(argv[1]);
    if (is_TXT == 0)
    {
        printf("vous devez mettre le fichier fréquences.txt en argument.\n");
        return 253;
    }

    // initialisation des variables

    char const *const fileName = argv[1];
    char const *const sizeX = argv[2];
    char const *const sizeY = argv[3];

    int x = atoi(sizeX);
    int y = atoi(sizeY);
    int total = x * y;

    int number;
    int maxRandom;

    int numberlist[MAX_NUMBERS];
    int numberCount = 0;

    // liste de l'alphabet
    char lettres[] = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '&'};

    FILE *file = fopen(fileName, "r");

    Liste l = NULL;

    char word[MAX_NUMBERS];

    // permet de vérifier que les tailles en paramètres sont supérieurs à 0
    if (x <= 0 || y <= 0)
    {
        printf("veuillez entrez des chiffres supérieur à 0\n");
        return 252;
    }

    while (fscanf(file, "%s %d", word, &number) == 2)
    {

        // enregistre le nombre dans la liste
        numberlist[numberCount] = number;
        maxRandom = number + 1;
        numberCount++;
    }
    fclose(file);

    // construit le tableau
    srand(time(NULL));
    int num;
    int freq;
    for (int j = 0; j < total; j++)
    {
        num = rand() % maxRandom;
        // regarde parmis les 27 (& pour qu) lettres de l'alphabet quelle est la lettre qui a la fréquence supérieur ou égale au numéro aléatoire
        for (int i = 0; i < 27; i++)
        {
            freq = numberlist[i];
            if (freq >= num)
            {
                l = cons(l, lettres[i]);
                break;
            }
        }
    }

    printf("grille aléatoire :\n");
    print(l);
    return 0;
}