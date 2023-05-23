import subprocess

print("Hello world")
process = subprocess.Popen(["C:\\Users\\Nidal\\Documents\\BUT2\\Boggle\\Projet-Boggle\\froggle-website\\backend\\src\\chatac\\game-engine\\grid_build", "C:\\Users\\Nidal\\Documents\\BUT2\\Boggle\\Projet-Boggle\\froggle-website\\backend\\src\\chatac\\game-engine\\frequences.txt",'4','4'], stdout=subprocess.PIPE)
output, error = process.communicate()
grid = output.decode()
print(grid)
print(type(grid))

process2 = subprocess.Popen(["C:\\Users\\Nidal\\Documents\\BUT2\\Boggle\\Projet-Boggle\\froggle-website\\backend\\src\\chatac\\game-engine\\solve", "C:\\Users\\Nidal\\Documents\\BUT2\\Boggle\\Projet-Boggle\\froggle-website\\backend\\src\\chatac\\game-engine\\dico.lex", "3", "4", "4"] + grid.split(" "), stdout=subprocess.PIPE)
output2, error2 = process2.communicate()
solutionsString = output2.decode()
#solutions = solutionsString.strip().split(" ")
print(solutionsString)
print("end")