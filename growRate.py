from imutils import paths
import imutils
import argparse
import cv2
import os
import numpy as np
import time

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
	# gray-scale convertion and Gaussian blur filter applying
	Gray = cv2.cvtColor(Frame, cv2.COLOR_BGR2GRAY)
	Gray = cv2.GaussianBlur(Gray, (5, 5), 0)
	edged = cv2.Canny(Gray, 160, 170)
	# GrayFrame = cv2.equalizeHist(Gray)
	ret,black = cv2.threshold(Gray,160,170,cv2.THRESH_BINARY)
	# cv2.putText(Frame, "2", (50, 20),cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
	cnts = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
	cnts = imutils.grab_contours(cnts)
	cnts = sorted(cnts, key = cv2.contourArea, reverse = True)[:5]
	for c in cnts :
		# approximate the contour
		peri = cv2.arcLength(c, True)
		approx = cv2.approxPolyDP(c, 0.02 * peri, True)

		# if our approximated contour has four points, then we
		# can assume that we have found our screen
		if len(approx) == 4:
			screenCnt = approx
			break
	cv2.drawContours(Frame, [screenCnt], -1, (0, 255, 0), 2)
	cv2.imshow("Outline", Frame)
	
	cv2.imshow("Original Frame", edged)
	# time.sleep(5)

	cv2.waitKey(0)
	cv2.destroyAllWindows()