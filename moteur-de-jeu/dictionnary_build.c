#include <stdlib.h>
#include <stdio.h>
#include <limits.h>
#include <string.h>
#include <unistd.h>
#include "arbres.h"

int nWords = 0; // nombre de mots pour ne pas avoir à le recompter par la suite
int nLetters = 1; // nombre de lettres pour ne pas avoir à le recompter par la suite

typedef struct header
{
    unsigned int headerSize;
    unsigned int numWords;
    unsigned int numCells;
    unsigned int cellSize;
} Header;

void strip(char* buf) {
    size_t s = strlen(buf);
    if (s && (buf[s-1] == '\n')) buf[--s] = 0;
}

void insertWordR(char *word, CSTree *cs, int i) {
    char letter = word[i];
    if (letter == '\0') {
        if (containsSibling(&(*cs), word[i]) == false) {
            appendSibling(&(*cs), word[i]);
        }
        nLetters++;
        nWords++;
        return;
    } else {
        if (containsSibling(&(*cs), word[i]) == false) {
            nLetters++;
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

    if (fic == NULL) {
        perror("fopen");
    }

    signed char word[256];
    CSTree cs = newTree(fgetc(fic), NULL, NULL); // On récupère le premier char du fichier

    fseek(fic, 0, SEEK_SET); // On se replace au début du fichier

    while (fgets(word, 255, fic) != NULL) {
        strip(word); // On enlève le \n
        insertWord(word, &cs);
    }

    if (!(fclose(fic) == 0)) {
        perror("fclose");
    }

    return cs;
}

// sauvegarde un arbre statique dans un .lex
void saveIntoLex(StaticTree st,  char* file) {

    FILE* fp = fopen(file, "wb");
    if (fp == NULL) {
        perror("fopen w");
    }

    Header header;
    header.headerSize = sizeof(header);
    header.numWords = nWords;
    header.numCells = nLetters;
    header.cellSize = sizeof(ArrayCell);

    fwrite(&header, sizeof(header), 1, fp); // On ecrit le header

    for (int i = 0; i < st.nNodes; i++) { // On ecrit toutes les cellules
        ArrayCell cell = st.nodeArray[i];
        fwrite(&cell, sizeof(ArrayCell), 1,  fp);
    }

    fclose(fp);
}

int main(int argc, char *argv[])
{

    if (argc < 3) {
        printf("Usage: %s TXT_FILE BINARY_FILE\n", argv[0]);
        return 1;
    }

    CSTree cs = exportIntoLex(argv[1]); // Création de l'arbre
    StaticTree st = exportStaticTree(cs); // Convertion
    saveIntoLex(st, argv[2]); // Sauvegarde

    return 0;
}
