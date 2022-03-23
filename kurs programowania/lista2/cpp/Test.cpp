#include "WierszTrojkataPascala.hpp"

#include <iostream>
#include <string>

int main(int argc, char const *argv[])
{

    WierszTrojkataPascala *wiersz = NULL;

    try
    {
        int n = std::stoi(argv[1]);
        wiersz = new WierszTrojkataPascala(n);
    }
    catch (std::exception e)
    {
        std::cout << "Niepoprawne dane startowe" << std::endl;
        return -1;
    }

    for (int i = 2; i < argc; i++)
    {

        try
        {
            int m = std::stoi(argv[i]);
            std::cout << argv[i] << " - " << wiersz->wspolczynnik(m) << std::endl;
        }

        catch (std::runtime_error e)
        {
            std::cout << argv[i] << " - liczba spoza zakresu" << std::endl;
        }
        catch (std::invalid_argument e)
        {
            std::cout << argv[i] << " - niepoprawna dana" << std::endl;
        }
    }
}
