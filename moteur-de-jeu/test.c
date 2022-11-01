#include <stdlib.h>
#include <stdio.h>
#include <limits.h>
#include <string.h>
#include "arbres.c"



void change(CSTree cs) {
    cs->nextSibling = newTree('C', NULL, NULL);
    return;
}


int main() {

    CSTree cs = newTree('A', NULL, NULL);
    printPrefix(cs);

    printf("\n");

    cs = newTree(cs->elem, cs->firstChild, newTree('B', NULL, NULL));
    printPrefix(cs);

    printf("\n");

    change(cs);
    printPrefix(cs);
    return 0;
}