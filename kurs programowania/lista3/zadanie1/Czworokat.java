public abstract class Czworokat extends Figura {

    public int bok1, bok2, bok3, bok4;
    public int kat;

    public Czworokat(int bok1, int bok2, int bok3, int bok4, int kat) {

        if (kat < 0 || 360 <= kat)
            throw new IllegalArgumentException();

        if (bok1 < 0 || bok2 < 0 || bok3 < 0 || bok4 < 0)
            throw new IllegalArgumentException();

        this.bok1 = bok1;
        this.bok2 = bok2;
        this.bok3 = bok3;
        this.bok4 = bok4;

        this.kat = kat;
    }
}
