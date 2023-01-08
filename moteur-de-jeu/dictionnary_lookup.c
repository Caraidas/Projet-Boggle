#include <stdio.h>
#include <string.h>
#include <stdbool.h>

#define NONE -1

typedef char Element;

typedef struct
{
    Element elem;
    unsigned int firstChild;
    unsigned int nSiblings;
} ArrayCell;

typedef struct
{
    unsigned int headerSize;
    unsigned int numWords;
    unsigned int numCells;
    unsigned int cellSize;
} Header;

int searchWordAux(FILE *fp, char *word, int letterIndex, Header header, int fcIndex) // Fonction récursive qui prend le fichier, le mot, le header et le numero de la cellule à partir de laquelle on commence à lire
{
    ArrayCell cell;
    fseek(fp, 0, SEEK_SET); // On se place au debut du fichier (juste au cas où)
    fseek(fp, header.headerSize + (fcIndex * header.cellSize), SEEK_SET); // On saute le header et le nombre de cellules spécifié en param pour lire la cellule et ses frère sans problèmes
    fread(&cell, 1, header.cellSize, fp); // On lit la première cellule
    int len = cell.nSiblings; // On garde le nombre de frères dans une variable pour ne pas avoir de problèmes dans la boucle

    int i = 0;

    do
    {
        if (!(word[letterIndex] == '\0')) // Si on ne cherche pas la fin du mot ...
        {
            if (word[letterIndex] == cell.elem) // ... et si j'ai trouvé la lettre que je cherchais ...
            {
                if (cell.firstChild == NONE) // ... et que cette cellule n'as pas d'enfants ...
                {
                    return 2; // ... alors je n'ai pas trouvé mon mot et ce n'est pas un prefixe
                } 
                else // ... et que cette cellule a des enfants ...
                {
                    return searchWordAux(fp, word, letterIndex + 1, header, cell.firstChild); // ... alors je continue de chercher les lettres suivantes de mon mot en commençant par le premier enfant
                }
            }

            // ... et si je n'ai pas trouvé la lettre que je cherchais, alors je continue de chercher dans les frères s'il y en a (la boucle while se charge de ça donc pas besoin de vérifier que des frères existent)
        }
        else // Si on cherche la fin du mot ...
        {
            if (word[letterIndex] == cell.elem) // ... et qu'on trouve cette dite fin ...
            {
                return 0; // ... alors on a trouvé le mot cherché, YOUPI !
            }
            else // ... mais qu'on ne trouve pas cette fin ...
            {
                return 1; // ... alors on à pas trouvé le mot mais un prefixe
            }
        }
        fread(&cell, 1, header.cellSize, fp); // On lit la cellule d'après (donc le frère suivant)
        i++;
    } while (i <= len);

    return 2; // On a pas trouvé le mot ... Dommage
}

int searchWord(FILE *fp, char *word)
{
    Header header;
    fread(&header, sizeof(Header), 1, fp); // On prend les infos du header 

    return searchWordAux(fp, word, 0, header, 0); // On lance la vraie foction récursive
}

int main(int argc, char **argv)
{
    if (argc != 3)
    {
        printf("Usage: %s FILE WORD\n", argv[0]);
        return 3;
    }

    FILE *fp = fopen(argv[1], "rb");
    if (!fp)
    {
        printf("Error opening dictionary file\n");
        return 254;
    }

    int result = searchWord(fp, argv[2]);
    fclose(fp);
    printf("%d", result);
    return result;
}
