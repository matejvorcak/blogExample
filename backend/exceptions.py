class EmptyResultException(Exception):
    def __init__(self):
         super().__init__("Query return empty result.")

class UserNotFoundException(Exception):
    def __init__(self):
         super().__init__("User not found.")

class UserAlreadyRegisteredException(Exception):
    def __init__(self):
         super().__init__("User with this credentials exists.")

class BadCredentialsException(Exception): 
    def __init__(self):
         super().__init__("Credentials don`t match any user.")

class UsernameAlreadyUsedException(Exception):
    def __init__(self):
         super().__init__("Username is already used, please try another.")

class EmailAlradyUsedException(Exception):
    def __init__(self):
         super().__init__("Email is already used, please try another.")
