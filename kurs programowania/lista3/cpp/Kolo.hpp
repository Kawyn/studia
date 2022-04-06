#pragma once

#include "Figura.hpp"

class Kolo : public Figura
{
private:
public:
    int r;

    double pole();
    double obwod();

    Kolo(int r);
    ~Kolo();
};