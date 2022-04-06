#pragma once

#include "Czworokat.hpp"

class Romb : public Czworokat
{
public:
    double pole();
    double obwod();

    Romb(int a, int alpha);
    ~Romb();
};
