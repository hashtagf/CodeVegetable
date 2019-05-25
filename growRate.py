# USAGE
# python detect_color.py --image pokemon_games.png

# import the necessary packages
import numpy as np
import argparse
import cv2
import imutils
import requests
# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", help = "path to the image")
args = vars(ap.parse_args())

# load the image
image = cv2.imread(args["image"])

height, width, channels = image.shape
gridY = int(height/3)
gridX = int(width/4)
# define the list of boundaries
boundaries = [
	([30,60,60], [50,255,255]),
	([1,0,0], [255,160,160])
]
holes = [[],[],[]]
for i in range(0, 3):
	for j in range(0, 12):
		holes[i].append(None)
hsv = cv2.cvtColor(image,cv2.COLOR_BGR2HSV)
hsv = cv2.GaussianBlur(hsv, (5, 5), 0)
# loop over the boundaries
for (lower, upper) in boundaries:
	# create NumPy arrays from the boundaries
	# lower = np.array(lower, dtype = "uint8")
	# upper = np.array(upper, dtype = "uint8")
	lower = np.array(lower)
	upper = np.array(upper)
	# find the colors within the specified boundaries and apply
	# the mask
	mask = cv2.inRange(hsv, lower, upper)
	output = cv2.bitwise_and(image, image, mask = mask)

	cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
	cnts = imutils.grab_contours(cnts)
	cnts = sorted(cnts, key = cv2.contourArea, reverse = True)
	cnts = cnts[:12]

	for idx, c in enumerate(cnts) :
		rec = cv2.boundingRect(c)
		area = cv2.contourArea(c)
		if (area>50 and area < 5000):
			peri = cv2.arcLength(c, True)
			approx = cv2.approxPolyDP(c, 0.01 * peri, True)
			#if len(approx) >= 4:
			screenCnt = approx
			centerX = int((screenCnt[0][0][0] + screenCnt[int(len(screenCnt)/2)][0][0])/2)
			centerY = int((screenCnt[int(len(screenCnt)/4)][0][1] + screenCnt[int(len(screenCnt)/4*3)][0][1])/2)
			centerCo = (centerX , centerY)
			col = int(centerX/gridX)
			row = int(centerY/gridY)
			hole = col*3+row
			if (holes[0][hole] is None):
				holes[0][hole] = area
			cv2.drawContours(image, [screenCnt], -1, (255, 255, 0), 2)
			cv2.putText(image, "{}".format(str(hole)) + ": {}".format(str(area)), centerCo,
        	cv2.FONT_HERSHEY_SIMPLEX, 0.5, (250, 0, 1), 2)
	# time.sleep(5)
	# show the images
	# r = requests.post("https://smartfarm-cabinet.herokuapp.com/hole/:id", data={'number': 12524, 'type': 'issue', 'action': 'show'})
	# print(r.status_code, r.reason)
	getHoles = requests.get("https://smartfarm-cabinet.herokuapp.com/hole")
	Holes = getHoles.json()
	for i in range(0, 3):
		for j in range(0, 12):
			index = i*3+j
			if index < len(Holes) and Holes[index]['statushole'] and holes[i][j] is not None:
				if 'sizebefore' in Holes[index] :
					sizebefore = Holes[index]['sizeafter']
					sizeafter = holes[i][j]
				else :
					sizeafter = holes[i][j]
					sizebefore = holes[i][j]
				r = requests.put("https://smartfarm-cabinet.herokuapp.com/hole/" + Holes[index]['_id'], 
				data = {
					"idhole": Holes[index]['idhole'],
					"statushole": Holes[index]['statushole'],
					"nameveg": Holes[index]['nameveg'],
					"typeveg": Holes[index]['typeveg'],
					"sizebefore": sizebefore,
					"sizeafter": sizeafter,
				})
				print(r.json())
	print("fin")
	cv2.imshow("images", np.hstack([image, output]))
	cv2.waitKey(0)
	cv2.destroyAllWindows()