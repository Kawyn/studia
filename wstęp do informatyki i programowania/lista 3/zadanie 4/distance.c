#include <math.h>
#include "agents.h"

double distance(struct agent a1, struct agent a2)
{
    int x = a1.x - a2.x;
    int y = a1.y - a2.y;

    return sqrt(pow(x, 2) + pow(y, 2));
}