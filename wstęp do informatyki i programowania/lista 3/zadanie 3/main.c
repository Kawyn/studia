#include <stdio.h>
#include "zadanie.h"

int main()
{
    long int n;

    printf("Podaj n:\n");
    scanf("%ld", &n);

    printf("phi(n) = %d", phi(n));
}