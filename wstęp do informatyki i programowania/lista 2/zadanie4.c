// zadanie4.c Kewin Ignasiak

#include <stdio.h>
#include <math.h>

#define N 1000

int main()
{
    double przyblizenie = 1;

    for (int i = 1; i <= N; i++)
        przyblizenie *= pow(i, 1.0 / N);

    printf("przyblizenie wynosi %f", przyblizenie);

    return 0;
}
