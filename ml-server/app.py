from flask import Flask, request
import numpy
from pandas import array
app = Flask(__name__)
from predict import predict_results;
import ast;
@app.route("/",methods=['POST'])
def home():
    print(request.json)
    ar=ast.literal_eval( request.get_json()['questions'] );
    print((ar))
    result=predict_results(ar,'xgboost')
    return str(result[0].item());

if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)