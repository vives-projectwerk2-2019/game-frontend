#game mechanics

##controls

###black tank
move forward:   z
move backwards: s
strafe right:   q
strafe left:    d

###blue tank
move forward:   o
move backwards: l
strafe right:   k
strafe left:    m

###yellow tank
move forward:   arrow_ley UP
move backwards: arrow_ley DOWN
strafe right:   arrow_ley LEFT
strafe left:    arrow_ley RIGHT

###map
map::[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[0,1,1,2,2,2,1,0,0,1,2,2,2,2,2,1,0],[0,1,2,1,1,2,1,0,0,1,1,1,1,1,1,1,0],[0,1,2,1,1,1,1,1,1,1,1,3,1,1,1,1,0],[0,1,1,1,1,1,1,1,1,3,3,2,3,3,1,1,0],[0,1,1,1,1,1,1,1,1,3,2,2,2,0,3,1,0],[0,2,1,1,1,1,1,0,1,3,2,2,0,0,3,1,0],[0,3,2,2,1,1,0,0,1,3,2,2,0,0,3,1,0],[0,2,3,3,2,1,0,0,1,3,2,2,2,3,3,1,0],[0,2,2,3,2,1,0,0,1,1,3,3,3,1,1,1,0],[0,2,2,3,2,1,0,1,1,1,1,1,1,1,1,1,0],[0,3,3,2,2,1,1,3,3,3,1,1,1,1,1,1,0],[0,2,2,1,1,3,3,3,3,3,3,3,1,1,1,1,0],[0,1,1,1,1,3,3,0,0,0,3,3,1,1,1,1,0],[0,1,1,1,1,3,3,0,0,0,3,3,1,1,1,1,0],[0,1,1,1,1,3,3,3,0,3,3,3,1,1,1,2,0],[0,1,1,1,1,1,3,3,3,3,3,1,1,2,2,2,0],[0,1,1,1,1,1,1,1,3,1,1,2,2,2,2,2,0],[0,1,2,2,2,2,2,2,1,1,2,2,2,2,2,2,0],[0,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]

##Docker
Open docker quickstart terminal
go to directory where the file "docker-compose.yml" is located
then use command: 'docker-compose up' to start the game on the ip addres you received from docker on port 8080.