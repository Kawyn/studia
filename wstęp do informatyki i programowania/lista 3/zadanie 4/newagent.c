#include "agents.h"

struct agent newagent(int x, int y)
{
    struct agent a = {x = x, y = y};
    return a;
}