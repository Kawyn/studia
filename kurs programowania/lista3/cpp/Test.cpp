#include "Kolo.hpp"
#include "Szesciokat.hpp"
#include "Pieciokat.hpp"
#include "Romb.hpp"
#include "Prostokat.hpp"
#include "Kwadrat.hpp"

#include <iostream>
#include <cstring>
#include <string>

#define MAX_FIGURY_SIZE 256

int main(int argc, char const *argv[])
{
    if (argc < 3)
    {
        std::cout << "Niepoprawna liczba argumentow" << std::endl;
        return -1;
    }

    const char *literki = argv[1];
    int literki_length = strlen(literki);

    Figura *figury[MAX_FIGURY_SIZE] = {NULL};

    int indeks = 2;

    try
    {
        for (int i = 0; i < literki_length; i++)
        {
            char znak = literki[i];

            if (znak == 'o')
            {
                if (indeks >= argc)
                    throw std::out_of_range("index_out_of_range");

                int r = std::stoi(argv[indeks]);
                indeks += 1;

                Kolo *o = new Kolo(r);

                figury[i] = o;
            }
            else if (znak == 'p')
            {
                if (indeks >= argc)
                    throw std::out_of_range("index_out_of_range");

                int a = std::stoi(argv[indeks]);
                indeks += 1;

                Pieciokat *p = new Pieciokat(a);

                figury[i] = p;
            }
            else if (znak == 's')
            {
                if (indeks >= argc)
                    throw std::out_of_range("index_out_of_range");

                int a = std::stoi(argv[indeks]);
                indeks += 1;

                Szesciokat *s = new Szesciokat(a);

                figury[i] = s;
            }
            else if (znak == 'c')
            {
                if (indeks >= argc)
                    throw std::out_of_range("index_out_of_range");

                int bok1 = std::stoi(argv[indeks]);
                indeks += 1;

                if (indeks >= argc)
                    throw std::out_of_range("index_out_of_range");

                int bok2 = std::stoi(argv[indeks]);
                indeks += 1;

                if (indeks >= argc)
                    throw std::out_of_range("index_out_of_range");

                int bok3 = std::stoi(argv[indeks]);
                indeks += 1;

                if (indeks >= argc)
                    throw std::out_of_range("index_out_of_range");

                int bok4 = std::stoi(argv[indeks]);
                indeks += 1;

                if (indeks >= argc)
                    throw std::out_of_range("index_out_of_range");

                int kat = std::stoi(argv[indeks]);
                indeks += 1;

                if (kat != 90)
                {
                    if (bok1 == bok2 && bok2 == bok3 && bok3 == bok4)
                    {
                        Romb *r = new Romb(bok1, kat);

                        figury[i] = r;
                    }
                    else
                        throw std::logic_error("not_implemented");
                }
                else
                {
                    if (bok1 == bok2 && bok2 == bok3 && bok3 == bok4)
                    {

                        Kwadrat *k = new Kwadrat(bok1);
                        figury[i] = k;
                    }
                    else if ((bok1 == bok2 && bok3 == bok4) || (bok1 == bok3 && bok2 == bok4))
                    {

                        Prostokat *p = new Prostokat(bok1, bok4);
                        figury[i] = p;
                    }
                    else if (bok1 == bok4 && bok2 == bok3)
                    {

                        Prostokat *p = new Prostokat(bok1, bok2);
                        figury[i] = p;
                    }
                    else
                        throw std::logic_error("not_implemented");
                }
            }
            else
            {
                std::cout << literki[i] << " jest niepoprawnym typem figury" << std::endl;
                return -1;
            }
        }
    }
    catch (std::invalid_argument e)
    {

        std::cout << "Podano niepoprawne dane (argument " << indeks << ": " << argv[indeks] << ")" << std::endl;
        return -1;
    }
    catch (std::runtime_error e)
    {

        std::cout << "Podano niepoprawne dane (argument " << indeks << ": " << argv[indeks - 1] << ")" << std::endl;
        return -1;
    }
    catch (std::out_of_range e)
    {

        std::cout << "Podano niedostatecznie wiele danych" << std::endl;
        return -1;
    }
    catch (std::logic_error e)
    {

        std::cout << "Podane dane czworokata nie reprezentujom kwadratu, rombu ani prostokata (" << argv[indeks - 5] << " " << argv[indeks - 4] << " " << argv[indeks - 3] << " " << argv[indeks - 2] << " " << argv[indeks - 1] << ")";
        return -1;
    }

    for (int i = 0; i < literki_length; i++)
    {
        std::cout << (i + 1) << ". " << literki[i] << ": pole = " << figury[i]->pole() << " | obwod = " << figury[i]->obwod() << std::endl;
    }
    return 0;
}
