// zadanie_4.c Kewin Ignasiak

#include <stdio.h>

int main()
{
    int n;

    printf("podaj n: ");
    scanf_s("%d", &n);

    for (int y = 0; y < n; y++)
    {
        for (int x = 0; x < n / 2 + y; x++)
        {
            if (x >= n / 2 - 1 - y)
                printf("*");
            else
                printf(" ");
        }

        printf("\n");
    }

    return 0;
}