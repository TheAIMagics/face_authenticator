from flask import *

app = Flask(__name__) 

 
@app.route('/')  
def message():  
      return render_template('index.html')  

@app.route('/login_validation',methods=['POST'])  
def login_validation():

    email = request.form.get('email')
    password = request.form.get('password')
    return render_template("webcam.html")

@app.route('/images',methods=['POST',"GET"])  
def images():

    if request.method == 'POST':

        print("URL HITTED")
        query_param_recieved = request.args
        query_param_dict = query_param_recieved.to_dict()
        download_flag = query_param_dict.get("arg2")
        
        
    
        
    return ""

if __name__ == '__main__':  
   app.run(debug = True)  