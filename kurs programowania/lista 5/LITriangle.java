import javafx.scene.shape.Polygon;
import javafx.scene.transform.Rotate;

/**
 * @see LIShape
 */
public class LITriangle extends Polygon implements LIShape {

    public LITriangle() {
        super();

        this.setOnMouseClicked(new DefaultClickHandler(this));

        TriangleDragHandler dragHandler = new TriangleDragHandler(this);

        this.setOnMousePressed(dragHandler);
        this.setOnMouseDragged(dragHandler);

        this.setOnScroll(new DefaultScrollHandler(this));

        DefaultKeyboardHandler rotateHandler = new DefaultKeyboardHandler(this);

        this.setOnKeyPressed(rotateHandler);
    }

    @Override
    public void move(double x, double y) {

        for (int i = 0; i < 5; i += 2) {

            this.getPoints().set(i, this.getPoints().get(i) + x);
            this.getPoints().set(i + 1, this.getPoints().get(i + 1) + y);
        }
    }

    @Override
    public void scale(double f) {

        double centerX = 0;
        double centerY = 0;

        for (int i = 0; i < 6; i += 2) {
            centerX += this.getPoints().get(i);
            centerY += this.getPoints().get(i + 1);
        }

        centerX /= 3;
        centerY /= 3;

        for (int i = 0; i < 6; i += 2) {

            double distanceX = this.getPoints().get(i) - centerX;
            double distanceY = this.getPoints().get(i + 1) - centerY;

            this.getPoints().set(i, centerX + distanceX * f);
            this.getPoints().set(i + 1, centerY + distanceY * f);
        }

    }

    @Override
    public void rotate(double angle) {

        double centerX = 0;
        double centerY = 0;

        for (int i = 0; i < 6; i += 2) {
            centerX += this.getPoints().get(i);
            centerY += this.getPoints().get(i + 1);
        }

        centerX /= 3;
        centerY /= 3;

        this.getTransforms().add(new Rotate(angle, centerX, centerY));
    }
}
