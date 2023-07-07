def print_grid(grid):
    print("---------")
    for row in grid:
        print("|", end=" ")
        for cell in row:
            print(cell if cell != "_" else " ", end=" ")
        print("|")
    print("---------")

def is_valid_move(grid, row, col):
    if not row.isdigit() or not col.isdigit():
        print("You should enter numbers!")
        return False
    row, col = int(row), int(col)
    if row < 1 or row > 3 or col < 1 or col > 3:
        print("Coordinates should be from 1 to 3!")
        return False
    if grid[row - 1][col - 1] != "_":
        print("This cell is occupied! Choose another one!")
        return False
    return True

def update_grid(grid, row, col, player):
    grid[row - 1][col - 1] = player

def get_player_move(grid):
    while True:
        coordinates = input("Enter the coordinates: ")
        if not coordinates.strip():
            print("Invalid input. Enter two coordinates separated by a space.")
            continue
        coordinates = coordinates.split()
        if len(coordinates) != 2:
            print("Invalid input. Enter two coordinates separated by a space.")
            continue
        row, col = int(coordinates[0]), int(coordinates[1])
        if not is_valid_move(grid, str(row), str(col)):
            continue
        return row, col

def check_game_state(grid):
    winning_combinations = [
        [(0, 0), (0, 1), (0, 2)],
        [(1, 0), (1, 1), (1, 2)],
        [(2, 0), (2, 1), (2, 2)],
        [(0, 0), (1, 0), (2, 0)],
        [(0, 1), (1, 1), (2, 1)],
        [(0, 2), (1, 2), (2, 2)],
        [(0, 0), (1, 1), (2, 2)],
        [(0, 2), (1, 1), (2, 0)]
    ]

    for combination in winning_combinations:
        symbols = [grid[y][x] for x, y in combination]
        if symbols == ["X", "X", "X"]:
            return "X wins"
        elif symbols == ["O", "O", "O"]:
            return "O wins"

    if not any("_" in row for row in grid):
        return "Draw"

    return "Game not finished"

# Create an empty 3x3 grid
grid = [["_"] * 3 for _ in range(3)]

# Print the initial grid and a reminder of the grid logic
print("""As a reminder, here is how we wrote the grid values:
       1     2     3
   ---------------------
1  | [1 1] [1 2] [1 3] |
2  | [2 1] [2 2] [2 3] |
3  | [3 1] [3 2] [3 3] |
   ---------------------

Player 1 = X
Player 2 = O
""")
print_grid(grid)

# Start the game loop
while True:
    row, col = get_player_move(grid)
    update_grid(grid, row, col, "X")

    # Print the updated grid
    print_grid(grid)

    state = check_game_state(grid)
    if state != "Game not finished":
        print(state)
        break

    row, col = get_player_move(grid)
    update_grid(grid, row, col, "O")

    # Print the updated grid
    print_grid(grid)

    state = check_game_state(grid)
    if state != "Game not finished":
        print(state)
        break
