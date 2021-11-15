// zadanie5.c Kewin Ignasiak

#include <stdio.h>

#define N 1000

int NWD(int a, int b)
{
    if (a < b)
    {
        int c = a;
        a = b;
        b = c;
    }

    while (a % b != 0)
    {
        int c = a % b;
        a = b;
        b = c;
    }
    return b;
}

int main()
{
    int liczba_par[N] = {0};

    for (int a = 1; a <= N; a++)
    {
        int liczba_par_dla_a = 0;

        for (int b = a; b <= N; b++)
        {
            int n = NWD(b, a);

            if (n == 1) 
            {
                if (a == b)
                    liczba_par_dla_a += 1;
                else 
                    liczba_par_dla_a += 2;
            }

            liczba_par[b - 1] += liczba_par_dla_a;
        }
    }

    FILE *file = fopen("./wykres.csv", "w");

    for (int i = 1; i <= N; i++)
    {
        fprintf(file, "%d;%f\n", i, (double)liczba_par[i - 1] / (i * i));
    }

    fclose(file);

    return 0;
}
