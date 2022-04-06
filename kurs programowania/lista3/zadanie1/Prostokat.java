public class Prostokat extends Czworokat {

    public Prostokat(int a, int b) {
        super(a, a, b, b, 90);
    }

    public double pole() {

        return bok1 * bok3;
    }

    public double obwod() {

        return bok1 + bok2 + bok3 + bok4;
    }
}
