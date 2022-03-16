#include <iostream>
#include <string.h>
#include "LiczbyPierwsze.hpp"

int main(int argc, char *argv[])
{
    if (argc < 2) {
        
        std::cout << "za mało argumentów" << std::endl;
        return -1;
    }

    LiczbyPierwsze *liczby_pierwsze;

    try
    {

        int n = std::stoi(argv[1]);
        liczby_pierwsze = new LiczbyPierwsze(n);
    }
    catch (std::invalid_argument e)
    {
        std::cout << argv[1] << " - nieprawidlwa dana" << std::endl;
        return -1;
    }

    for (int i = 2; i < argc; i++)
    {

        try
        {
            int n = std::stoi(argv[i]);
            int liczba = liczby_pierwsze->liczba(n);
            std::cout << argv[i] << " - " << liczba << std::endl;
        }
        catch (std::invalid_argument e)
        {
            if (!strcmp(e.what(), "stoi"))
                std::cout << argv[i] << " - nieprawidlowa dana" << std::endl;
            else
                std::cout << argv[i] << " - liczba spoza zakresu" << std::endl;
        }
    }
}
