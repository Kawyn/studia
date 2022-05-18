import java.util.Random;
import javafx.scene.paint.Color;

/**
 * Klasa zawierająca pomocnicze metody oraz główną klasę <b>Random</b>.
 * 
 * @see Random
 */
public class Utilities {

    /**
     * Główna klasa <b>Random</b>.
     * 
     * @see Random
     */
    public static Random random = new Random();

    /**
     * Metoda zwracająca losowy kolor.
     * 
     * @return <b>Color</b> z losowymi wartościami RGB.
     * @see Color
     */
    public static Color randomColor() {
        return Color.rgb(random.nextInt(256), random.nextInt(256), random.nextInt(256));
    }

    /**
     * Metoda zwracająca średnią kolorów aktywnych sąsiadów.
     * 
     * @param square - kwadrat, którego sąsiedzi będą brani do liczenia nowego
     *               koloru.
     * @return <b>Color</b> ze średnimi wartościami RGB aktywnych sąsiadów.
     * @see Color
     */
    public static Color neighborsColor(Square square) {

        int i = 0;

        Square neighbors[] = {
                Program.squares[square.getX()][wrap(square.getY() - 1, Program.SIZE_Y)],
                Program.squares[square.getX()][wrap(square.getY() + 1, Program.SIZE_Y)],
                Program.squares[wrap(square.getX() + 1, Program.SIZE_X)][square.getY()],
                Program.squares[wrap(square.getX() - 1, Program.SIZE_X)][square.getY()]
        };

        double r = 0, g = 0, b = 0;

        for (Square neighbor : neighbors) {

            if (!neighbor.isActive())
                continue;

            r += neighbor.getColor().getRed();
            g += neighbor.getColor().getGreen();
            b += neighbor.getColor().getBlue();

            i++;
        }

        if (i == 0)
            return square.getColor();

        return new Color(r / i, g / i, b / i, 1);
    }

    /**
     * Metoda zwracająca wartości modulo z odwrotnościami (jakby <b>x</b> było
     * elementem grupy <b>Cn</b>).
     * 
     * @param x - Liczba do zmodułowania.
     * @param n - Podstawa modułu.
     * @return Liczbę z przedziału <0, n)
     */
    public static int wrap(int x, int n) {
        return x < 0 ? n + x : x % n;
    }

    /**
     * Rzutuje <b>String</b> na <b>Integer</b> łapiąc możliwe wyjątki.
     * 
     * @param s - Napis do rzutowania.
     * @return Przerzutowany Integer.
     */
    public static final int toInteger(String s) {

        int i = 0;

        try {
            i = Integer.parseInt(s);
        } catch (Exception e) {
            System.out.println("Nie mozna przekonwertowac \"" + s + "\" na Integer.");
            System.exit(-1);
        }

        return i;
    }

    /**
     * Rzutuje <b>String</b> na <b>Double</b> łapiąc możliwe wyjątki.
     * 
     * @param s - Napis do rzutowania.
     * @return Przerzutowany Double.
     */
    public static double toDouble(String s) {

        double i = 0;

        try {
            i = Double.parseDouble(s);
        } catch (Exception e) {
            System.out.println("Nie mozna przekonwertowac \"" + s + "\" na Double.");
            System.exit(-1);
        }

        return i;
    }

}