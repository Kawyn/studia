// zadanie1.c Kewin Ignasiak

#include <stdio.h>

int main()
{
    int zl, gr;

    printf("podaj liczbe zlotych: ");
    scanf("%d", &zl);

    printf("podaj liczbe groszy: ");
    scanf("%d", &gr);

    int zl_pieniadze[8] = {200, 100, 50, 20, 10, 5, 2, 1};
    int gr_pieniadze[6] = {50, 20, 10, 5, 2, 1};

    if (zl >= 10)
        printf("banknoty: \n");

    for (int i = 0; i < 8; i++)
    {
        if (zl_pieniadze[i] == 5 && (zl > 0 || gr > 0))
            printf("monety: \n");

        int ilosc = zl / zl_pieniadze[i];

        if (ilosc > 0)
        {
            zl -= ilosc * zl_pieniadze[i];
            printf("\t%d x %d zl\n", ilosc, zl_pieniadze[i]);
        }
    }

    for (int i = 0; i < 6; i++)
    {
        int ilosc = gr / gr_pieniadze[i];

        if (ilosc > 0)
        {
            gr -= ilosc * gr_pieniadze[i];
            printf("\t%d x %d gr\n", ilosc, gr_pieniadze[i]);
        }
    }

    return 0;
}
