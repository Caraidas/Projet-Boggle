#include <stdlib.h>
#include <stdio.h>
#include <limits.h>
#include <string.h>
#include "arbres.c"

void insertWordInTree(char* word, CSTree cs)
{
    for (int i = 0; i < strlen(word); i++)
    {
        char letter = word[i];

        if (siblingLayercontains(cs, letter) == false) {
            appendSibling(cs, letter);
        } else {
            insertWordInTree(memmove(word, word+1, strlen(word)), cs);
        }
    }
}

// Export les données de file (txt) vers un fichier lex
void exportIntoLex(char *file)
{
    FILE *f; // déclaration du fichier

    CSTree cs = malloc(sizeof(Node));

    f = fopen(file, "r"); // Ouverture du fichier en parametre
    char word[500];

    while (fgets(word, sizeof(word), f))
    {
        insertWordInTree(word, cs);
    }
    fclose(f); // fermeture du fichier
}

int main(int argc, char *argv[])
{
    exportIntoLex("DICO.txt");
}
