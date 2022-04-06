#pragma once

#include "Czworokat.hpp"

class Prostokat : public Czworokat
{
public:
    double pole();
    double obwod();

    Prostokat(int a, int b);
    ~Prostokat();
};
