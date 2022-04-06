public class Test {

    public static void main(String[] args) {

        if (args.length < 2) {
            System.out.println("Niepoprawna liczba argumentow");
            System.exit(-1);
        }

        char[] literki = args[0].toLowerCase().toCharArray();
        Figura[] figury = new Figura[literki.length];

        int indeks = 1;

        try {
            for (int i = 0; i < literki.length; i++) {

                char znak = literki[i];

                if (znak == 'o') {

                    int r = Integer.parseInt(args[indeks]);
                    indeks += 1;

                    Kolo o = new Kolo(r);

                    figury[i] = o;
                } else if (znak == 'p') {

                    int a = Integer.parseInt(args[indeks]);
                    indeks += 1;

                    Pieciokat p = new Pieciokat(a);

                    figury[i] = p;
                } else if (znak == 's') {

                    int a = Integer.parseInt(args[indeks]);
                    indeks += 1;

                    Szesciokat s = new Szesciokat(a);

                    figury[i] = s;
                } else if (znak == 'c') {

                    int bok1 = Integer.parseInt(args[indeks]);
                    indeks += 1;

                    int bok2 = Integer.parseInt(args[indeks]);
                    indeks += 1;

                    int bok3 = Integer.parseInt(args[indeks]);
                    indeks += 1;

                    int bok4 = Integer.parseInt(args[indeks]);
                    indeks += 1;

                    int kat = Integer.parseInt(args[indeks]);
                    indeks += 1;

                    if (kat != 90) {
                        if (bok1 == bok2 && bok2 == bok3 && bok3 == bok4) {
                            Romb r = new Romb(bok1, kat);

                            figury[i] = r;
                        } else
                            throw new UnsupportedOperationException();
                    } else {
                        if (bok1 == bok2 && bok2 == bok3 && bok3 == bok4) {

                            Kwadrat k = new Kwadrat(bok1);
                            figury[i] = k;

                        } else if ((bok1 == bok2 && bok3 == bok4) || (bok1 == bok3 && bok2 == bok4)) {

                            Prostokat p = new Prostokat(bok1, bok4);
                            figury[i] = p;

                        } else if (bok1 == bok4 && bok2 == bok3) {

                            Prostokat p = new Prostokat(bok1, bok2);
                            figury[i] = p;
                        } else
                            throw new UnsupportedOperationException();
                    }

                } else {
                    System.out.println(literki[i] + " jest niepoprawnym typem figury");
                    System.exit(-1);
                }

            }

        } catch (NumberFormatException e) {

            System.out.println("Podano niepoprawne dane (argument " + indeks + ": " + args[indeks] + ")");
            System.exit(-1);

        } catch (IllegalArgumentException e) {

            System.out.println("Podano niepoprawne dane (argument " + indeks + ": " + args[indeks - 1] + ")");
            System.exit(-1);

        } catch (IndexOutOfBoundsException e) {

            System.out.println("Podano niedostatecznie wiele danych");
            System.exit(-1);

        } catch (UnsupportedOperationException e) {

            System.out.println("Podane dane czworokata nie reprezentujom kwadratu, rombu ani prostokata (" +
                    args[indeks - 5] + " " +
                    args[indeks - 4] + " " +
                    args[indeks - 3] + " " +
                    args[indeks - 2] + " " +
                    args[indeks - 1] +
                    ")");
            System.exit(-1);
        }

        for (int i = 0; i < literki.length; i++) {
            System.out.println(
                    (i + 1) + ". " + literki[i] + ": pole = " + figury[i].pole() + " | obwod = " + figury[i].obwod());
        }
    }
}