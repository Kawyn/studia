#include "Kwadrat.hpp"

#include <iostream>

Kwadrat::Kwadrat(int a) : Czworokat(a, a, a, a, 90) {}

double Kwadrat::pole()
{
    return a * a;
}

double Kwadrat::obwod()
{
    return 4 * a;
}