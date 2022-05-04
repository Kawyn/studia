import javafx.scene.shape.Shape;

/**
 * Interfejs zawierający wszystkie potrzebne metody do tworzenia figury na
 * <b>Płótnie</b>.
 */
public interface Brush {

    /**
     * Tworzy nową figurę, która implementuje interfejs <b>LIShape</b>.
     * 
     * @return Nowostworzona figura.
     */
    public Shape empty();

    /**
     * Przeskalowuje figurę jak w <b>MsPaint</b> podczas rysowania figur. W sensie,
     * że jest ta figura ograniczona przez pozycję kursora i punkt początkowy.
     * 
     * @param shape    - Figura do przeskalowania.
     * @param startX   - Początkowa wartość X.
     * @param startY   - Początkowa wartość Y.
     * @param currentX - Aktualna wartość X.
     * @param currentY - Aktualna wartość Y.
     */
    public void resize(Shape shape, double startX, double startY, double currentX, double currentY);
}
