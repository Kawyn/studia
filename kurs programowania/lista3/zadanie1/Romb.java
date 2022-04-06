public class Romb extends Czworokat {

    public Romb(int a, int alfa) {
        super(a, a, a, a, alfa);

        if (alfa > 180)
            throw new IllegalArgumentException();
    }

    public double pole() {

        return Math.abs(this.bok1 * this.bok1 * Math.sin(Math.toRadians(
                Math.abs(kat - 2 * (kat % 90)))));
    }

    public double obwod() {

        return 4 * this.bok1;
    }
}
