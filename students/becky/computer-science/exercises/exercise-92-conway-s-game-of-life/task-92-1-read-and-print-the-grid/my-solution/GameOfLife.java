public class GameOfLife {
    /*Plan:
    * Spielfeld aufbauen:
    * -> 2D Boolean Array
    * -> Spielfeld ausgeben
    * -> Spielfeld mit zufälligen Weten initialisieren
    * Spielregeln implementieren:
    *  -> Zählen der benachbarten Zellen
    *  -> Berechnung der nächsten Runde
    *  Regeln: 
    *   Ausgangslage: Zelle lebt
    *  -> Nachbarn < 2 => Zelle stirbt 
    *  -> Nachbarn > 3 => Zelle stirbt
    *   Ausgangslage: Zelle tot
    *  -> Nachbarn = 3 => Zelle wird neugeboren
    *  -> Nachbarn < 3 => Zelle bleibt tot
    *  -> Nachbarn > 3 => Zelle bleibt tot
    */
    
    public static void main(String[] args) {
        boolean[][] cells = new boolean[12][36];
        init(cells);

        int turns = 0;

        while (true) {
            System.out.println("Turn: " + turns++);
            nextTurn(cells);
            print(cells);
            pause();
        }
    }

    public static void pause() {
        try {
            Thread.sleep(250);
        } catch (Exception e) {
            //
        }
    }

    public static void nextTurn(boolean[][] cells) {
        boolean[][] copy = copyOfCells(cells);
            for (int i = 0; i < cells.length; i++) {
                for (int j = 0; j < cells[i].length; j++) {
                int neighbours = checkNaighbours(cells, i, j);
                    if(copy[i][j]) {
                        cells[i][j] = neighbours //verfollständigen
                    } else {
                        cells[i][j] =  //verfollständigen
                    }
                }
            }
        
    }

    public static void checkNaighbours(boolean[][] cells, int row, int col) {
        int count = 0;

        for (int i = -1; i <= 1; i++) {
            for (int j = -1; j <= 1; j++) {
                int targetRow = row + i;
                int targetCol = col + j;

                if (
                targetRow >= 0 && targetRow < cells.length 
                && targetCol < cells.length && targetCol >= 0
                ) {
                    if (i != 0 || j != 0) {
                        if (cells[targetRow][targetCol]) { //umbedingt zuerst Row dann Col
                            count++;
                        } 
                    }
                }  
            }
        }
    }


    public static boolean[][] copyOfCells(boolean[][] cells) {
        boolean[][] copy = new boolean[cells.length][cells[0].length];

        for (int i = 0; i < cells.length; i++) {
            for (int j = 0; j < cells[i].length; j++) {
                copy[i][j] = cells[i][j];
            }
        }
        //print(copy);
        return copy;
    }

    public static void print(boolean[][] array) {
        for (int i = 0; i < array.length; i++) {
            for (int j = 0; j < array[i].length; j++) {
                char dead = '\u25cb';
                char alive = '\u25cf';

                if (array[i][j]) {
                    System.out.print(alive);
                } else {
                    System.out.print(dead);
                }
            }
            System.out.println();
        }
    }

    public static void init(boolean[][] cells) {
        for (int i = 0; i < cells.length; i++) {
            for (int j = 0; j < cells[i].length; j++) {
                cells[i][j] = Math.random() >= 0.5;

            }
        }

        print(cells);
    }
}
