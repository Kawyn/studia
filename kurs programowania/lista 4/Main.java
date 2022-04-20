import java.awt.*;
import java.awt.event.*;

import javax.swing.*;

public class Main {

    public static void main(String[] args) {

        JFrame okno = new JFrame("Pascal");

        JLabel tytul = new JLabel("Generator Pascala", SwingConstants.CENTER);
        tytul.setFont(new Font("Serif", Font.BOLD, 20));

        JLabel gafa = new JLabel("", SwingConstants.CENTER);

        JPanel panel = new JPanel();
        CardLayout karty = new CardLayout();

        panel.setLayout(karty);

        JPanel edytor = new JPanel();

        JTextField rozmiar = new JTextField();
        rozmiar.setAlignmentX(Component.CENTER_ALIGNMENT);
        rozmiar.setMaximumSize(new Dimension(150, 25));

        JButton przycisk = new JButton("Generuj");
        przycisk.setAlignmentX(Component.CENTER_ALIGNMENT);

        edytor.add(Box.createRigidArea(new Dimension(0, 25)));
        edytor.add(rozmiar);
        edytor.add(Box.createRigidArea(new Dimension(0, 10)));
        edytor.add(przycisk);

        edytor.setLayout(new BoxLayout(edytor, BoxLayout.Y_AXIS));

        JPanel inspektor = new JPanel();
        JLabel wyswietlacz = new JLabel();

        JScrollPane tete = new JScrollPane(wyswietlacz, JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED,
                JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
        tete.setAlignmentX(Component.CENTER_ALIGNMENT);
        wyswietlacz.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        JButton powrot = new JButton("Wroc");
        powrot.setAlignmentX(Component.CENTER_ALIGNMENT);

        powrot.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent event) {
                karty.first(panel);
            }
        });

        inspektor.add(Box.createRigidArea(new Dimension(0, 25)));
        inspektor.add(tete);
        inspektor.add(Box.createRigidArea(new Dimension(0, 10)));
        inspektor.add(powrot);

        inspektor.setLayout(new BoxLayout(inspektor, BoxLayout.Y_AXIS));

        przycisk.addActionListener(new ActionListener() {

            public void actionPerformed(ActionEvent event) {

                TrojkatPascala trojkat = null;
                int n = 0;

                try {

                    n = Integer.parseInt(rozmiar.getText());
                    trojkat = new TrojkatPascala(n);

                    String tekst = "<html><pre>";
                    for (int i = 0; i < n; i++) {

                        String wiersz = "";

                        for (int j = 0; j <= i; j++)
                            wiersz += Integer.toString(trojkat.wspolczynnik(i, j)) + " ";

                        tekst += wiersz + "<br />";
                        // inspektor.add(l);

                    }
                    tekst += "</pre></html>";
                    gafa.setText("");
                    wyswietlacz.setText(tekst);
                    karty.next(panel);

                } catch (Exception exception) {

                    gafa.setText("Podano niepoprawne dane!");
                }

                okno.validate();
            }
        });

        panel.add(edytor);
        panel.add(inspektor);

        okno.setLayout(new BorderLayout());

        okno.add(tytul, BorderLayout.NORTH);

        okno.add(panel, BorderLayout.CENTER);

        okno.add(gafa, BorderLayout.SOUTH);

        okno.setBounds(200, 200, 300, 300);

        okno.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        okno.setVisible(true);
    }
}