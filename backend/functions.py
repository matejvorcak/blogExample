import random
import string   

def randomString(stringLength=10, withNumbers = False):
    letters = string.ascii_lowercase
    if withNumbers :
        letters = letters +"0123456789"
    return ''.join(random.choice(letters) for i in range(stringLength))
