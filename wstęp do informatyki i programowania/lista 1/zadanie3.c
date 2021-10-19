// zadanie3.c Kewin Ignasiak

#include <stdio.h>

int main()
{
    int n;

    printf("podaj n: ");
    scanf_s("%d", &n);

    for (int y = 0; y < n; y++)
    {
        for (int x = 0; x < 2 * n; x++)
        {
            printf("*");
        }

        printf("\n");
    }

    return 0;
}
