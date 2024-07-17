from sklearn import model_selection
import pandas as pd;
import numpy;
import missingno as msno;
cv = model_selection.RepeatedStratifiedKFold(n_splits=10, n_repeats=3, random_state=1)
df=pd.read_csv('primary_dataset.csv')

df=df.dropna(how='all', axis=1)
df=df.replace(8.0,numpy.nan)
print(df)
from sklearn.impute import KNNImputer
impu=KNNImputer(n_neighbors=3)
#import miceforest as mf;
x=df.drop(['diag'],axis=1).values
y=df['diag'].values
x=pd.DataFrame(x)
#x=x.drop(x.columns[33],axis=1)
msno.matrix(df)
y=df['diag'].values

for j,i in enumerate(y):
    if(i=='asd'):
        y[j]=1
    else:
         y[j]=0;
y=y.astype("int");
#print(x.corr());


from sklearn.model_selection import train_test_split
x.to_csv('x.csv')
pd.DataFrame(y).to_csv('y.csv')

x1,x2,y1,y2=train_test_split(x,y,test_size=0.001,random_state=42)
impu.fit(x1)
X1=impu.transform(x1)
X2=impu.transform(x2)
from fileinput import filename
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

model = XGBClassifier(base_score=0.5, booster='gbtree', colsample_bylevel=1,
              colsample_bynode=1, colsample_bytree=1, gamma=0,
              learning_rate=0.1, max_delta_step=0, max_depth=7,
              min_child_weight=1, n_estimators=100, n_jobs=1,
              nthread=None, objective='binary:logistic', random_state=0,
              reg_alpha=0, reg_lambda=1, scale_pos_weight=1, seed=None,
              silent=None, subsample=0.7, tree_method='gpu_hist', verbosity=1)

model.fit(X1,y1);
print(X1[0])
filename = 'xgboost'
pickle.dump(model,open(filename,'wb'));
fv = numpy.array(x1.iloc[532]).reshape((1,-1))

print(model.predict(fv))