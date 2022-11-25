#include <stdio.h>
#include <string.h>
#include <time.h>
#define randnum(min, max) \
        ((rand() % (int)(((max) + 1) - (min))) + (min))

void append(char* s, char c) {
        int len = strlen(s);
        s[len] = c;
        s[len+1] = '\0';
}  

int main(int argc, char* argv[])
{
    //vérfication qu'il y est bien 3 arguments passé
    if (argc > 4 || argc < 3){
        printf("il faut 3 arguments pour executer le programme");
        return 1;
    }

    //initialisation des variables

    char const* const fileName = argv[1];
    char const* const sizeX = argv[2];
    char const* const sizeY = argv[3];

    int x = *sizeX - '0';
    int y = *sizeY - '0';

    char *ptr;
    char line[256];
    char frequence[49] = "";

    FILE* file = fopen(fileName, "r");
    

    printf("\nx = %d\ny = %d\n",x,y);
    while (fgets(line, sizeof(line), file)) {
        ptr = strtok(line, " ");
        append(frequence, *ptr);
        ptr = strtok(NULL, " ");
        append(frequence, *ptr);
        
    }
    printf("%s\n", frequence);

    fclose(file);
    printf("%c\n",frequence[0]);

    return 0;
}