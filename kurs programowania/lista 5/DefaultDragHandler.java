import javafx.event.EventHandler;
import javafx.scene.input.MouseEvent;

/**
 * Handler odpowiedzialny za przesuwanie figury po <b>Płótnie</b>.
 * Jedna Instancja tego Handlera powinna być przypisana do <b>onMousePressed</b>
 * oraz <b>onMouseDragged</b> figury.
 */
public class DefaultDragHandler implements EventHandler<MouseEvent> {

    private double startX;
    private double startY;

    private LIShape shape;

    /**
     * Tworzy nowy <b>DefaultDragHandler</b>.
     * 
     * @param shape - Figura, która ma być przesuwana.
     */
    public DefaultDragHandler(LIShape shape) {
        this.shape = shape;
    }

    @Override
    public void handle(MouseEvent event) {

        if (SuperCanvas.Instance.getSelectedShape() != shape)
            return;

        if (event.getEventType() == MouseEvent.MOUSE_PRESSED) {

            startX = event.getX();
            startY = event.getY();
        }

        double deltaX = event.getX() - startX;
        double deltaY = event.getY() - startY;

        shape.move(deltaX, deltaY);

        startX = event.getX();
        startY = event.getY();
    }
}
