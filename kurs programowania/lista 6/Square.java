import javafx.application.Platform;
import javafx.event.EventHandler;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.GridPane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;

/**
 * 
 */
public class Square extends Thread {

    /**
     * Pozycja <b>X</b> na siatce.
     */
    private int x;

    /**
     * @return Pozycję <b>X</b> na siatce.
     */
    public int getX() {
        return x;
    }

    /**
     * Pozycja <b>Y</b> na siatce.
     */
    private int y;

    /**
     * @return Pozycję <b>Y</b> na siatce.
     */
    public int getY() {
        return y;
    }

    /**
     * Aktualny kolor <b>rectangle</b>.
     */
    private Color color;

    /**
     * @return Aktualny kolor <b>rectangle</b>.
     */
    public Color getColor() {
        return color;
    }

    /**
     * Ustawia nowy kolor i aktualizuje <b>rectangle</b> aby go wyświetlał.
     * 
     * @param value - Nowy kolor.
     */
    public void setColor(Color value) {

        this.color = value;
        Platform.runLater(() -> rectangle.setFill(this.color));
    }

    /**
     * Aktywność wątku.
     */
    private boolean active = true;

    /**
     * Ustawia aktywność wątku i wywołuje <b>notify()</b> jeżeli <b>value</b> jest
     * równe <b>true</b>.
     * 
     * @param value - Nowa wartość dla <b>active</b>
     * @see Thread.notify()
     */
    private synchronized void setActive(boolean value) {

        this.active = value;

        if (this.active)
            this.notify();
    }

    /**
     * @return Aktywność wątku.
     */
    public boolean isActive() {
        return active;
    }

    /**
     * Wyświetlany w JavieFX kwadrat.
     */
    private Rectangle rectangle;

    /**
     * @return Wyświetlnay w JavieFX kwadrat.
     */
    public Rectangle getRectangle() {

        return rectangle;
    }

    /**
     * Siatka na której wyświetlane są <b>rectangle</b> wszystkich <b>Square</b>.
     */
    private GridPane root;

    /**
     * Tworzy nowy wątek i kwadrat dla niego. Następnie ustawia owy wątek jako
     * demon.
     * 
     * @param root - Miejsce gdzie będzie wyświetlany kwadrat.
     * @param x    - Pozycja <b>X</b> na <b>root</b>.
     * @param y    - Pozycja <b>Y</b> na <b>root</b>.
     */
    public Square(GridPane root, int x, int y) {

        this.root = root;
        this.x = x;
        this.y = y;

        this.rectangle = new Rectangle(Program.SQUARE_SIZE, Program.SQUARE_SIZE);

        this.setColor(Utilities.randomColor());

        rectangle.setOnMouseClicked(new EventHandler<MouseEvent>() {

            @Override
            public void handle(MouseEvent event) {
                setActive(!isActive());
            }
        });

        this.setDaemon(true);

        root.add(rectangle, x, y);
    }

    @Override
    public void run() {

        while (true) {

            try {

                // tutaj jest zmiana kolorków
                synchronized (root) {

                    System.out.println("[" + this.x + ", " + this.y + "] start");

                    if (Utilities.random.nextDouble() < Program.PROBABILITY)
                        this.setColor(Utilities.randomColor());
                    else
                        this.setColor(Utilities.neighborsColor(this));

                    System.out.println("[" + this.x + ", " + this.y + "] stop");
                }

                Thread.sleep((int) (Utilities.random.nextDouble() + 0.5) * Program.DELAY);

                // tutaj jest pauzowanie.
                if (!this.isActive()) {
                    synchronized (this) {
                        this.wait();
                    }
                }

            } catch (Throwable exception) {
            }
        }
    }
}