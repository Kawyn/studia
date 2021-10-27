// zadanie6.c Kewin Ignasiak

#include <stdio.h>
#include <math.h>

#define N 1000

int suma_dzielnikow(int n)
{
    int suma = 1;

    for (int i = 2; i <= sqrt(n); i++)
    {
        if (n % i == 0)
        {
            suma += i;

            if (n / i != i)
                suma += n / i;
        }
    }

    return suma;
}

int main()
{
    int tablica[N - 1];

    printf("liczby doskonale:\n");

    for (int i = 1; i < N; i++)
    {
        tablica[i] = suma_dzielnikow(i);

        if (tablica[i] == i)
            printf("%d,", i);
    }

    printf("\n");
    printf("liczby zaprzyjaznione:\n");

    for (int n = 1; n < N; n++)
    {
        int m = tablica[n];

        if (n < m)
        {
            if (tablica[m] == n)
                printf("%d wraz z %d,", n, m);
        }
    }

    return 0;
}