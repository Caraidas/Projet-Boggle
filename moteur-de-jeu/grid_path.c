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
int searchWord(char originalgrid[], char word[], int r, int c)
{
    // Variable pour garder la trace des caractères trouvés dans la grille
    int *found = defaut;
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

// Convertit des coord 2d en 1d
int convertTo1D(int x, int y, int nbCol)
{
    return x * nbCol + y;
}

// Fonction pour tester si le mot est présent dans la grille
int *isSafe(int row, int col, char **grid, char word[], int r, int c)
{
    // Longueur du mot
    int len = strlen(word);

    // Path
    int *path = malloc(sizeof(int) * len);
    path[0] = convertTo1D(row, col, c);
    
    if (len == 1) {
        return path;
    }

    // Si la première lettre ne correspond pas à la grille, retourner faux
    if (grid[row][col] != word[0])
    {
        return defaut;
    }

    // Parcours de la grille
    int rowNbr[] = {-1, -1, -1, 0, 0, 1, 1, 1};
    int colNbr[] = {-1, 0, 1, -1, 1, -1, 0, 1};

    
    int index, compteur;
    compteur = 1;
    for (index = 1; index < len; index++)
    {
        // Parcours des voisins pour chercher la lettre suivante
        for (int k = 0; k < 8; k++)
        {
            // Les indices de la grille
            int rd = row + rowNbr[k];
            int cd = col + colNbr[k];

            if (rd >= 0 && rd < r && cd >= 0 && cd < c && grid[rd][cd] == word[index])
            {
                // Garder en mémoire la position
                path[index] = convertTo1D(rd, cd, c);

                // Augmenter le compteur
                compteur++;

                // Mettre à jour la position
                row = rd;
                col = cd;
                
                // Si tous les caractères correspondent, retourner le chemin trouver
                if (compteur == len) {
                    return path;
                }

                break;
            }

        }
    }

    // Si on a rien, alors retouner la valeur par defaut
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