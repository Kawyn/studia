import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.control.ButtonType;
import javafx.scene.control.ColorPicker;
import javafx.scene.control.Dialog;
import javafx.scene.control.ButtonBar.ButtonData;
import javafx.scene.paint.Color;

/**
 * <b>Dialog</b> z wybieraniem koloru.
 */
class ColorPickerDialog extends Dialog<String> {

    /**
     * Taki trochę singleton.
     */
    public static ColorPickerDialog Instance;

    /**
     * <b>ColorPicker</b> osadzony w <b>Dialogu</b>
     */
    public ColorPicker colorPicker = new ColorPicker(Color.WHITE);

    public ColorPickerDialog() {
        super();

        Instance = this;

        this.setTitle("Kolorki");
        this.setHeaderText("Wybierz Kolor");

        this.setGraphic(null); // usuwa obrazek...

        this.getDialogPane().getButtonTypes().add(new ButtonType("Zamknij", ButtonData.APPLY));
        this.getDialogPane().setContent(colorPicker);

        colorPicker.setOnAction(new EventHandler<ActionEvent>() {

            @Override
            public void handle(ActionEvent event) {

                if (SuperCanvas.Instance.getSelectedShape() != null)
                    SuperCanvas.Instance.getSelectedShape().setFill(colorPicker.getValue());
            }
        });
    }
}