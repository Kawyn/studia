#include "LiczbyPierwsze.hpp"

#include <iostream>
#include <math.h>

LiczbyPierwsze::LiczbyPierwsze(int n)
{
    if (n < 2)
        throw std::invalid_argument("error");

    bool *temp = new bool[n]{false};

    ilosc_liczb_pierwszych = n - 1;

    temp[0] = true;
    temp[1] = true;

    for (int i = 2; i <= sqrt(n); i++)
    {

        if (temp[i] == false)
        {

            for (int j = 2 * i; j < n + 1; j += i)
            {
                if (temp[j] == false)
                {
                    temp[j] = true;
                    ilosc_liczb_pierwszych--;
                }
            }
        }
    }

    int index = 0;
    liczby_pierwsze = new int[ilosc_liczb_pierwszych]{0};

    for (int i = 0; i < n + 1; i++)
    {

        if (temp[i] == false)
        {

            liczby_pierwsze[index] = i;
            index++;
        }
    }

    delete temp;
}

int LiczbyPierwsze::liczba(int m)
{

    if (0 <= m && m < ilosc_liczb_pierwszych)
        return liczby_pierwsze[m];

    throw std::invalid_argument("error");
}

LiczbyPierwsze::~LiczbyPierwsze()
{
    delete liczby_pierwsze;
}
