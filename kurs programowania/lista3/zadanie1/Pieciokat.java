public class Pieciokat extends Figura {

    public int bok;

    public Pieciokat(int bok) {

        if (bok < 0)
            throw new IllegalArgumentException();

        this.bok = bok;
    }

    public double pole() {

        return bok * bok * Math.sqrt(25 + 10 * Math.sqrt(5)) / 4;
    }

    public double obwod() {

        return 5 * bok;
    }
}