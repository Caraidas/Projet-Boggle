#include <stdio.h>


int main(int argc, char* argv[]){
    int total = 0;

    if(argc == 0){
        printf("0\n");
        return 0;
    }
    for (int i = 1;i<argc;i++){

        total ++;
    }

    printf("%d\n",total);
    return 0;
}