#include <stdlib.h>
#include <stdio.h>
#include <limits.h>
#include <string.h>
#include "arbres.c"

void insertWordInTree(char *word, CSTree *cs)
{
    for (int i = 0; i < strlen(word); i++)
    {
        char letter = word[i];
        printf("%c\n", letter);

        if (siblingLayercontains(*cs, letter) == false)
        {
            appendSibling(cs, letter);

            if (strlen(word) <= 1)
            {
                CSTree child = findElem(*cs, letter, "child");
                memmove(word, word + 1, strlen(word));
                insertWordInTree(word, &child);
            }
        }
        else
        {
            if (strlen(word) <= 1)
            {
                CSTree child = findElem(*cs, letter, "child");
                memmove(word, word + 1, strlen(word));
                insertWordInTree(word, &child);
            }
        }
    }
}

// Export les données de file (txt) vers un fichier lex
CSTree exportIntoLex(char *file)
{
    FILE *f; // déclaration du fichier

    CSTree cs = NULL;

    f = fopen(file, "r"); // Ouverture du fichier en parametre
    char word[100];

    while (fgets(word, sizeof(word), f))
    {
        insertWordInTree(strtok(word, "\n"), &cs);
    }
    fclose(f); // fermeture du fichier
    return cs;
}

int main(int argc, char *argv[])
{
    CSTree t = exportIntoLex("DICO.txt");
    printPrefix(t);
}
