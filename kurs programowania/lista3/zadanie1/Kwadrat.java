public class Kwadrat extends Czworokat {

    public Kwadrat(int a) {
        super(a, a, a, a, 90);
    }

    public double pole() {

        return this.bok1 * this.bok1;
    }

    public double obwod() {

        return 4 * this.bok1;
    }
}
