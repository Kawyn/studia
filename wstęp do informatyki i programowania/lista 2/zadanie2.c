// zadanie2.c Kewin Ignasiak

#include <stdio.h>

int main()
{
    int n;

    printf("podaj n: ");
    scanf("%d", &n);

    float srednia = 0;

    for (int i = 0; i < n; i++)
    {
        float ix;

        printf("podaj x%d: ", i);
        scanf("%f", &ix);

        srednia += ix;
    }

    srednia /= n;

    printf("srednia liczb wynosi: %f", srednia);

    return 0;
}
