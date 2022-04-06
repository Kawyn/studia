#pragma once

#include "Czworokat.hpp"

class Kwadrat : public Czworokat
{
public:
    double pole();
    double obwod();

    Kwadrat(int a);
    ~Kwadrat();
};
