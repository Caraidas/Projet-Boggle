#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX 10

// Grid size
#define ROW 4
#define COL 4

// Valeur de retour par défaut (NULL ne fonctionne pas pour je ne sais quelle raison)
int defaut[] = {-1};

// prototype
int *isSafe(int row, int col, char **grid, char word[], int r, int c);

int *findPath(int row, int col, char* word, char **grid, int r, int c, int* path, int index);

char **make2dGrid(char *grid, int row, int col)
{
    char **matrix = malloc(sizeof(char *) * row);
    for (int i = 0; i < row; i++)
    {
        matrix[i] = malloc(sizeof(char) * col);
        for (int j = 0; j < col; j++)
        {
            matrix[i][j] = grid[i * col + j];
        }
    }
    return matrix;
}

// Convertit des coord 2d en 1d
int convertTo1D(int x, int y, int nbCol)
{
    return x * nbCol + y;
}

// Fonction pour rechercher le mot dans la grille
int searchWord(char originalgrid[], char word[], int r, int c)
{
    // Variable pour garder la trace des caractères trouvés dans la grille
    char **grid = make2dGrid(originalgrid, r, c);
    int *found = defaut;
    int len = strlen(word);

    // Parcours de la grille
    for (int row = 0; row < r; row++)
    {
        for (int col = 0; col < c; col++)
        {
            // On teste si le mot commence par le caractère courant
            if (grid[row][col] == word[0])
            {
                // Path
                int *path = malloc(sizeof(int) * strlen(word) + sizeof(int));
                path[0] = convertTo1D(row, col, c);
                path[len] = 0;

                if (len == 1) {
                    printf("%d\n", path[0]);
                    return 0;
                }

                // Appeler la fonction de recherche
                found = findPath(row, col, word, grid, r, c, path, 1);

                // Si le mot est trouvé, afficher le chemin
                if (found != defaut)
                {
                    // Afficher le chemin
                    for (int i = 0; i < strlen(word); i++)
                    {
                        printf("%d ", found[i]);
                    }
                    printf("\n");
                    return 0;
                }
            }
        }
    }

    // Si le mot n'est pas trouvé, return 1
    if (found == defaut)
    {
        return 1;
    }
}

int contains(int* path, int index, int pos) {

    for (int i = 0; i < index; i++) {
        if (path[i] == pos) {
            return 1;
        }
    }
    return 0;
}

int *findPath(int row, int col, char* word, char **grid, int r, int c, int* path, int index) {

    // Longueur du mot
    int len = strlen(word);

    int *result;

    // Parcours de la grille
    int rowNbr[] = {-1, -1, -1, 0, 0, 1, 1, 1};
    int colNbr[] = {-1, 0, 1, -1, 1, -1, 0, 1};

    for (int i = 0; i < 8; i++) {

        int rd = row + rowNbr[i];
        int cd = col + colNbr[i];

        if (rd >= 0 && rd < r && cd >= 0 && cd < c) {

            if (grid[rd][cd] == word[index]) { //si la lettre correspond
                if (contains(path, index, convertTo1D(rd, cd, c)) == 0) { // et qu'on est pas déja passé par la 
                    if (index == len - 1) { // et qu'on a finit de chercher
                        path[index] = convertTo1D(rd, cd, c); // on rajoute la position
                        path[len] = 1;
                        return path; 
                    } else { // si on a pas fini de chercher
                        path[index] = convertTo1D(rd, cd, c); // on rajoute la position
                        result = findPath(rd, cd, word, grid, r, c, path, index + 1); // On cherche la suite du mot
                    }
                }
                
            }
        }

        if (result == defaut) {
            continue;
        } else {
            if (path[len] == 1) {
                return path;
            }
        }
    }
    return defaut;
}

// Fonction principale
int main(int argc, char *argv[])
{
    // Vérifier que le nombre de paramètres est correct
    if (argc < 5)
    {
        printf("Nombre de paramètres invalide\n");
        return 2;
    }

    int row, col;

    char *word = argv[1];
    row = atoi(argv[2]);
    col = atoi(argv[3]);

    // Allouer un tableau de caractères
    char *grid = malloc(argc * sizeof(char));
    if (grid == NULL)
    { // Erreur
        printf("Erreur d'allocation mémoire\n");
        return 254;
    }

    // On remplit le tableau
    int i, index;
    index = 0;
    for (i = 4; i < argc; i++)
    {
        grid[index] = *argv[i];
        index++;
    }

    return searchWord(grid, word, row, col);
}