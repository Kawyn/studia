// zadanie2.c Kewin Ignasiak

#include <stdio.h>
#include <math.h>

int main()
{
    float a, b, c;

    printf("a = ");
    scanf_s("%f", &a);

    printf("b = ");
    scanf_s("%f", &b);

    printf("c = ");
    scanf_s("%f", &c);

    float delta = (b * b) - (4 * a * c);

    printf("%f\n", delta);

    if (delta < 0)
    {
        printf("brak rozwiazan w zbiorze liczb rzeczywistych");
    }
    else if (delta == 0)
    {
        float x0 = -b / (2 * a);

        printf("x0 = %f", x0);
    }
    else
    {
        float x1 = (-b - sqrt(delta)) / (2 * a);
        float x2 = (-b + sqrt(delta)) / (2 * a);

        printf("x1 = %f oraz x2 = %f", x1, x2);
    }

    return 0;
}