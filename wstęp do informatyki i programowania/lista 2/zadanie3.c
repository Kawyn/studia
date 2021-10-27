// zadanie3.c Kewin Ignasiak

#include <stdio.h>

int main()
{
    int n = 1;
    double suma = 0;

    while (suma <= 10)
    {
        suma += 1.0 / n;
        n++;
    }

    printf("wartosc: %f, n: %d", suma, n);

    return 0;
}
