import javafx.collections.ObservableList;
import javafx.event.EventHandler;
import javafx.scene.input.MouseEvent;
import javafx.scene.shape.Polygon;

/**
 * Specjalna implementacja DragHandlera dla trójkąta, by można go za rogi łapać.
 * 
 * @see DefaultDragHandler
 */
public class TriangleDragHandler implements EventHandler<MouseEvent> {

    /**
     * Jak blisko musi być kursor wierzchołka by go złapać (w px).
     */
    private final double MAX_DISTANCE = 25;

    private double startX;
    private double startY;

    private LIShape triangle;

    public TriangleDragHandler(LITriangle triangle) {
        this.triangle = triangle;
    }

    @Override
    public void handle(MouseEvent event) {

        // figura musi być wybrana
        if (SuperCanvas.Instance.getSelectedShape() != triangle)
            return;

        if (event.getEventType() == MouseEvent.MOUSE_PRESSED) {

            startX = event.getX();
            startY = event.getY();
        }

        double deltaX = event.getX() - startX;
        double deltaY = event.getY() - startY;

        ObservableList<Double> points = ((Polygon) triangle).getPoints();

        // w tej pętli sprawdzana jest odległość od kursora i przesuwany jest jeden
        // wierzchołek gdy jest wystarczająco blisko
        for (int i = 0; i < 5; i += 2) {

            double distance = Math.sqrt(Math.pow(points.get(i) - startX, 2) + Math.pow(points.get(i + 1) - startY, 2));

            if (distance < MAX_DISTANCE) {

                Polygon polygon = (Polygon) triangle;

                polygon.getPoints().set(i, points.get(i) + deltaX);
                polygon.getPoints().set(i + 1, points.get(i + 1) + deltaY);

                startX = event.getX();
                startY = event.getY();

                return;
            }
        }

        triangle.move(deltaX, deltaY);

        startX = event.getX();
        startY = event.getY();
    }
}
