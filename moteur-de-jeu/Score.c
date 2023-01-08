#include <stdio.h>
#include <string.h>


int main(int argc, char* argv[]){
    int total = 0;

    if(argc == 0){
        printf("0\n");
        return 0;
    }
    for (int i = 1;i<argc;i++){
        if (strlen(argv[i])>5 ){
            total += 2;
        }
        if (strlen(argv[i])>8){
            total += 2;
        }
        if (strlen(argv[i])>12){
            total += 5;
        }
        for (int j = 0; argv[i][j] != '\0'; j++) {
            if (argv[i][j] == 'X' || argv[i][j] == 'W' || argv[i][j] == 'Z' || argv[i][j] == 'K' || argv[i][j] == 'Y' ){
                total += 5;
            }
            if (argv[i][j] == 'H' || argv[i][j] == 'G' || argv[i][j] == 'Q' || argv[i][j] == 'V' || argv[i][j] == 'B' || argv[i][j] == 'F')
            total += 3;
        }
        total ++;
    }

    printf("%d\n",total);
    return 0;
}