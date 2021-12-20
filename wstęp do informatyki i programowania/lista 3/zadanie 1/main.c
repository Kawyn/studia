#include <stdio.h>
#include "zadanie.h"

#define MAX_SIZE 255

int main()
{
    char napis[MAX_SIZE];

    printf("Podaj napis do przetestowania:\n");
    scanf("%s", &napis);

    if (palindrom(napis))
        printf("%s jest palindromem.", napis);
    else
        printf("%s nie jest palindromem.", napis);

    printf("\n");
}