#pragma once

#include <string>

class LiczbyPierwsze
{
private:
    int ilosc_liczb_pierwszych;
    int *liczby_pierwsze;

public:
    int liczba(int m);
    LiczbyPierwsze(int i);
    ~LiczbyPierwsze();
};
