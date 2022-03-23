class WierszTrojkataPascala {

    private int[] wiersz;
    private int n;

    public WierszTrojkataPascala(int n) throws NotNaturalNumberException {

        n += 1;

        if (n <= 0)
            throw new NotNaturalNumberException();

        this.n = n;

        wiersz = new int[n];
        wiersz[0] = 1;

        for (int i = 1; i < n; i++) {

            for (int j = i; j > 0; j--) {

                wiersz[j] = wiersz[j - 1] + wiersz[j];
            }
        }
    }

    public int wspolczynnik(int m) throws OutOfRangeException {

        if (m < 0 || n <= m)
            throw new OutOfRangeException();

        return wiersz[m];
    }
}