#include <stdio.h>
#include <string.h>
#include <time.h>
#include <stdlib.h>
#include <limits.h>

#define MAX 100000
#define SIZE 100
#define NUMS_TO_GENERATE 10
#define MAX_NUMBERS 100

typedef char Element;
typedef struct cellule{
    Element elem;
    struct cellule* succ;
} Cellule;
typedef Cellule* Liste;

// Constructeur principal
Liste cons(Liste queue, Element elem){
    Liste l = malloc(sizeof(Cellule));
    l->elem = elem;
    l->succ = queue;
    return l;
}


void print(Liste l, int x) {
    if (l==NULL) {
        printf("\n");
    }
    else {
        printf("%c ", l->elem);
        print(l->succ,x);
    }
} 

int has_txt_extension(char const *name) {
    size_t len = strlen(name);
    if (len > 4 && strcmp(name + len - 4, ".txt") == 0)
        return 1;
    return 0;
}

void showGrid(int sizeX, int sizeY, char *tableau[]){
    int i;
    int j;

    for (i = 0; i<sizeX; i++){
        for (j = 0; j<sizeY; j++){
            printf("%c ", tableau[i][j]);
        } 
    }
}

int main(int argc, char* argv[])
{
    //vérfication qu'il y est bien 3 arguments passé
    if (argc > 4 || argc < 3){
        printf("il faut 3 arguments pour executer le programme.\n");
        return 254;
    }

    //vérifie si un fichier txt est en paramètre 
    int is_TXT = has_txt_extension(argv[1]);
    if (is_TXT == 0){
        printf("vous devez mettre le fichier fréquences.txt en argument.\n");
        return 253;
    }

    //initialisation des variables


    char const* const fileName = argv[1];
    char const* const sizeX = argv[2];
    char const* const sizeY = argv[3];

    int x = *sizeX - '0';
    int y = *sizeY - '0';
    int total = x*y;

    int i;
    int number;

    int numbers[MAX_NUMBERS];
    int numberCount = 0;

    char lettres[] = {'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'};

    FILE *file = fopen(fileName, "r");

    Liste l=NULL;

    // liste temporaire

    char word[MAX_NUMBERS];

    while (fscanf(file, "%s %d", word, &number) == 2) {

        // Store the number in the array
        numbers[numberCount] = number;
        numberCount++;
    }
    fclose(file);

    
    srand(time(NULL));
    int num;
    int var;
    for (int j = 0; j < total; j++){
        num = rand() % 79; 
        for (int i = 0; i<26;i++){
            var = numbers[i];
            if (var >= num){
                l=cons(l, lettres[i]);
                break;
            }
        }
    }

    printf("grille aléatoire :\n");
    print(l,x);
    return 0;
}