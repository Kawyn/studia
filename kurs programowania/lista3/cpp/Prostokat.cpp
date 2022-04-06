#include "Prostokat.hpp"

#include <iostream>

Prostokat::Prostokat(int a, int b) : Czworokat(a, b, a, b, 90) {}

double Prostokat::pole()
{
    return a * b;
}

double Prostokat::obwod()
{
    return 2 * a + 2 * b;
}
