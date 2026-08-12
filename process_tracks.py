import cv2
import numpy as np
import os

os.makedirs('public/tracks', exist_ok=True)
img = cv2.imread('public/collection-f1-racing-tracks_23-2147889165.jpg')
if img is None:
    print("Could not read image.")
    exit(1)

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Threshold: tracks are black on white. 
# Make tracks white (255) and background black (0).
_, thresh = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY_INV)

# Prepare full image as transparent background with white tracks for Hero
bgra = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
# Set background alpha to 0
bgra[:, :, 3] = thresh
# Color tracks dark-red or white. The text uses var(--accent-color) which is #e60000.
# We'll make them faint gray/white or red. Let's do a faint text color like #71717a
bgra[thresh == 255] = [200, 200, 200, 20] # Faint white track lines

cv2.imwrite('public/tracks_bg_dark.png', bgra)

# Now find contours for individual track separation
contours, hierarchy = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

count = 1
for cnt in contours:
    x, y, w, h = cv2.boundingRect(cnt)
    # filter out small noise and the text at the bottom.
    if w > 30 and h > 30 and y < (img.shape[0] - 100): 
        # Extract track
        track_img = cv2.cvtColor(img[y:y+h, x:x+w], cv2.COLOR_BGR2BGRA)
        # make it transparent
        track_thresh = thresh[y:y+h, x:x+w]
        track_img[:, :, 3] = track_thresh
        # Color the individual tracks the accent color (BGR=0, 0, 230)
        track_img[track_thresh == 255] = [0, 0, 230, 255] 
        cv2.imwrite(f'public/tracks/track_{count}.png', track_img)
        count += 1

print(f"Extracted {count-1} tracks")
