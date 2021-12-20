all: main

main: main.o phi.o 
	clang -o main main.o phi.o
	
main.o: main.c
	clang -c main.c

phi.o: phi.c
	clang -c phi.c

clean:
	rm -f main *.o *~