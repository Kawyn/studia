import java.io.*;
import java.net.*;

/**
 * Klasa będąca serwerem.
 */
public class Server {

    /**
     * Metoda tworząca serwer serwer.
     */
    public static void main(String[] args) {

        try (ServerSocket serverSocket = new ServerSocket(4444)) {

            System.out.println("Listening on port: 4444.");

            while (true) {

                Socket socket = serverSocket.accept();
                System.out.println("New connection!");

                new ServerSocketThread(socket).start();
            }
        }

        catch (IOException exception) {

            System.out.println("Server exception: " + exception.getMessage());
            exception.printStackTrace();
        }
    }
}
