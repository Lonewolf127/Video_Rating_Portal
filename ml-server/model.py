#results
import sys
sys.stdout = open('file', 'w')

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
kfold = model_selection.KFold(n_splits=10)

scoring = {'accuracy' : make_scorer(accuracy_score), 
           'precision' : make_scorer(precision_score),
           'recall' : make_scorer(recall_score), 
           'f1_score' : make_scorer(f1_score)}

import matplotlib.pyplot as plt
plt.show()
prec={}
rec={}
spec={}
auc={}
f1={}

cv = model_selection.RepeatedStratifiedKFold(n_splits=10, n_repeats=3, random_state=1)
df=pd.read_csv('primary_dataset.csv')
df=df.dropna(how='all', axis=1)
df=df.replace(8.0,numpy.nan)

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
print('done')
x1,x2,y1,y2=train_test_split(x,y,test_size=0.001,random_state=42)

#precision
def func_precision(matrix):
    print("Precision: "+ str(matrix[0][0]*1.0/(matrix[0][0]+matrix[0][1])))
    return str(matrix[0][0]*1.0/(matrix[0][0]+matrix[0][1]))
#recall    
def func_recall(matrix):
    print("Recall: "+str(matrix[0][0]*1.0/(matrix[0][0]+matrix[1][0])));
    return str(matrix[0][0]*1.0/(matrix[0][0]+matrix[1][0]))
#specificity
def func_specificity(matrix):
    print("Specificity: "+ str(matrix[1][1]*1.0/(matrix[1][1]+matrix[0][1])))
    return str(matrix[1][1]*1.0/(matrix[1][1]+matrix[0][1]))

def aoc(y2,pred):
    auc_score=roc_auc_score(y2, pred)
    print("auc_score: "+str(auc_score))
    return auc_score

def results(model,name,imputer,i_name):
    print(name+'/'+i_name)
    imputer.fit(x1)
    global scoring
    X1=imputer.transform(x1)
    X2=imputer.transform(x2)
    
    results = model_selection.cross_validate(estimator=model,
                                          X=X1,
                                          y=y1,
                                          cv=5,
                                          scoring=scoring,verbose=True)
       
    # pred=model.fit(X1,y1).predict(X2)
    # confusion =confusion_matrix(pred,y2)
    # prec[name][i_name]=func_precision(confusion)
    # rec[name][i_name]=func_recall(confusion)
    # spec[name][i_name]=func_specificity(confusion)
    for i,j in results.items():
      print(i+str(numpy.mean(j)))
    #print(np.mean(results))
    # f1[name][i_name]=(float(prec[name][i_name])*float(rec[name][i_name])*2.0)/(float(prec[name][i_name])+float(rec[name][i_name]))
    # # print(y2,pred)
    # auc[name][i_name]=aoc(y2,pred);
md=[];
name=[];

# model = KNeighborsClassifier(n_neighbors=15)
# md.append(copy.deepcopy(model))
# name.append("KNN")
model=LogisticRegression(C=0.01, class_weight=None, dual=False, fit_intercept=True,
                   intercept_scaling=1, l1_ratio=None, max_iter=100,
                   multi_class='auto', n_jobs=None, penalty='l2',
                   random_state=0, solver='newton-cg', tol=0.0001, verbose=0,
                   warm_start=False)
md.append(copy.deepcopy(model))
name.append("LR")
# model= DecisionTreeClassifier(random_state=0)
# md.append(copy.deepcopy(model))
# name.append("DT")
# model = RandomForestClassifier(n_estimators=15, random_state=2)
# name.append("RF")
# md.append(copy.deepcopy(model))
model = XGBClassifier(base_score=0.5, booster='gbtree', colsample_bylevel=1,
              colsample_bynode=1, colsample_bytree=1, gamma=0,
              learning_rate=0.1, max_delta_step=0, max_depth=3,
              min_child_weight=1, missing=None, n_estimators=1000, n_jobs=1,
              nthread=None, objective='binary:logistic', random_state=0,
              reg_alpha=0, reg_lambda=1, scale_pos_weight=1, seed=None,
              silent=None, subsample=0.5, tree_method='gpu_hist', verbosity=1)
md.append(copy.deepcopy(model))
name.append("XGB1")
model = XGBClassifier(base_score=0.5, booster='gbtree', colsample_bylevel=1,
              colsample_bynode=1, colsample_bytree=1, gamma=0,
              learning_rate=0.1, max_delta_step=0, max_depth=7,
              min_child_weight=1, missing=None, n_estimators=100, n_jobs=1,
              nthread=None, objective='binary:logistic', random_state=0,
              reg_alpha=0, reg_lambda=1, scale_pos_weight=1, seed=None,
              silent=None, subsample=0.7, tree_method='gpu_hist', verbosity=1)
md.append(copy.deepcopy(model))
name.append("XGB2")

# model=BernoulliNB()
# md.append(copy.deepcopy(model))
# name.append("NB-Bernoulli")
# model=SVC()
# md.append(copy.deepcopy(model))
# name.append("SVM")
model=AdaBoostClassifier(algorithm='SAMME.R', base_estimator=None, learning_rate=0.1,
                   n_estimators=100, random_state=None)
md.append(copy.deepcopy(model))
name.append("ada")
model=LogisticRegression(C=0.1, class_weight=None, dual=False, fit_intercept=True,
                   intercept_scaling=1, l1_ratio=None, max_iter=100,
                   multi_class='auto', n_jobs=None, penalty='l1',
                   random_state=None, solver='liblinear', tol=0.0001, verbose=0,
                   warm_start=False)

md.append(copy.deepcopy(model))
name.append("lasso1")
model=LogisticRegression(C=0.1, class_weight=None, dual=False, fit_intercept=True,
                   intercept_scaling=1, l1_ratio=None, max_iter=100,
                   multi_class='auto', n_jobs=None, penalty='l1',
                   random_state=None, solver='liblinear', tol=0.0001, verbose=0,
                   warm_start=False)



md.append(copy.deepcopy(model))
name.append("lasso2")
model= LogisticRegression(C=0.1, class_weight=None, dual=False, fit_intercept=True,
                   intercept_scaling=1, l1_ratio=None, max_iter=100,
                   multi_class='auto', n_jobs=None, penalty='l1',
                   random_state=None, solver='liblinear', tol=0.0001, verbose=0,
                   warm_start=False)
md.append(copy.deepcopy(model))
name.append("lasso3")

imputers=[]
lrs=[];
#log for you
lr=neighbors.KNeighborsRegressor()
lrs.append(copy.deepcopy(lr))
lr=linear_model.LinearRegression()
lrs.append(copy.deepcopy(lr))
lr=linear_model.BayesianRidge()
lrs.append(copy.deepcopy(lr))
lr=tree.DecisionTreeRegressor()
lrs.append(copy.deepcopy(lr))
lr=RandomForestRegressor();
lrs.append(copy.deepcopy(lr))

#print(x)
# kernel = mf.MultipleImputedKernel(
#   data=x,
#   save_all_iterations=True,
#   random_state=1991
# )

#kernel.mice(3,verbose=True)

#pipx=pd.DataFrame(impu.fit_transform(x))
#print(df.isnull().mean().sort_values(ascending=False))

from sklearn.impute import SimpleImputer

# print(x)
# print(y)
imputer_name=[];
simp=imputer = SimpleImputer(missing_values=numpy.nan, strategy='mean')
imp=IterativeImputer(estimator=lr,verbose=2,max_iter=30,tol=1e-10,imputation_order='roman');
imputers.append(copy.deepcopy(simp));
imputer_name.append("mean")
for i in lrs:
    imp=IterativeImputer(estimator=i,verbose=2,max_iter=30,tol=1e-10,imputation_order='roman');
    imputers.append(copy.deepcopy(imp))
    imputer_name.append("Iterative"+str(type(i).__name__))
for i in imputer_name:
    print(i)
# simp.fit(x1)
# x1=simp.transform(x1)
# x2=simp.transform(x2)
# print(x1)

for i in range(len(md)):
    x={}
    prec[name[i]]=x
    rec[name[i]]={}
    spec[name[i]]={}
    auc[name[i]]={}
    f1[name[i]]={}
    for j in range(len(imputers)):
        results(md[i],name[i],imputers[j],i_name=imputer_name[j])

prec=pd.DataFrame.from_dict(prec)
rec=pd.DataFrame.from_dict(rec)
spec=pd.DataFrame.from_dict(spec)
auc=pd.DataFrame.from_dict(auc)
f1=pd.DataFrame.from_dict(f1)
prec.to_csv('precision.csv')
rec.to_csv('recall.csv')
spec.to_csv('specificity.csv')
auc.to_csv('auc.csv')
f1.to_csv('f1.csv')
print(prec)
print(rec)
print(spec)
print(auc)
# from sklearn.metrics import accuracy_score,confusion_matrix
# from sklearn.neighbors import KNeighborsClassifier
# model = KNeighborsClassifier(n_neighbors=15)
# results = model_selection.cross_validate(estimator=model,
#                                           X=x1,
#                                           y=y1,
#                                           cv=kfold,
#                                           scoring=scoring)

print('test')
sys.stdout.close()