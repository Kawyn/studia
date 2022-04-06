#include "Pieciokat.hpp"

#include <iostream>
#include <math.h>

Pieciokat::Pieciokat(int a)
{
    if (a < 0)
        throw std::runtime_error("illegal_args");

    this->a = a;
}

double Pieciokat::pole()
{
    return a * a * sqrt(25 + 10 * sqrt(5)) / 4;
}

double Pieciokat::obwod()
{
    return 5 * a;
}