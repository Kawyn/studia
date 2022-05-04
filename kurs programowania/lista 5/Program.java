import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.BorderPane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class Program extends Application {

    /**
     * Niesamowita nazwa programu wyświetlana wszędzie gdzie jest potrzebna.
     */
    public static final String NAME = "Lorem Ipsum";

    /**
     * Autor też wyświetlany wszędzie gdzie jest potrzebny.
     */
    public static final String AUTHOR = "Kewin Ignasiak";

    @Override
    public void start(Stage stage) throws Exception {

        stage.setTitle(Program.NAME);

        BorderPane root = new BorderPane();

        // dialog nie jest przypisany do niczego ponieważ można się do niego dostać za
        // pomocą ColorPickerDialog.Instance...
        new ColorPickerDialog();

        root.setTop(new SuperMenu());
        root.setCenter(new SuperCanvas());

        Scene scene = new Scene(root, SuperCanvas.PREFERED_WIDTH,
                SuperCanvas.PREFERED_HEIGHT, Color.WHITESMOKE);

        // uznałem, że połowa będzie git...
        stage.setMinWidth(SuperCanvas.PREFERED_WIDTH / 2);
        stage.setMinHeight(SuperCanvas.PREFERED_HEIGHT / 2);

        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {

        launch(args);
    }
}