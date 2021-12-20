struct agent
{
    int x;
    int y;
};

struct agent newagent(int, int);

void north(struct agent *);
void south(struct agent *);
void east(struct agent *);
void west(struct agent *);

double distance(struct agent, struct agent);