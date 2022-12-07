#include <stdio.h>
#include <string.h>
#include <time.h>
#include <stdlib.h>
#include <limits.h>

#define MAX 100000
#define SIZE 100
#define NUMS_TO_GENERATE 10

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

Liste randomLetter(Liste l, int total){
    char listOfLetter[] = {'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T'}; // liste temporaire
    int freq[] = {5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100};
    srand(time(NULL));
    int num;
    for (int j = 0; j < total; j++){
        num = rand() % 101;
        printf("num %d \n",num);      
        for (int i = 0; i<20;i++){
            if (freq[i]>= num){
                l=cons(l, listOfLetter[i]);
                break;
            }
        }
    }
    /*
    for (i = 0; i<total; i++){
         randomLetter());
    }*/
    

    

    return l;
}

void print(Liste l, int x, int compt) {
    if(compt == x){
        compt = 0;
        printf("\n");
    }
    if (l==NULL) {
        printf("\n");
    }
    else {
        printf("%c ", l->elem);
        compt++;
        print(l->succ,x,compt);
    }
}

void append(char* s, char c) {
        int len = strlen(s);
        s[len] = c;
        s[len+1] = '\0';
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
        return 0;
    }

    //initialisation des variables


    char const* const fileName = argv[1];
    char const* const sizeX = argv[2];
    char const* const sizeY = argv[3];

    int x = *sizeX - '0';
    int y = *sizeY - '0';
    int total = x*y;

    int i;

    Liste l=NULL;

    // liste temporaire
    

    l = randomLetter(l, total);
    print(l,x,0);
    return 0;
}