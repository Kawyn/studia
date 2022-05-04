import javafx.scene.shape.Circle;
import javafx.scene.transform.Rotate;

/**
 * @see LIShape
 */
public class LICircle extends Circle implements LIShape {

    public LICircle() {
        super();

        this.setOnMouseClicked(new DefaultClickHandler(this));

        DefaultDragHandler dragHandler = new DefaultDragHandler(this);

        this.setOnMousePressed(dragHandler);
        this.setOnMouseDragged(dragHandler);

        this.setOnScroll(new DefaultScrollHandler(this));

        DefaultKeyboardHandler rotateHandler = new DefaultKeyboardHandler(this);

        this.setOnKeyPressed(rotateHandler);
    }

    @Override
    public void move(double x, double y) {

        this.setCenterX(this.getCenterX() + x);
        this.setCenterY(this.getCenterY() + y);
    }

    @Override
    public void scale(double f) {

        this.setRadius(this.getRadius() * f);
    }

    @Override
    public void rotate(double angle) {

        this.getTransforms().add(new Rotate(angle, this.getCenterX(), this.getCenterY()));
    }
}
