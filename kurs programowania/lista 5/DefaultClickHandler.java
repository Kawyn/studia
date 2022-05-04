import javafx.event.EventHandler;
import javafx.scene.input.MouseButton;
import javafx.scene.input.MouseEvent;
import javafx.scene.shape.Shape;

/**
 * Handler odpowiedzialny wybieranie figury na <b>Płótnie</b> oraz otwierana
 * <b>ColorPickerDialog</b>.
 * Powinien być on przypisany do <b>onMouseClicked</b> figury.
 * 
 * @see ColorPickerDialog
 */
public class DefaultClickHandler implements EventHandler<MouseEvent> {

    private Shape shape;

    /**
     * Tworzy nowy <b>DefaultClickHandler</b>.
     * 
     * @param shape - Figura, która ma być przesuwana.
     */
    public DefaultClickHandler(Shape shape) {

        this.shape = shape;
    }

    @Override
    public void handle(MouseEvent event) {

        if (event.getButton().equals(MouseButton.PRIMARY))
            SuperCanvas.Instance.setSelectedShape(shape);

        else if (event.getButton().equals(MouseButton.SECONDARY)) {

            if (SuperCanvas.Instance.getSelectedShape() != shape)
                return;

            ColorPickerDialog.Instance.showAndWait();
        }
    }
}
