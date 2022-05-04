import javafx.scene.shape.Rectangle;
import javafx.scene.transform.Rotate;

/**
 * @see LIShape
 */
public class LIRectangle extends Rectangle implements LIShape {

    public LIRectangle() {
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

        this.setX(this.getX() + x);
        this.setY(this.getY() + y);
    }

    @Override
    public void scale(double f) {

        double deltaW = this.getWidth() * (1 - f);
        double deltaH = this.getHeight() * (1 - f);

        this.move(deltaW / 2, deltaH / 2);

        this.setWidth(this.getWidth() * f);
        this.setHeight(this.getHeight() * f);
    }

    @Override
    public void rotate(double angle) {

        this.getTransforms().add(new Rotate(angle,
                this.getX() + this.getWidth() / 2,
                this.getY() + this.getHeight() / 2));
    }
}
