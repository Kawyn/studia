// Kewin Ignasiak

import javafx.application.Application;
import javafx.scene.layout.GridPane;
import javafx.scene.Scene;
import javafx.stage.Screen;
import javafx.stage.Stage;

/**
 * Główna Klasa programu.
 */
public class Program extends Application {

    /**
     * Rozmiar kwadratu w pikselach.
     */
    public static int SQUARE_SIZE = 100;

    /**
     * Ilość kwadratów w osi X. Ustawiana jest za pomocą parametrów początkowych.
     */
    public static int SIZE_X;

    /**
     * Ilość kwadratów w osi Y. Ustawiana jest za pomocą parametrów początkowych.
     */
    public static int SIZE_Y;

    /**
     * Opóźnienie między zmianie kolorów. Ustawiane jest za pomocą parametrów
     * początkowych.
     */
    public static int DELAY;

    /**
     * Prawdopodobieństwo zmiany koloru na losowy (z przedziału <0, 1>) Ustawiana
     * jest za pomocą parametrów początkowych.
     */
    public static double PROBABILITY;

    /**
     * Dwuwymiarowa tablica zawierająca wszystkie wątki.
     * 
     * @see Square
     */
    public static Square squares[][];

    @Override
    public void start(Stage stage) throws Exception {

        stage.setTitle("Symulacja");

        GridPane root = new GridPane();

        Program.squares = new Square[SIZE_X][SIZE_Y];

        for (int x = 0; x < SIZE_X; x++) {

            for (int y = 0; y < SIZE_Y; y++) {

                squares[x][y] = new Square(root, x, y);
            }
        }

        Scene scene = new Scene(root,
                Program.SIZE_X * Program.SQUARE_SIZE,
                Program.SIZE_Y * Program.SQUARE_SIZE);

        stage.setScene(scene);
        stage.setResizable(false);

        stage.show();

        // startowanie nici
        for (int x = 0; x < SIZE_X; x++) {

            for (int y = 0; y < SIZE_Y; y++) {

                squares[x][y].start();
            }
        }
    }

    public static void main(String[] args) {

        if (args.length < 4) {
            System.out.println("Podano za malo parametrow. Wymagane sa 4 w kolejnosci: m, n, k, p.");
            System.exit(-1);
        }

        Program.SIZE_X = Utilities.toInteger(args[0]);
        Program.SIZE_Y = Utilities.toInteger(args[1]);
        
        Program.SQUARE_SIZE = (int)Math.min(20, Math.min(
		    Screen.getPrimary().getBounds().getWidth() / Program.SIZE_X,
		    Screen.getPrimary().getBounds().getHeight()/ Program.SIZE_Y));

        Program.DELAY = Utilities.toInteger(args[2]);

        Program.PROBABILITY = Utilities.toDouble(args[3]);

        launch(args);
    }
}
