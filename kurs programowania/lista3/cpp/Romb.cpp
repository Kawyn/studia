#include "Romb.hpp"

#include <iostream>
#include <math.h>

Romb::Romb(int a, int alpha) : Czworokat(a, a, a, a, alpha)
{
    if (alpha > 180)
        std::runtime_error("illegal_args");
}

double Romb::pole()
{
    double radian = (abs(alpha - 2 * (alpha % 90)) * (3.14159265359 / 180));

    return a * a * sin(radian);
}

double Romb::obwod()
{
    return 4 * a;
}