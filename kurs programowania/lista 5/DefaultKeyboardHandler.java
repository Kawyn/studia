import javafx.event.EventHandler;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.shape.Shape;

/**
 * Handler odpowiedzialny obracanie figury na <b>Płótnie</b>.
 * Obracanie figury odbywa się za pomocą klawiszy <b>Q</b> oraz <b>E</b>.
 * Powinien być on przypisany do <b>onKeyPressed</b> figury.
 */
public class DefaultKeyboardHandler implements EventHandler<KeyEvent> {

    private LIShape shape;

    /**
     * Tworzy nowy <b>DefaultRotateHandler</b>
     * 
     * @param shape - Figura, która ma być obracana.
     */
    public DefaultKeyboardHandler(LIShape shape) {
        this.shape = shape;
    }

    @Override
    public void handle(KeyEvent event) {

        if (SuperCanvas.Instance.getSelectedShape() != shape)
            return;

        // dzięki wybraniu super liczby 11, możliwe jest otrzymanie dowolnego kąta
        // obrotu w ciągu 360 obrotów...
        if (event.getCode().equals(KeyCode.Q))
            shape.rotate(-11);

        if (event.getCode().equals(KeyCode.E))
            shape.rotate(11);

        // dodatkowo dodane jest usuwanie tutaj...
        if (event.getCode().equals(KeyCode.DELETE))
            SuperCanvas.Instance.getChildren().remove((Shape) shape);
    }
}
