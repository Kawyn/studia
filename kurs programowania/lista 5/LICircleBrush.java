import javafx.scene.shape.Shape;

public class LICircleBrush implements Brush {

    public Shape empty() {
        return new LICircle();
    }

    @Override
    public void resize(Shape shape, double startX, double startY, double currentX, double currentY) {

        double directionX = Math.signum(currentX - startX);
        double directionY = Math.signum(currentY - startY);

        LICircle circle = (LICircle) shape;

        double radius = Math.min(Math.abs(startX - currentX), Math.abs(startY - currentY)) / 2;

        // wartości są tak manipulowane by jeden z rogów zawsze pozostawał w miejscu
        // początkowym
        circle.setCenterX(startX + radius * directionX);
        circle.setCenterY(startY + radius * directionY);

        circle.setRadius(radius);
    }
}
