from flask import *  
app = Flask(__name__)  

 
@app.route('/')  
def message():  
      return render_template('index.html')  

@app.route('/login_validation',methods=['POST'])  
def login_validation():

    email = request.form.get('email')
    password = request.form.get('password')
    

    return "email:{} and password {}".format(email,password)


if __name__ == '__main__':  
   app.run(debug = True)  