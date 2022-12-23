#include <stdlib.h>
#include <stdio.h>
#include <limits.h>
#include <string.h>
#include "arbres.c"
#include "utils.c"


void insertWordR(char *word, CSTree *cs, int i) {
    char letter = word[i];
    if (letter == '\0') {
        return;
    } else {
        if (containsSibling(&(*cs), word[i]) == false) {
            appendSibling(&(*cs), word[i]);
            insertWordR(word, &(getCharInCS(word[i], &(*cs))->firstChild), i + 1);
        } else {
            insertWordR(word, &(getCharInCS(word[i], &(*cs))->firstChild), i + 1);
        }
    }
}

void insertWord(char *word, CSTree *cs) {

    insertWordR(word, &(*cs), 0);
}

// Export les données de file (txt) vers un fichier lex
CSTree exportIntoLex(char *file)
{
    FILE *fic = fopen(file, "r"); // déclaration du fichier
    signed char word[256];
    CSTree cs = newTree('A', NULL, NULL);

    while (fgets(word, 255, fic) != NULL) {
        strip(word);
        insertWord(word, &cs);
    }

    fclose(fic);

    return cs;
}

int main(int argc, char *argv[])
{
    CSTree cs = exportIntoLex(argv[1]);
    printPrefix(cs);
    StaticTree st = exportStaticTree(cs);
}