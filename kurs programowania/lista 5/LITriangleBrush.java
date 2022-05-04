import javafx.scene.shape.Shape;

public class LITriangleBrush implements Brush {

    @Override
    public Shape empty() {
        return new LITriangle();
    }

    @Override
    public void resize(Shape shape, double startX, double startY, double currentX, double currentY) {

        LITriangle tirangle = (LITriangle) shape;

        double centerX = (startX + currentX) / 2;

        double minY = Math.min(startY, currentY);
        double maxY = Math.max(startY, currentY);

        tirangle.getPoints().setAll(new Double[] {
                startX, maxY,
                currentX, maxY,
                centerX, minY
        });
    }
}
