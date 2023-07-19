import java.util.Scanner;

public class Cinema {
    // Initialize purchasedTickets and totalIncome with 0
    static int purchasedTickets = 0;
    static int totalIncome = 0;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the number of rows:");
        int rows = scanner.nextInt();
        System.out.println("Enter the number of seats in each row:");
        int seatsPerRow = scanner.nextInt();

        // Calculate totalIncome based on the number of seats
        totalIncome = calculateTotalIncome(rows, seatsPerRow);

        int currentIncome = 0; // Initialize currentIncome with 0

        char[][] seatingArrangement = new char[rows][seatsPerRow];
        initializeSeatingArrangement(seatingArrangement, rows, seatsPerRow);

        boolean exit = false;
        while (!exit) {
            System.out.println("\n1. Show the seats");
            System.out.println("2. Buy a ticket");
            System.out.println("3. Statistics");
            System.out.println("0. Exit");

            int option = scanner.nextInt();
            switch (option) {
                case 1:
                    printSeatingArrangement(seatingArrangement, rows, seatsPerRow);
                    break;
                case 2:
                    int ticketPrice = buyTicket(scanner, seatingArrangement, rows, seatsPerRow);
                    if (ticketPrice != -1) {
                        purchasedTickets += 1;
                        currentIncome += ticketPrice;
                    }
                    break;
                case 3:
                    System.out.printf("Number of purchased tickets: %d\n", purchasedTickets);
                    // Calculate percentageTickets with float division
                    float percentageTickets = (float) purchasedTickets / (rows * seatsPerRow) * 100;
                    System.out.printf("Percentage: %.2f%%\n", percentageTickets);
                    System.out.printf("Current income: $%d\n", currentIncome);
                    System.out.printf("Total income: $%d\n", totalIncome);
                    break;
                case 0:
                    exit = true;
                    break;
                default:
                    System.out.println("Invalid option. Please try again.");
            }
        }
    }

    private static void initializeSeatingArrangement(char[][] seatingArrangement, int rows, int seatsPerRow) {
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < seatsPerRow; j++) {
                seatingArrangement[i][j] = 'S';
            }
        }
    }

    private static void printSeatingArrangement(char[][] seatingArrangement, int rows, int seatsPerRow) {
        System.out.println("\nCinema:");
        System.out.print("  ");
        for (int j = 1; j <= seatsPerRow; j++) {
            System.out.print(j + " ");
        }
        System.out.println();

        for (int i = 0; i < rows; i++) {
            System.out.print((i + 1) + " ");
            for (int j = 0; j < seatsPerRow; j++) {
                System.out.print(seatingArrangement[i][j] + " ");
            }
            System.out.println();
        }
    }

    private static int buyTicket(Scanner scanner, char[][] seatingArrangement, int rows, int seatsPerRow) {
        while (true) {
            System.out.println("\nEnter a row number:");
            int chosenRow = scanner.nextInt();
            System.out.println("Enter a seat number in that row:");
            int chosenSeat = scanner.nextInt();

            if (chosenRow < 1 || chosenRow > rows || chosenSeat < 1 || chosenSeat > seatsPerRow) {
                System.out.println("Wrong input.");
            } else if (seatingArrangement[chosenRow - 1][chosenSeat - 1] == 'B') {
                System.out.println("That ticket has already been purchased!");
            } else {
                int ticketPrice = calculateTicketPrice(rows, seatsPerRow, chosenRow);
                seatingArrangement[chosenRow - 1][chosenSeat - 1] = 'B';

                System.out.println("\nTicket purchased: Row " + chosenRow + ", Seat " + chosenSeat);
                System.out.println("Ticket price: $" + ticketPrice);
                return ticketPrice; // Break the loop and return the ticketPrice after successful ticket purchase
            }
        }
    }

    private static int calculateTicketPrice(int rows, int seatsPerRow, int chosenRow) {
        int totalSeats = rows * seatsPerRow;
        int ticketPrice;

        if (totalSeats <= 60) {
            ticketPrice = 10;
        } else {
            int frontRows = rows / 2;
            if (chosenRow <= frontRows) {
                ticketPrice = 10;
            } else {
                ticketPrice = 8;
            }
        }

        return ticketPrice;
    }

    private static int calculateTotalIncome(int rows, int seatsPerRow) {
        int totalSeats = rows * seatsPerRow;
        int ticketPrice;

        if (totalSeats <= 60) {
            ticketPrice = 10;
        } else {
            int frontRows = rows / 2;
            int backRows = rows - frontRows;
            ticketPrice = (frontRows * seatsPerRow * 10) + (backRows * seatsPerRow * 8);
        }

        return ticketPrice;
    }
}
