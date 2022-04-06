public class Kolo extends Figura {

    public int promien;

    public Kolo(int promien) {

        if (promien < 0)
            throw new IllegalArgumentException();

        this.promien = promien;
    }

    public double pole() {

        return Math.PI * promien * promien;
    }

    public double obwod() {

        return 2 * Math.PI * promien;
    }
}