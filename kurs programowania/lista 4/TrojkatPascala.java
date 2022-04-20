public class TrojkatPascala {

    private int[][] trojkat;

    public int wspolczynnik(int x, int y) {
        return trojkat[x][y];
    }

    public TrojkatPascala(int n) throws IllegalArgumentException {

        if (n <= 0)
            throw new IllegalArgumentException();

        trojkat = new int[n][n];
        trojkat[0][0] = 1;

        for (int i = 1; i < n; i++) {

            trojkat[i][0] = 1;

            for (int j = i; j > 0; j--) {

                trojkat[i][j] = trojkat[i - 1][j - 1] + trojkat[i - 1][j];
            }
        }
    }
}