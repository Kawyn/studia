import javafx.scene.control.Alert;

/**
 * Alert zawierający informacjie o programie.
 */
public class About extends Alert {

    /**
     * Opis programu.
     */
    private final String DESCRIPTION = "Program przeznaczony do rysowania figur, ich obracania, kolorowania, skalowania i innych niesamowitych rzeczy.";

    /**
     * Tworzy nowy alert zawierający informacje o programie.
     */
    public About() {
        super(AlertType.INFORMATION);

        this.setGraphic(null); // usuwa ikonkę "i" z nagłówka

        this.setTitle("O Programie");

        this.setHeaderText(Program.NAME);
        this.setContentText(DESCRIPTION
                + "\n\nAutor: " + Program.AUTHOR);
    }
}
