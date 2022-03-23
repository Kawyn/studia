public class Test {
    public static void main(String[] args) {

        WierszTrojkataPascala wiersz = null;

        try {
            int n = Integer.parseInt(args[0]);
            wiersz = new WierszTrojkataPascala(n);
        } catch (Exception e) {
            System.out.println("Niepoprawne dane startowe");
            System.exit(-1);
        }

        for (int i = 1; i < args.length; i++) {

            try {
                int m = Integer.parseInt(args[i]);
                System.out.println(args[i] + " - " + wiersz.wspolczynnik(m));
            } catch (NumberFormatException e) {
                System.out.println(args[i] + " - niepoprawna dana");

            } catch (OutOfRangeException e) {
                System.out.println(args[i] + " - liczba spoza zakresu");
            }
        }
    }
}
