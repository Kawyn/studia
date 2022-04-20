import java.awt.*;
import java.io.*;
import java.awt.event.*;

import javax.swing.*;

public class Main {

    public static void main(String[] args) {

        JFrame okno = new JFrame("Pascal");

        JLabel tytul = new JLabel("Zadanie 2", SwingConstants.CENTER);
        tytul.setFont(new Font("Serif", Font.BOLD, 20));

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
                try {
                    Process p = Runtime.getRuntime().exec("a.exe " + rozmiar.getText());

                    BufferedReader reader = new BufferedReader(
                            new InputStreamReader(p.getInputStream()));

                    String wynik = "<html><pre>";
                    String line;

                    while ((line = reader.readLine()) != null) {
                        wynik += line + "<br />";
                    }
                    reader.close();
                    wynik += "</pre></html>";
                    wyswietlacz.setText(wynik);
                    karty.next(panel);
                }

                catch (Exception ex) {
                    ex.printStackTrace();
                }
                okno.validate();
            }
        });

        panel.add(edytor);
        panel.add(inspektor);

        okno.setLayout(new BorderLayout());

        okno.add(tytul, BorderLayout.NORTH);

        okno.add(panel, BorderLayout.CENTER);

        okno.setBounds(200, 200, 300, 300);

        okno.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        okno.setVisible(true);
    }
}