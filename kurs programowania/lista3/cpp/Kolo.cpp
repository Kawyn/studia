#include "Kolo.hpp"

#include <iostream>

#define PI 3.14159265358979323846

Kolo::Kolo(int r)
{
    if (r < 0)
        throw std::runtime_error("illegal_args");

    this->r = r;
}

double Kolo::pole()
{
    return PI * r * r;
}

double Kolo::obwod()
{
    return 2 * PI * r;
}