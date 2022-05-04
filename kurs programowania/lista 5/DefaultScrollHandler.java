import javafx.event.EventHandler;
import javafx.scene.input.ScrollEvent;

/**
 * Handler odpowiedzialny zmianę rozmiaru figury.
 * Powinien być on przypisany do <b>onScroll</b> figury.
 */
public class DefaultScrollHandler implements EventHandler<ScrollEvent> {

    private final double SCALE_MODIFIER = 0.005;

    private LIShape shape;

    /**
     * Tworzy nowy <b>DefaultScrollHandler</b>
     * 
     * @param shape - Figura, która ma być obracana.
     */
    public DefaultScrollHandler(LIShape shape) {
        this.shape = shape;
    }

    @Override
    public void handle(ScrollEvent event) {

        if (SuperCanvas.Instance.getSelectedShape() != shape)
            return;

        shape.scale(1 + event.getDeltaY() * SCALE_MODIFIER);
    }
}
