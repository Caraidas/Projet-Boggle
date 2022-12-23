#include <stdlib.h>
#include <stdio.h>
#include <limits.h>
#include <string.h>

void strip(char* buf) {
    size_t s = strlen(buf);
    if (s && (buf[s-1] == '\n')) buf[--s] = 0;
}