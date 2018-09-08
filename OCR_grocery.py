import pytesseract
import cv2 as cv
import codecs

#read the image file and store it in image variable
image = cv.imread('image3.png')


# resize the image to achive more resolution 
im = cv.resize(image,(5000,5000))


#convert to gray scale
gray = cv.cvtColor(im, cv.COLOR_BGR2GRAY)


# Binarize the gray scale (set threshold 200)
ret3,th3 = cv.threshold(gray,200,255,cv.THRESH_BINARY)

# Blur the binarize image to get more accuracy
blur = cv.GaussianBlur(th3,(5,5),0)

# use OSTU thresolding to binarize the image again
ret4 , th4 = cv.threshold(blur,200,255,cv.THRESH_BINARY + cv.THRESH_OTSU)


# Convert the image to text
text = pytesseract.image_to_string(th4)


file = codecs.open('text.txt','w','utf-8')
file.write(text)
file.close()
# Print the output text
print(text)
