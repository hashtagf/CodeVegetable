from imutils import paths
import imutils
import argparse
import cv2
import os
import numpy as np
import time
from pyimagesearch.transform import four_point_transform

def definePoint12(rec):
    return (rec[0],rec[1]),(rec[2]+rec[0],rec[3]+rec[1])

ap = argparse.ArgumentParser()
ap.add_argument("-i", "--dataset", required=True,
	help="path to input directory of faces + images")
args = vars(ap.parse_args())

imagePaths = list(paths.list_images(args["dataset"]))

for (i, imagePath) in enumerate(imagePaths):
	print("[INFO] processing image {}/{}".format(i + 1,
		len(imagePaths)))
	name = imagePath.split(os.path.sep)[-2]
	print(imagePath)

	Frame = cv2.imread(imagePath)
	Frame = imutils.resize(Frame, height = 500)
	ratio = Frame.shape[0] / 500.0
	orig = Frame.copy()

	# gray-scale convertion and Gaussian blur filter applying
	Gray = cv2.cvtColor(Frame, cv2.COLOR_BGR2GRAY)
	# Gray = cv2.GaussianBlur(Gray, (5, 5), 0)
	
	# GrayFrame = cv2.equalizeHist(Gray)
	ret,blackTray = cv2.threshold(Gray,160,230,cv2.THRESH_BINARY)
	edged = cv2.Canny(blackTray, 160, 255)
	# cv2.putText(Frame, "2", (50, 20),cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
	cnts = cv2.findContours(blackTray.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
	cnts = imutils.grab_contours(cnts)
	cnts = sorted(cnts, key = cv2.contourArea, reverse = True)
	cnts = cnts[:5]
	screenCnt = None
	for c in cnts :
		Area = cv2.contourArea(c)
		rec = cv2.boundingRect(c)
		p1, p2 = definePoint12(rec)
		cv2.rectangle(Frame, p1, p2, (0, 255, 200), 2)
		# approximate the contour
		peri = cv2.arcLength(c, True)
		approx = cv2.approxPolyDP(c, 0.02 * peri, True)
		print(len(approx))
		# if our approximated contour has four points, then we
		# can assume that we have found our screen
		if len(approx) >= 4:
			screenCnt = approx
		break
	cv2.drawContours(Frame, [screenCnt], -1, (0, 255, 0), 2)
	# warped = four_point_transform(orig, screenCnt.reshape(4, 2) * ratio)
	print(screenCnt)
	ret,blackTree = cv2.threshold(Gray,120,200,cv2.THRESH_BINARY)
	cnts = cv2.findContours(blackTree.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
	cnts = imutils.grab_contours(cnts)
	cnts = sorted(cnts, key = cv2.contourArea, reverse = True)
	for c in cnts :
		rec = cv2.boundingRect(c)
		p1, p2 = definePoint12(rec)
		if (cv2.pointPolygonTest(screenCnt,p2,True)) :
			cnts.pop()
			break
		cv2.rectangle(Frame, p1, p2, (255, 255, 0), 2)
		peri = cv2.arcLength(c, True)
		approx = cv2.approxPolyDP(c, 0.01 * peri, True)
		if len(approx) >= 4:
			screenCnt = approx
	cv2.drawContours(Frame, [screenCnt], -1, (255, 255, 0), 2)

	# time.sleep(5)
	cv2.imshow("Outline", Frame)
	# cv2.imshow("Outlie", warped)

	cv2.waitKey(0)
	cv2.destroyAllWindows()