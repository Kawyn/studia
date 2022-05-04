import javafx.event.EventHandler;
import javafx.event.ActionEvent;
import javafx.scene.control.Alert;
import javafx.scene.control.MenuItem;

/**
 * Przycisk wyświetlający <b>Alert</b>.
 */
public class AlertButton extends MenuItem {

    /**
     * Tworzy nowy przycisk wyświetlający po kliknięciu <b>Alert</b>.
     * 
     * @param text  - Napis na przycisku.
     * @param alert - Alert, który ma być wyświetlany.
     */
    public AlertButton(String text, Alert alert) {
        super(text);

        this.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent event) {
                alert.showAndWait();
            }
        });
    }
}
