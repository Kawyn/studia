public class LiczbyPierwsze {

    private int iloscLiczbPierwszych = 0;
    private int[] liczbyPierwsze;

    public LiczbyPierwsze(int n) throws IllegalArgumentException {

        if (n < 2)
            throw new IllegalArgumentException();

        boolean[] temp = new boolean[n + 1];

        iloscLiczbPierwszych = n - 1;

        temp[0] = true;
        temp[1] = true;

        for (int i = 2; i <= Math.sqrt(n); i++) {

            if (temp[i] == false) {

                for (int j = 2 * i; j < n + 1; j += i) {

                    if (temp[j] == false) {

                        temp[j] = true;
                        iloscLiczbPierwszych--;
                    }
                }
            }
        }

        int index = 0;
        liczbyPierwsze = new int[iloscLiczbPierwszych];

        for (int i = 0; i < n + 1; i++) {

            if (temp[i] == false) {
                liczbyPierwsze[index] = i;
                index++;
            }
        }
    }

    public int liczba(int m) throws IllegalArgumentException {

        if (0 <= m && m < iloscLiczbPierwszych)
            return liczbyPierwsze[m];

        throw new IllegalArgumentException();
    }
}