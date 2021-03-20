userID="Anshul"
from fer import FER
import matplotlib.pyplot as plt 
import time
import pymongo
import datetime
import numpy as np
import cv2
import requests

cap = cv2.VideoCapture(0)

while(True):
	ret, frame = cap.read()
	time.sleep(5.5)
	img=frame
	detector = FER(mtcnn=True)
	mydict = detector.detect_emotions(img)[0]

	url = 'https://www.w3schools.com/python/demopage.php'
	x = requests.post(url, data = mydict)
	print(x.text)

	cv2.imshow('frame',frame)
	if cv2.waitKey(1) & 0xFF == ord('q'):
	    break

cap.release()
cv2.destroyAllWindows()



