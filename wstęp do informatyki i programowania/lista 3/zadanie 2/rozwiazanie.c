#include "zadanie.h"

double rozwiazanie(double a, double b, double eps)
{
    double y = 0;

    while (b - a > eps)
    {
        y = (a + b) / 2;

        if (f(y) * f(a) < 0)
            b = y;
        else
            a = y;
    }

    return y;
}