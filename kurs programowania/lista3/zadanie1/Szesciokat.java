public class Szesciokat extends Figura {

    public int bok;

    public Szesciokat(int bok) {

        if (bok < 0)
            throw new IllegalArgumentException();

        this.bok = bok;
    }

    public double pole() {

        return 3 * bok * bok * Math.sqrt(3) / 2;
    }

    public double obwod() {

        return 6 * bok;
    }
}