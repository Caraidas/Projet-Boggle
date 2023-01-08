#define NONE -1
#define true 1
#define false 0
typedef unsigned int index;
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

CSTree newTree(Element elem, CSTree firstChild, CSTree nextSibling);
void displayStaticTree(StaticTree *tree);
void printPrefix(CSTree t);
int siblingLayercontains(CSTree cs, char c);
void appendSibling(CSTree *cs, char c);
void appendChild(CSTree *cs, char c);
int containsSibling(CSTree *cs, char c);
CSTree getCharInCS(char c, CSTree *cs);
CSTree findElem(CSTree cs, Element elem, char *mode);
int size(CSTree t);
int nSibling(CSTree t);
int nChildren(CSTree t);
ArrayCell cons(Element elem, int firstChild, int nSiblings);
int createArray(ArrayCell *arr, int size, int index, CSTree t);
StaticTree exportStaticTree(CSTree t);