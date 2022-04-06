#pragma once

#include "Figura.hpp"

class Pieciokat : public Figura
{
public:
    int a;

    double pole();
    double obwod();

    Pieciokat(int a);
    ~Pieciokat();
};
