import javafx.scene.control.Menu;

/**
 * Lista wszystkich dostępnych pędzli.
 */
class BrushList extends Menu {

    /**
     * Taka klasa pomocnicza, by nie robić dwóch list.
     */
    private class BrushPair {

        public String name;
        public Brush type;

        public BrushPair(String name, Brush type) {
            this.name = name;
            this.type = type;
        }
    }

    /**
     * Lista z wszystkimi dostępnymi pędzlami.
     */
    private final BrushPair[] brushes = {
            new BrushPair("Okrąg", new LICircleBrush()),
            new BrushPair("Prostokąt", new LIRectangleBrush()),
            new BrushPair("Trójkąt", new LITriangleBrush())
    };

    /**
     * Tworzy menu z wszystkimi dostępnymi pędzlami.
     */
    public BrushList() {
        super("Figury");

        for (BrushPair brush : brushes)
            this.getItems().add(new BrushMenuItem(brush.name, brush.type));

    }
}