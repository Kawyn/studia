#include <stdio.h>
#include "zadanie.h"

int main()
{
    for (int i = 1; i <= 8; i++)
    {
        double x = rozwiazanie(2, 4, pow(10, -i));
        printf("[k = %d] x = %f | f(x) = %f)\n", i, x, f(x));
    }
}