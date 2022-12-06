#define _GNU_SOURCE

#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>      /* use issspace() to check whitespace */

#define ROWS 10         /* if you need a constant, #define one (or more) */
#define COLS 20

int getWords (char *base, char (*target)[COLS])
{
    int n = 0, i, j = 0, inword = 0;        /* inword is flag for in/out of word */

    for (i = 0; n < ROWS; i++) {                    /* protect array bounds */
        if (j == COLS - 1 || isspace (base[i])) {   /* both ROWS and COLS  */
            if (inword) {                           /* check if inword before adding */
                target[n][j++] = '\0';              //insert NULL
                n++;
                inword = j = 0;                     /* reset inword as well as j */
            }
        }
        else {
            target[n][j++] = base[i];
            inword = 1;                             /* set inword true */
        }
        if (!base[i])
            break;
    }
    
    return n;
}

int main (int argc, char **argv) {
    
    char *line = NULL;
    size_t len = 0;
    ssize_t read;
    /* use filename provided as 1st argument (stdin by default) */
    FILE *fp = argc > 1 ? fopen (argv[1], "r") : stdin;

    // fp = fopen ("dyrekt.html", "r");     /* NEVER hardcode filenames */
    if (fp == NULL) {
        perror ("fopen-file");
        exit (EXIT_FAILURE);
    }
    
    while ((read = getline (&line, &len, fp)) != -1) {
        int n,                              //number of words
            i;                              //loop counter 
        char arr[ROWS][COLS] = {{0}};       /* initialize arrays */

        n = getWords (line, arr);           /* pass line, str not needed */

        for (i = 0; i < n; i++)             /* i < n, not i <= n */
            printf ("%s\n", arr[i]);

        // return 0;    /* what? you exit at end of iteration */
    }
    fclose (fp);
    
    free (line);        /* no neef for if, calling free (NULL) doesn't hurt */
    
    exit (EXIT_SUCCESS);
}