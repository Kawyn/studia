#include "Czworokat.hpp"

#include <iostream>

Czworokat::Czworokat(int a, int b, int c, int d, int alpha)
{

    if (alpha < 0 || 360 <= alpha)
        throw std::runtime_error("illegal_args");

    if (a < 0 || b < 0 || c < 0 || d < 0)
        throw std::runtime_error("illegal_args");

    this->a = a;
    this->b = b;
    this->c = c;
    this->d = d;

    this->alpha = alpha;
}

Czworokat::~Czworokat() {}