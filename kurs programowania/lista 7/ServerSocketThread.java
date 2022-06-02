
import java.io.*;
import java.net.*;

class ServerSocketThread extends Thread {

    private final BinaryTree<Integer> treeInteger = new BinaryTree<Integer>();
    private final BinaryTree<Double> treeDouble = new BinaryTree<Double>();

    private final BinaryTree<String> treeString = new BinaryTree<String>();

    private Socket socket = null;

    private PrintWriter out = null;
    private BufferedReader in = null;

    private enum TreeType {

        INTEGER, DOUBLE, STRING;
    }

    private TreeType treeType = TreeType.INTEGER;

    public ServerSocketThread(Socket socket) {

        this.socket = socket;
    }

    private void setTree(String s) {

        if (s.equals("integer"))
            this.treeType = TreeType.INTEGER;

        else if (s.equals("double"))
            this.treeType = TreeType.DOUBLE;

        else if (s.equals("string"))
            this.treeType = TreeType.STRING;

        this.out.println("Zmieniono typ drzewa na \"" + this.treeType.toString().toLowerCase() + "\".");
        this.draw();
    }

    private void search(String s) {

        Boolean f = false;

        try {

            if (treeType == TreeType.INTEGER) {

                if (this.treeInteger.search(Integer.parseInt(s)) != null)
                    f = true;
            }

            else if (treeType == TreeType.DOUBLE) {

                if (this.treeDouble.search(Double.parseDouble(s)) != null)
                    f = true;
            }

            else if (treeType == TreeType.STRING) {

                if (this.treeString.search(s) != null)
                    f = true;
            }

        }

        catch (NumberFormatException exception) {

        }

        if (f)
            out.println("Zanaleziono \"" + s + "\" w drzewie.");
        else
            out.println("Nie znaleziono \"" + s + "\" w drzewie.");
    }

    private void insert(String s) {

        System.out.println(s);
        try {

            if (this.treeType == TreeType.INTEGER)
                this.treeInteger.insert(Integer.parseInt(s));

            else if (this.treeType == TreeType.DOUBLE)
                this.treeDouble.insert(Double.parseDouble(s));

            else if (this.treeType == TreeType.STRING)
                this.treeString.insert(s);

            this.draw();
        }

        catch (NumberFormatException exception) {

            out.println("Nie można wstawić \"" + s + "\" do drzewa typu " + this.treeType.toString());
        }
    }

    private void delete(String s) {

        try {

            if (this.treeType == TreeType.INTEGER)
                this.treeInteger.delete(Integer.parseInt(s));

            else if (this.treeType == TreeType.DOUBLE)
                this.treeDouble.delete(Double.parseDouble(s));

            else if (this.treeType == TreeType.STRING)
                this.treeString.delete(s);

            this.draw();
        }

        catch (NumberFormatException exception) {

            this.out.println("Nie można usunąć \"" + s + "\" z drzewa typu " + this.treeType.toString());
        }

        catch (Exception exception) {

            this.out.println("Nie znaleziono \"" + s + "\" w drzewie");
        }
    }

    private void draw() {

        String result = "draw ";

        if (this.treeType == TreeType.INTEGER)
            result += this.treeInteger.draw();

        else if (this.treeType == TreeType.DOUBLE)
            result += this.treeDouble.draw();

        else if (this.treeType == TreeType.STRING)
            result += this.treeString.draw();

        if (result.equals("draw "))
            this.out.println("draw _");
        else
            this.out.println(result);
    }

    public void run() {

        try {

            this.out = new PrintWriter(socket.getOutputStream(), true);
            this.in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            while (true) {

                String query = in.readLine();
                String parametr = query.split(" ")[1];

                if (query.startsWith("set_tree"))
                    this.setTree(parametr);

                else if (query.startsWith("search"))
                    this.search(parametr);

                else if (query.startsWith("insert"))
                    this.insert(parametr);

                else if (query.startsWith("draw"))
                    this.draw();

                else if (query.startsWith("delete"))
                    this.delete(parametr);

                else if (query.startsWith("close")) {

                    socket.close();
                    return;
                }
            }

        } catch (IOException ex) {
            System.out.println("this exception: " + ex.getMessage());
            ex.printStackTrace();
        }
    }
}