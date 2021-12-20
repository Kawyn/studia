all: main

main: main.o f.o rozwiazanie.o
	clang -o main main.o palindrom.o f.o rozwiazanie.o -lm
	
main.o: main.c
	clang -c main.c -lm

rozwiazanie.o: rozwiazanie.c
	clang -c rozwiazanie.c -lm

f.o: f.c
	clang -c f.c -lm

clean:
	rm -f main *.o *~