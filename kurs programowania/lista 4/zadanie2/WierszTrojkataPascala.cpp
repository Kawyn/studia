#include "WierszTrojkataPascala.hpp"

#include <stdexcept>

int WierszTrojkataPascala::wspolczynnik(int m)
{
    if (m < 0 || this->n <= m)
        throw std::runtime_error("OutOfRangeException");

    return this->wiersz[m];
}

WierszTrojkataPascala::WierszTrojkataPascala(int n)
{
    n += 1;

    if (n <= 0)
        throw std::runtime_error("NotNaturalNumberException");

    this->n = n;

    this->wiersz = new int[n]{0};
    this->wiersz[0] = 1;

    for (int i = 1; i < n; i++)
    {

        for (int j = i; j > 0; j--)
        {

            this->wiersz[j] = this->wiersz[j - 1] + this->wiersz[j];
        }
    }
}

WierszTrojkataPascala::~WierszTrojkataPascala()
{
    delete[] this->wiersz;
}