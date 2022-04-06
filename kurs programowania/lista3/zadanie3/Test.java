public class Test {

    public static void main(String[] args) {

        if (args.length < 2) {
            System.out.println("Niepoprawna liczba argumentow");
            System.exit(-1);
        }

        char[] literki = args[0].toLowerCase().toCharArray();
        String[] wyniki = new String[literki.length];

        int indeks = 1;

        try {
            for (int i = 0; i < literki.length; i++) {

                char znak = literki[i];

                if (znak == 'o') {

                    int a = Integer.parseInt(args[indeks]);
                    indeks += 1;

                    wyniki[i] = i + ". o: pole = " + Figury.JednoParametrowe.KOLO.obliczPole(a) + " | " +
                            Figury.JednoParametrowe.KOLO.obliczPole(a);

                } else if (znak == 'p') {

                    int a = Integer.parseInt(args[indeks]);
                    indeks += 1;

                    wyniki[i] = i + ". p: pole = " + Figury.JednoParametrowe.PIECIOKAT.obliczPole(a) + " | " +
                            Figury.JednoParametrowe.PIECIOKAT.obliczPole(a);

                } else if (znak == 's') {

                    int a = Integer.parseInt(args[indeks]);
                    indeks += 1;

                    wyniki[i] = i + ". s: pole = " + Figury.JednoParametrowe.SZESCIOKAT.obliczPole(a) + " | " +
                            Figury.JednoParametrowe.SZESCIOKAT.obliczPole(a);
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
                            wyniki[i] = i + ". c: pole = " + Figury.WieloParametrowe.ROMB.obliczPole(bok1, kat) +
                                    " | " + Figury.WieloParametrowe.ROMB.obliczPole(bok1, kat);
                        } else
                            throw new UnsupportedOperationException();
                    } else {
                        if (bok1 == bok2 && bok2 == bok3 && bok3 == bok4) {

                            wyniki[i] = i + ". c: pole = " + Figury.JednoParametrowe.KWADRAT.obliczPole(bok1) +
                                    " | " + Figury.JednoParametrowe.KWADRAT.obliczPole(bok1);

                        } else if ((bok1 == bok2 && bok3 == bok4) || (bok1 == bok3 && bok2 == bok4)) {
                            wyniki[i] = i + ". c: pole = " + Figury.WieloParametrowe.PROSTOKAT.obliczPole(bok1, bok4) +
                                    " | " + Figury.WieloParametrowe.ROMB.obliczPole(bok1, bok4);

                        } else if (bok1 == bok4 && bok2 == bok3) {
                            wyniki[i] = i + ". c: pole = " + Figury.WieloParametrowe.PROSTOKAT.obliczPole(bok1, bok2) +
                                    " | " + Figury.WieloParametrowe.ROMB.obliczPole(bok1, bok2);
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

        for (int i = 0; i < wyniki.length; i++) {
            System.out.println(wyniki[i]);
        }
    }
}