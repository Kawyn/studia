#include <stdio.h>
#include <stdbool.h>

bool palindrom(char napis[])
{
    int n = 0;

    while (napis[n] != '\0')
        n++;

    for (int i = 0; i < (n + 1) / 2; i++)
    {
        if (napis[i] != napis[n - i - 1])
            return false;
    }

    return true;
}
