import javafx.scene.control.Alert;

/**
 * <b>Alert</b> zawierający instrukcje obsługi.
 */
public class Manual extends Alert {

    public Manual() {
        super(AlertType.INFORMATION);

        this.setGraphic(null); // usuwa ikonkę "i" z nagłówka

        this.setTitle("Instrukcja");

        this.setHeaderText("Instrukcja");
        this.setContentText(
                "Aby zrobić figurę, trzeba wybrać jakąś z menu i przeciągnąć po tym białym. Tak jak w Ms Paint.\n\n" +
                        "Aby oznaczyć figurę jako aktywną, trzeba ją kliknąć lewym przyciskiem myszy.\n\n" +
                        "Aby przesunąć figurę trzeba ją oznaczyć jako aktywną, następnie złapać i przeciągnąć.\n\n" +
                        "Aby zmnienić rozmiar figury trzeba ją oznaczyć jako aktywną, najechać na nią myszką i pokręcić kółkiem.\n\n"
                        +
                        "Aby obrócić figurę trzeba ją oznaczyć jako aktywną, i przytrzymać Q lub E.\n\n" +
                        "Aby zmienić kolor figury trzeba ją oznaczyć jako aktywną i kliknąć prawym i tam już git.\n\n" +
                        "Trójkąt można złapać za rogi by zmienić kształt.\n\n" +
                        "Można jeszcze usunąć figurę klikająć Delejt na klawiaturze.");
    }
}
