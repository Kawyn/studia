#pragma once

#include "Figura.hpp"

class Czworokat : public Figura
{
public:
    int a, b, c, d;
    int alpha;

    Czworokat(int a, int b, int c, int d, int alpha);
    ~Czworokat();
};
