import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.scene.shape.Line;
import javafx.scene.text.Text;
import javafx.scene.text.TextAlignment;

public class BinaryTreeVizualizer extends Pane {

    private final Integer CIRCLE_RADIUS = 15;

    private final Integer DELTA_Y = 50;
    private final Integer OFFSET_Y = 50;

    private String currentTree = "";

    public BinaryTreeVizualizer() {

        this.widthProperty().addListener(event -> {

            if (!this.currentTree.equals(""))
                this.draw(currentTree);
        });

        this.heightProperty().addListener(event -> {

            if (!this.currentTree.equals(""))
                this.draw(currentTree);
        });
    }

    private Integer getSubstringIndex(String s) {

        Integer depth = 0;
        for (int i = 0; i < s.length(); i++) {

            if (s.charAt(i) == '(')
                depth++;

            else if (s.charAt(i) == ')')
                depth--;

            if (depth == 0 && i + 1 < s.length()) {

                if (s.charAt(i) == ')' && s.charAt(i + 1) == '(')
                    return i + 1;
            }
        }

        return -1;
    }

    public void draw(String s) {

        this.draw(s, 1, 0);
    }

    public void draw(String s, Integer index, Integer depth) {

        // usuwa zerwnętrzne nawiasy
        if (depth != 0)
            s = s.substring(1, s.length() - 1);
        else {
            currentTree = s;
            this.getChildren().clear();
        }

        if (s.equals("") || s.equals("_"))
            return;

        String value = s.substring(0, s.indexOf("("));
        s = s.substring(s.indexOf("("));

        Double x = index * this.getWidth() / (Math.pow(2, depth) + 1), y = OFFSET_Y + DELTA_Y * depth + 0.0;

        if (depth != 0) {

            Line line = new Line(((index + 1) / 2) * this.getWidth() / (Math.pow(2, depth - 1) + 1),
                    OFFSET_Y + DELTA_Y * (depth - 1), x, y);

            line.setViewOrder(10);

            this.getChildren().add(line);
        }

        Text text = new Text(x - CIRCLE_RADIUS, y, value);
        text.setWrappingWidth(CIRCLE_RADIUS * 2);
        text.setTextAlignment(TextAlignment.CENTER);

        this.getChildren().addAll(new Circle(x, y, CIRCLE_RADIUS, Color.BLUEVIOLET), text);

        Integer i = getSubstringIndex(s);

        if (i == -1)
            return;

        draw(s.substring(0, i), index * 2 - 1, depth + 1);
        draw(s.substring(i), index * 2, depth + 1);
    }
}
