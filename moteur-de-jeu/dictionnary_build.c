#include <stdlib.h>
#include <stdio.h>
#include <limits.h>
#include "arbres.c"

// Export les données de file (txt) vers un fichier lex
void exportIntoLex(char* file)
{
    FILE *f; // déclaration du fichier
    char c; // déclaration du mot

    CSTree cs = malloc(sizeof(Node));

    f = fopen(file, "r"); // Ouverture du fichier en parametre
    while ((c = fgetc(f)) != EOF) // On boucle sur chaque mot
    {
        // TODO : fonction inserer lettre par lettre dans l'arbre
        printf("%c", c); 
    }
    fclose(f); // fermeture du fichier
}

int main(int argc, char *argv[])
{   
    exportIntoLex("DICO.txt");
}
