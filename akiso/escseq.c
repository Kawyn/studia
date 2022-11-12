#include<stdio.h>

int main(int argc, char *argv[]) {

	for(int i = 0; i < 255; i++)
		printf("\033[38;5;%dm Hello World!\n", i);

	return 0;
}
