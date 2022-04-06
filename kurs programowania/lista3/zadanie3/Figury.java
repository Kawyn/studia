public class Figury {

    public enum JednoParametrowe implements JednoParametroweInterfejs {

        KOLO {
            public double obliczPole(int a) {

                if (a < 0)
                    throw new IllegalArgumentException();

                return Math.PI * a * a;
            }

            public double obliczObwod(int a) {

                if (a < 0)
                    throw new IllegalArgumentException();

                return 2 * Math.PI * a;
            }
        },

        KWADRAT

        {

            public double obliczPole(int a) {

                if (a < 0)
                    throw new IllegalArgumentException();

                return a * a;
            }

            public double obliczObwod(int a) {

                if (a < 0)
                    throw new IllegalArgumentException();

                return 4 * a;
            }

        },

        PIECIOKAT {

            public double obliczPole(int a) {

                if (a < 0)
                    throw new IllegalArgumentException();

                return a * a * Math.sqrt(25 + 10 * Math.sqrt(5)) / 4;
            }

            public double obliczObwod(int a) {

                if (a < 0)
                    throw new IllegalArgumentException();

                return 5 * a;
            }

        },

        SZESCIOKAT {

            public double obliczPole(int a) {

                if (a < 0)
                    throw new IllegalArgumentException();

                return 3 * a * a * Math.sqrt(3) / 2;
            }

            public double obliczObwod(int a) {

                if (a < 0)
                    throw new IllegalArgumentException();

                return 6 * a;
            }
        }
    }

    public enum WieloParametrowe implements WieloParametroweInterfejs {

        PROSTOKAT {
            public double obliczPole(int a, int b) {

                if (a < 0 || b < 0)
                    throw new IllegalArgumentException();

                return a * b;
            }

            public double obliczObwod(int a, int b) {

                if (a < 0 || b < 0)
                    throw new IllegalArgumentException();

                return 2 * a + 2 * b;
            }
        },

        ROMB {
            public double obliczPole(int a, int b) {

                if (a < 0 || b < 0 || 180 < b)
                    throw new IllegalArgumentException();

                return Math.abs(a * a * Math.sin(Math.toRadians(Math.abs(b - 2 * (b % 90)))));
            }

            public double obliczObwod(int a, int b) {

                if (a < 0)
                    throw new IllegalArgumentException();

                return 4 * a;
            }
        }
    }
}