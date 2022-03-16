public class Test {

    public static void main(String[] args) {

        if (args.length == 0)
        {
            System.out.println("za malo argumentow");
            System.exit(-1);
        }
        LiczbyPierwsze liczbyPierwsze = null;

        try {

            int n = Integer.parseInt(args[0]);
            liczbyPierwsze = new LiczbyPierwsze(n);
        } catch (Exception exception) {
            System.out.println(args[0] + " - nieprawidlwa dana");
            System.exit(-1);
        }

        for (int i = 1; i < args.length; i++) {

            try {

                int n = Integer.parseInt(args[i]);
                System.out.println(args[i] + " - " + liczbyPierwsze.liczba(n));
            } catch (NumberFormatException e) {
                System.out.println(args[i] + " - nieprawidlowa dana");
            } catch (IllegalArgumentException e) {
                System.out.println(args[i] + " - liczba spoza zakresu");
            }
        }
    }
}
