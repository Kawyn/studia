#include <math.h>

int phi(long int n)
{
    long int y = n;

    for (int i = 2; i <= sqrt(n); i++)
    {
        if (n % i == 0)
        {
            while (n % i == 0)
                n /= i;

            y -= y / i;
        }
    }

    if (n > 1)
        y -= y / n;

    return y;
}

/*
    #define MAXIMAL_NUMBER_OF_DIVISORS 1344 // http://oeis.org/A066150

    int phi(long int n)
    {
        int y = 1; // policzone jest już 1

        long int divisors[MAXIMAL_NUMBER_OF_DIVISORS] = {0};
        int pointer = 0;

        for (int i = 2; i <= n / 2; i++)
        {
            if (n % i == 0)
            {
                divisors[pointer] = i;
                pointer++;
            }
        }

        for (int i = 2; i < n; i++)
        {
            int relative_prime = 1;

            for (int p = 0; p < pointer; p++)
            {
                if (i < divisors[p])
                    break;

                if (i % divisors[p] == 0)
                {
                    relative_prime = 0;
                    break;
                }
            }

            y += relative_prime;
        }

        return y;
    }
*/