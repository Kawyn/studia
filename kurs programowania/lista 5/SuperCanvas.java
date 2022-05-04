import javafx.event.EventHandler;
import javafx.scene.input.MouseButton;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.scene.shape.Shape;

public class SuperCanvas extends Pane {

    // ta klasa jest singletonem tak jakby
    public static SuperCanvas Instance;

    /**
     * Domyślny kolor figury.
     */
    public static final Color DEFAULT_COLOR = Color.BLACK;

    /**
     * Kolor ramki zaznaczonej figury.
     */
    public static final Color BORDER_COLOR = Color.AQUAMARINE;

    public static final int PREFERED_WIDTH = 800;
    public static final int PREFERED_HEIGHT = 800;

    /**
     * Aktualnie wybrany pędzel.
     */
    public Brush brush = new LICircleBrush();

    private double dragStartX = 0;
    private double dragStartY = 0;

    private Shape tempShape = null;
    private Shape selectedShape = null;

    /**
     * Zwraca aktywną figurę.
     * 
     * @return Aktywna figura.
     */
    public Shape getSelectedShape() {
        return selectedShape;
    }

    /**
     * Ustawia aktywną figurę i jej wygląd oraz "czyści" poprzednio wybraną figurę,
     * jeśli owa istnieje.
     * 
     * @param shape - Figura, która ma być aktywna lub <b>null</b> jak nic nie ma
     *              być aktywne.
     */
    public void setSelectedShape(Shape shape) {

        if (selectedShape != null)
            selectedShape.setStroke(Color.TRANSPARENT);

        if (shape != null) {

            shape.requestFocus();

            shape.setStrokeWidth(5);
            shape.setStroke(BORDER_COLOR);
        }

        selectedShape = shape;
    }

    public SuperCanvas() {

        SuperCanvas.Instance = this;

        // tutaj w 4 linijkach z kodem jest robiony prostokąt którego wymiary są
        // zbindowane do wymiarów SuperCanvasu, i ten (prostokąt) używany jest aby
        // przycinać rzeczy
        Rectangle clipRect = new Rectangle(this.getWidth(), this.getHeight());

        clipRect.heightProperty().bind(this.heightProperty());
        clipRect.widthProperty().bind(this.widthProperty());

        this.setClip(clipRect);

        // jeżel kliknięto nic, usuwa zaznaczenie
        this.setOnMouseClicked(new EventHandler<MouseEvent>() {

            @Override
            public void handle(MouseEvent arg0) {

                if (arg0.getTarget() == Instance)
                    setSelectedShape(null);
            }
        });

        // rysowanie figur
        this.setOnMouseDragged(new EventHandler<MouseEvent>() {
            @Override
            public void handle(MouseEvent event) {

                if (!event.getButton().equals(MouseButton.PRIMARY))
                    return;

                if (selectedShape != null)
                    return;

                // nie ma rysowanej figury oznacza, że trzeba zrobić figurę
                if (tempShape == null) {

                    dragStartX = event.getX();
                    dragStartY = event.getY();

                    tempShape = (Shape) brush.empty();

                    tempShape.setFill(DEFAULT_COLOR);

                    getChildren().add(tempShape);
                }

                brush.resize(tempShape, dragStartX, dragStartY, event.getX(),
                        event.getY());
            }
        });

        // po puszczeniu myszki robimy z figury prawdziwą figurę
        this.setOnMouseReleased(new EventHandler<MouseEvent>() {
            @Override
            public void handle(MouseEvent event) {
                tempShape = null;
            }
        });
    }
}
