# Initializing variables
password = "123"
attempt_count = 3

while attempt_count > 0:
    # Asking user for password input
    user_input = input("Enter password: ")

    if user_input == password:
        print("Access granted!")
        break  # Exit the loop if password is correct
    elif attempt_count > 1:
        print(f"Wrong password! {attempt_count - 1} attempts remaining.")
    else:
        print("Incorrect password. No more attempts left. Access denied.")
    attempt_count -= 1
