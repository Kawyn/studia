import javafx.scene.control.MenuItem;
import javafx.event.EventHandler;
import javafx.event.ActionEvent;

/**
 * <b>MenuItem</b> mający ustawione <b>onAction</b> na wybieranie pędzla.
 */
public class BrushMenuItem extends MenuItem {

    /**
     * Tworzy <b>MenuItem</b> w menu.
     * 
     * @param text  - nazwa w menu
     * @param brush - pędzel
     */
    public BrushMenuItem(String text, Brush brush) {
        super(text);

        // wybieranie pędzla
        this.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent event) {
                SuperCanvas.Instance.brush = brush;
            }
        });
    }
}
