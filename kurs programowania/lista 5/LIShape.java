/**
 * Interfejs zawierający wszystkie potrzebne metody do interakcji z figruą.
 * 
 * Klasa implementująca ten interfejs powinna rozszerzać, którąś z fxowych
 * <b>Shape</b>
 */
public interface LIShape {

    /**
     * Przesuwa figurę o wektor (x, y).
     * 
     * @param x pierwsza składowa wektora
     * @param y druga składowa wektora
     */
    public void move(double x, double y);

    /**
     * Skaluje figurę f razy, zachowując środek figury w tym samym miejscu.
     * 
     * @param f czynnik skalujący
     */
    public void scale(double f);

    /**
     * Obraca figurę o angle (w stopniach), wokół środka figury.
     * 
     * @param angle kąt obrotu (w stopniach)
     */
    public void rotate(double angle);
}
