import anvil.server
import flask
anvil.server.connect("3SA5WJ7DRX77XMJMWRHRNDTQ-26MFJEN7YSAQVPYO")

space = [1000,1000]
ship_loc = [500,500]
fuel = 100
health = 100
enimy = [{}]
obsticles = [{}]
bullets = 100
broken = [{}]
rooms = ["Food", "Fuel", "Bullets", "Engine", "Control"]
roles = ["Captain", "Navigator", "Fighter", "Engineer"]
players = {}



@anvil.server.http_endpoint("/update/ship_loc/:x/:y")

@anvil.server.http_endpoint("/update_game/:user_id")
def update_game(user_id):
    print("---------------")
    print(user_id)
    print_status()
    try:
        if user_id == '1':
            return {"fuel":fuel, "health":health, "bullets":bullets, "broken":broken}
        elif user_id == '2':
            return {"enimies":enimy, "obsticles":obsticles, "ship location":ship_loc}
        elif user_id == '3':
            return {"enimies":enimy, "obsticles":obsticles}
        elif user_id == '4':
            return {"broken":broken}
        else:
            print("no match")
    except Exception as e:
        print(e)
        

@anvil.server.http_endpoint("/connect")
def connect():
    if len(players) == 0:
        players[1] = roles[0]
        return {"id": 1, "role":players[1]}
    elif len(players) == 1:
        players[2] = roles[1]
        return {"id": 2, "role":players[2]}
    elif len(players) == 2:
        players[3] = roles[2]
        return {"id": 3, "role":players[3]}
    elif len(players) == 3:
        players[4] = roles[3]
        return {"id": 4, "role":players[4]}
    else:
        return("spaceship full")

def print_status():
    print("location: " + str(ship_loc))
    print("fuel: " + str(fuel))
    print("health: " + str(health))
    print("bullets: " + str(bullets))
    print("enimies: " + str(enimy))
    print("obsticles: " + str(obsticles))
    print("broken: " + str(broken))
          



anvil.server.wait_forever()
