#pragma once

class WierszTrojkataPascala
{

public:
    int wspolczynnik(int m);
    WierszTrojkataPascala(int n);
    ~WierszTrojkataPascala();

private:
    int n;
    int *wiersz;
};