#include <stdlib.h>
#include <stdio.h>
#include <limits.h>

// Définition du type child Sibling Tree (CSTree)

#define NONE -1
#define true 1
#define false 0
typedef char Element;

typedef struct node
{
    Element elem;
    struct node *firstChild;
    struct node *nextSibling;
} Node;

typedef Node *CSTree;

typedef struct arrayCell
{
    Element elem;
    unsigned int firstChild;
    unsigned int nSiblings;
} ArrayCell;

typedef struct
{
    ArrayCell *nodeArray;
    unsigned int nNodes;
} StaticTree;

// Créer un arbre
CSTree newTree(Element elem, CSTree firstChild, CSTree nextSibling)
{
    CSTree t = malloc(sizeof(Node));
    if (t == NULL)
        return NULL;
    t->elem = elem;
    t->firstChild = firstChild;
    t->nextSibling = nextSibling;
    return t;
}

// Affiche un arbre statique
void displayStaticTree(StaticTree *tree)
{
    int i;

    for (i = 0; i < tree->nNodes; i++)
    {
        printf("Node %d: elem = %c, firstChild = %d, nSiblings = %d\n", i, tree->nodeArray[i].elem, tree->nodeArray[i].firstChild, tree->nodeArray[i].nSiblings);
    }
}

// Affichage d'un arbre
void printPrefix(CSTree t)
{
    if (t == NULL)
    {
        printf("NULL");
        return;
    }
    printf("%c\n", t->elem);
    printf("%c's child : ", t->elem);
    printPrefix(t->firstChild);
    printf("\n");

    printf("%c's sibling : ", t->elem);
    printPrefix(t->nextSibling);
    printf("\n");
}

/* CSTree example()
{
    CSTree a = newTree(2,
                       NULL,
                       newTree(3, newTree(4, NULL, NULL), newTree(5, NULL, NULL)));
    CSTree b = newTree(1, a, NULL);
    return b;
}*/

// Renvoie true si le niveau contient le char
int siblingLayercontains(CSTree cs, char c)
{
    if (cs == NULL)
    {
        return false;
    }

    if (cs->elem == c)
    {
        return true;
    }
    else if (cs->nextSibling == NULL)
    {
        return false;
    }
    else
    {
        return siblingLayercontains(cs->nextSibling, c);
    }
}

// Ajoute un frère à l'arbre
void appendSibling(CSTree *cs, char c)
{
    if ((*cs) == NULL)
    {
        (*cs) = newTree(c, NULL, NULL);
        return;
    }
    if ((*cs)->nextSibling == NULL)
    {
        (*cs)->nextSibling = newTree(c, NULL, NULL);
    }
    else
    {
        appendSibling((&(*cs)->nextSibling), c);
    }
}

// Ajoute un enfant à l'arbre
void appendChild(CSTree *cs, char c)
{
    if ((*cs) == NULL)
    {
        (*cs) = newTree(c, NULL, NULL);
        return;
    }
    if ((*cs)->firstChild == NULL)
    {
        (*cs)->firstChild = newTree(c, NULL, NULL);
    }
    else
    {
        appendSibling((&(*cs)->firstChild), c);
    }
}

// Renvoie true si l'arbre contient le char
int containsSibling(CSTree *cs, char c)
{
    if ((*cs) == NULL)
    {
        return false;
    }
    if ((*cs)->elem == c)
    {
        return true;
    }
    else
    {
        return containsSibling(&(*cs)->nextSibling, c);
    }
}

// Renvoie le noeud contenant le char en param
CSTree getCharInCS(char c, CSTree *cs)
{
    if ((*cs) == NULL)
    {
        return NULL;
    }
    if ((*cs)->elem == c)
    {
        //printf("%c", (*cs)->elem);
        return (*cs);
    }
    else
    {
        return getCharInCS(c, &(*cs)->nextSibling);
    }
}

// Trouve un élement dans un arbre
CSTree findElem(CSTree cs, Element elem, char *mode)
{
    if (cs == NULL)
    {
        return NULL;
    }

    if (cs->elem != elem)
    {
        return findElem(cs->nextSibling, elem, mode);
    }
    else
    {
        if (mode == "child")
        {
            return cs->firstChild;
        }
        else if (mode == "sibling")
        {
            return cs->nextSibling;
        }
    }
}

// Taille d'un arbre
int size(CSTree t)
{
    if (t == NULL)
    {
        return 0;
    }
    else
    {
        return 1 + size(t->firstChild) + size(t->nextSibling);
    }
}

// Nombre de frères d'un arbre
int nSibling(CSTree t)
{
    if ((t == NULL) || (t->nextSibling == NULL))
    {
        return 0;
    }
    else
    {
        return 1 + nSibling(t->nextSibling);
    }
}

// Nombre d'enfants d'un arbre
int nChildren(CSTree t)
{
    if (t == NULL || (t->firstChild == NULL))
    {
        return 0;
    }
    else
    {
        return 1 + nSibling(t->firstChild);
    }
}

// construit une ArrayCell
ArrayCell cons(Element elem, int firstChild, int nSiblings)
{
    ArrayCell a;
    a.elem = elem;
    a.firstChild = firstChild;
    a.nSiblings = nSiblings;

    return a;
}

int createArray(ArrayCell *arr, int size, int index, CSTree t)
{
    if (t == NULL)
    {
        return size;
    }

    int nchildren = nChildren(t); // On garde le nombre d'enfants
    int oldsize = size;

    // si il n'y a pas d'enfants
    if (nchildren == 0)
    {
        arr[index] = cons(t->elem, NONE, nSibling(t)); // On construit la cell
    }
    else // si il y a des enfants
    {
        arr[index] = cons(t->elem, size + 1, nSibling(t)); // on construit la cell avec la position du premier enfant
        int oldsize = size;
        size += nchildren;
    }
    size = createArray(arr, size, index + 1, t->nextSibling);  // Les frères
    size = createArray(arr, size, oldsize + 1, t->firstChild); // Les child
    return size;
}

// COnvertit un tree en staticTree
StaticTree exportStaticTree(CSTree t)
{
    int treeSize = size(t); // Taille de l'arbre
    StaticTree st;
    st.nNodes = treeSize;
    ArrayCell *tab = malloc(sizeof(ArrayCell *) * treeSize);
    createArray(tab, nSibling(t), 0, t);
    st.nodeArray = tab;
    return st;
}