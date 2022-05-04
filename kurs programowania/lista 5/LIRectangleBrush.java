import javafx.scene.shape.Rectangle;
import javafx.scene.shape.Shape;

public class LIRectangleBrush implements Brush {

    @Override
    public Shape empty() {
        return new LIRectangle();
    }

    @Override
    public void resize(Shape shape, double startX, double startY, double currentX, double currentY) {

        Rectangle rectangle = (LIRectangle) shape;

        double width = Math.abs(startX - currentX);
        double height = Math.abs(startY - currentY);

        rectangle.setX(Math.min(startX, currentX));
        rectangle.setY(Math.min(startY, currentY));

        rectangle.setWidth(width);
        rectangle.setHeight(height);
    }
}
