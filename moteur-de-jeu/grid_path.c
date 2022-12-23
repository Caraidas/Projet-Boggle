#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX 10

// Grid size
#define ROW 4
#define COL 4

// prototype
int *isSafe(int row, int col, char **grid, char word[], int r, int c);

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

// Fonction pour rechercher le mot dans la grille
void searchWord(char originalgrid[], char word[], int r, int c)
{
    // lst vide 
    int *vide = malloc (sizeof (int) * 1);

    // Variable pour garder la trace des caractères trouvés dans la grille
    int* found;
    char **grid = make2dGrid(originalgrid, r, c);

    // Parcours de la grille
    for (int row = 0; row < r; row++)
    {
        for (int col = 0; col < c; col++)
        {
            // On teste si le mot commence par le caractère courant
            if (grid[row][col] == word[0])
            {
                // Appeler la fonction de recherche
                found = isSafe(row, col, grid, word, r, c);

                // Si le mot est trouvé, afficher le chemin
                if (found != vide)
                {
                    // Afficher le chemin
                    for (int i = 0; i < strlen(word); i++)
                    {
                        printf("%d ", found[i]);
                    }
                    printf("\n");
                }
            }
        }
    }

    // Si le mot n'est pas trouvé, afficher 1
    if (found == vide) {
        printf("1\n");
    } else {
        printf("0\n");
    }
    
}

// Convertit des coord 2d en 1d
int convertTo1D(int x, int y, int nbCol)
{
    return x * nbCol + y;
}

// Fonction pour tester si le mot est présent dans la grille
int* isSafe(int row, int col, char **grid, char word[], int r, int c)
{

    // Longueur du mot
    int len = strlen(word);

    // Path
    int *path = malloc (sizeof (int) * len);
    path[0] = convertTo1D(row, col, c);

    // lst vide 
    int *vide = malloc (sizeof (int) * 1);

    // Si la première lettre ne correspond pas à la grille, retourner faux
    if (grid[row][col] != word[0]) {
        return vide;
    }

    // Parcours de la grille
    int rowNbr[] = {-1, -1, -1, 0, 0, 1, 1, 1};
    int colNbr[] = {-1, 0, 1, -1, 1, -1, 0, 1};

    // Parcours des voisins pour chercher le mot
    for (int k = 0; k < 8; k++)
    {
        // Index pour parcourir le mot
        int index;
        for (index = 1; index < len;)
        {

            // Les indices de la grille
            int rd = row + rowNbr[k];
            int cd = col + colNbr[k];

            // Si les indices sont valides et le caractère correspond, continuer à chercher
            if (rd >= 0 && rd < r && cd >= 0 && cd < c &&
                grid[rd][cd] == word[index])
            {

                // Garder en mémoire la position
                path[index] = convertTo1D(rd, cd, c);

                // Augmenter l'index
                index++;

                // Mettre à jour la position
                row = rd;
                col = cd;
            }
            else {
                break;
            }

                
        }

        // Si tous les caractères correspondent, retourner vrai
        if (index == len) {
            return path;
        }
           
    }
    return vide;
}

// Fonction principale
int main(int argc, char *argv[])
{
    int row, col;
    row = atoi(argv[2]);
    col = atoi(argv[3]);
    char grid[] = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'};

    char* word = argv[1];

    searchWord(grid, word, row, col);

    return 0;
}