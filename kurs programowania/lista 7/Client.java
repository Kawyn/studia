import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.GridPane;
import javafx.scene.paint.Color;
import javafx.scene.paint.Paint;
import javafx.scene.text.TextAlignment;
import javafx.stage.Stage;

public class Client extends Application {

    public static Socket socket = null;

    public static PrintWriter out = null;
    public static BufferedReader in = null;

    private final int CONTROL_SIZE = 100;

    @Override
    public void start(Stage stage) {

        stage.setTitle("Klient");

        GridPane root = new GridPane();
        Label queryResponse = new Label("");
        BinaryTreeVizualizer binaryTreeVizualizer = new BinaryTreeVizualizer();

        root.setVgap(4);
        root.setPadding(new Insets(20));

        TextField input = new TextField();
        input.setPrefWidth(CONTROL_SIZE);
        Button button = new Button("OK");

        ChoiceBox<String> treeType = new ChoiceBox<String>();

        treeType.getItems().addAll(new String[] { "Integer", "Double", "String" });
        treeType.setValue("Integer");

        treeType.setOnAction(event -> {

            out.println("set_tree " + treeType.getValue().toLowerCase());

            try {

                queryResponse.setText(in.readLine());
                binaryTreeVizualizer.draw(in.readLine().split(" ")[1]);
            }

            catch (Exception exception) {

            }
        });

        treeType.setPrefWidth(CONTROL_SIZE);

        ChoiceBox<String> queryType = new ChoiceBox<String>();

        queryType.getItems().addAll(new String[] { "search", "insert", "delete" });
        queryType.setValue("search");
        queryResponse.setWrapText(true);
        queryResponse.setMaxWidth(CONTROL_SIZE);
        queryResponse.setTextAlignment(TextAlignment.CENTER);
        queryType.setPrefWidth(CONTROL_SIZE);

        button.setOnAction(event -> {
            queryResponse.setText("");
            String query = queryType.getValue() + " " + input.getText();
            out.println(query);

            try {

                String response = in.readLine();

                if (response.toLowerCase().startsWith("draw"))
                    binaryTreeVizualizer.draw(response.split(" ")[1]);
                else
                    queryResponse.setText(response);

            } catch (IOException exception) {

            }
        });

        input.setMaxWidth(CONTROL_SIZE);
        root.add(new Label("Typ Drzewa"), 0, 0);
        root.add(treeType, 1, 0);
        root.add(new Label("Zapytanie"), 0, 1);
        root.add(queryType, 1, 1);
        root.add(new Label("Dana (gdy potrzebna)"), 0, 2);
        root.setStyle("-fx-background-color: red; " +
                "-fx-border-style: hidden solid hidden hidden;" +
                "-fx-border-width: 5;" +
                "-fx-border-color: green;");

        root.add(queryResponse, 0, 4, 2, 4);
        BorderPane bp = new BorderPane();
        bp.setCenter(binaryTreeVizualizer);
        bp.setLeft(root);
        queryResponse.setPadding(new Insets(5));

        BorderPane.setAlignment(queryResponse, Pos.CENTER);
        input.setPrefWidth(CONTROL_SIZE);
        button.setPrefWidth(CONTROL_SIZE);
        root.add(input, 1, 2);
        root.add(button, 1, 3);

        stage.setOnCloseRequest(event -> {

            try {
                out.println("close");
                socket.close();
            }

            catch (Exception exception) {
                System.out.println(exception.getMessage());
                exception.printStackTrace();

                System.exit(-1);
            }
        });

        stage.setScene(new Scene(bp, 800, 600));

        stage.show();
    }

    public static void main(String[] args) {

        try {

            Client.socket = new Socket("localhost", 4444);
            Client.socket.setSoTimeout(5000);

            Client.out = new PrintWriter(Client.socket.getOutputStream(), true);
            Client.in = new BufferedReader(new InputStreamReader(Client.socket.getInputStream()));
        }

        catch (UnknownHostException exception) {

            System.out.println("Nie znaleziono serwera.");
            System.exit(-1);
        }

        catch (IOException exception) {

            System.out.println(exception.getMessage());
            exception.printStackTrace();

            System.exit(-1);
        }

        launch(args);
    }
}
