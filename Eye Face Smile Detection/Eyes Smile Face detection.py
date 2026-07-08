# ==========================================
# Face + Eye + Smile Detection using OpenCV
# Press Q to Exit
# ==========================================
import cv2

# -----------------------------
# Load Haar Cascade Classifiers
# -----------------------------
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

eye_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_eye.xml"
)

smile_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_smile.xml"
)

# -----------------------------
# Check XML Files
# -----------------------------
if face_cascade.empty():
    print("Face Cascade XML file not found!")
    exit()

if eye_cascade.empty():
    print("Eye Cascade XML file not found!")
    exit()

if smile_cascade.empty():
    print("Smile Cascade XML file not found!")
    exit()


# -----------------------------
# Detection Function
# -----------------------------
def detect(gray, frame):

    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.3,
        minNeighbors=5
    )

    for (x, y, w, h) in faces:

        # Face Rectangle
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

        # Face Label
        cv2.putText(
            frame,
            "Face",
            (x, y - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (255, 0, 0),
            2
        )

        # Region of Interest
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = frame[y:y+h, x:x+w]

        # -------------------------
        # Eye Detection
        # -------------------------
        eyes = eye_cascade.detectMultiScale(
            roi_gray,
            scaleFactor=1.1,
            minNeighbors=10
        )

        for (ex, ey, ew, eh) in eyes:

            cv2.rectangle(
                roi_color,
                (ex, ey),
                (ex + ew, ey + eh),
                (0, 255, 0),
                2
            )

            cv2.putText(
                roi_color,
                "Eye",
                (ex, ey - 5),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.5,
                (0, 255, 0),
                2
            )

        # -------------------------
        # Smile Detection
        # -------------------------
        smiles = smile_cascade.detectMultiScale(
            roi_gray,
            scaleFactor=1.7,
            minNeighbors=20
        )

        for (sx, sy, sw, sh) in smiles:

            cv2.rectangle(
                roi_color,
                (sx, sy),
                (sx + sw, sy + sh),
                (0, 0, 255),
                2
            )

            cv2.putText(
                roi_color,
                "Smile",
                (sx, sy - 5),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.5,
                (0, 0, 255),
                2
            )

    return frame


# -----------------------------
# Open Webcam
# -----------------------------
camera = cv2.VideoCapture(0)

if not camera.isOpened():
    print("Could not open webcam!")
    exit()

print("Press 'Q' to Exit")

# -----------------------------
# Main Loop
# -----------------------------
while True:

    ret, frame = camera.read()

    if not ret:
        print("Failed to capture frame.")
        break

    # Convert to Grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect Objects
    output = detect(gray, frame)

    # Show Output
    cv2.imshow("Face Eye Smile Detection", output)

    # Exit on Q
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

# -----------------------------
# Release Resources
# -----------------------------
camera.release()
cv2.destroyAllWindows()