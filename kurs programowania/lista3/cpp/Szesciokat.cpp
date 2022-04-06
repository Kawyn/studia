#include "Szesciokat.hpp"

#include <iostream>
#include <math.h>

Szesciokat::Szesciokat(int a)
{
    if (a < 0)
        throw std::runtime_error("illegal_args");

    this->a = a;
}

double Szesciokat::pole()
{
    return 3 * a * a * sqrt(3) / 2;
}

double Szesciokat::obwod()
{
    return 6 * a;
}