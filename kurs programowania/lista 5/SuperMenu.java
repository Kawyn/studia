import javafx.scene.control.Menu;
import javafx.scene.control.MenuBar;

/**
 * Pasek menu z potrzebnymi <b>Menu</b>.
 */
public class SuperMenu extends MenuBar {

    /**
     * Tworzy <b>SuperMenu</b>
     */
    public SuperMenu() {

        Menu info = new Menu("Info");

        info.getItems().addAll(
                new AlertButton("O Programie", new About()),
                new AlertButton("Instrukcja", new Manual()));

        this.getMenus().addAll(new BrushList(), info);
    }
}
