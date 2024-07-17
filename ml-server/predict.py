from fileinput import filename
from unittest import result
from numpy import mod
import pandas as pd
from scipy.stats.stats import mode
from sklearn import model_selection
import numpy
import copy 
from sklearn.ensemble import RandomForestRegressor,ExtraTreesRegressor
from sklearn import linear_model;
from sklearn import tree;
from sklearn import neighbors;
from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer
from sklearn.metrics import roc_auc_score
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import make_scorer, accuracy_score, precision_score, recall_score, f1_score
from sklearn.linear_model import LogisticRegression
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score,confusion_matrix
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import BernoulliNB
from sklearn.svm import SVC
from sklearn.ensemble import AdaBoostClassifier
from sklearn.linear_model import Lasso
import missingno as msno
import pickle;

def predict_results(x, filename):
   x=numpy.array(x).reshape((1,-1))
   loaded_model = pickle.load(open(filename, 'rb'))
   result = loaded_model.predict(x);
   return result

print(predict_results(numpy.array([0,0,0,0,0,0,0,0,0,0,8,0,2,8,0,3,8,8,0,0,1,1,0,0,0,0,0,0,0,0,24,1]).reshape((1,-1)),'xgboost'))
    
