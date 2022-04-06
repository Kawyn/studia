#pragma once

#include "Figura.hpp"

class Szesciokat : public Figura
{
public:
    int a;

    double pole();
    double obwod();

    Szesciokat(int a);
    ~Szesciokat();
};
