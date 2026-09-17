# 👁️ Face, Eyes & Smile Detection

<p align="center">

<img src="https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white">
<img src="https://img.shields.io/badge/OpenCV-Computer%20Vision-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white">
<img src="https://img.shields.io/badge/Real--Time-Detection-00C853?style=for-the-badge">
<img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge">

</p>
<p align="center">
  <b>Real-Time Computer Vision Project for Face, Eye & Smile Detection</b>
</p>

<p align="center">
  Built with Python 🐍 and OpenCV 👁️
</p>

---
## 📌 Overview

**Face, Eyes & Smile Detection** is a real-time Computer Vision project developed using **Python and OpenCV**.

The system uses **Haar Cascade Classifiers** to detect human faces, eyes, and smiles from a live webcam stream.

The project demonstrates fundamental and practical concepts of:

- Computer Vision
- Object Detection
- Image Processing
- Real-Time Video Processing
- Haar Cascade Classifiers
- Region of Interest (ROI)
- Grayscale Image Processing
- Bounding Box Detection

---

## ✨ Features

| Feature | Description |
|---|---|
| 👤 Face Detection | Detects human faces in real time |
| 👁️ Eye Detection | Detects eyes inside detected face regions |
| 😄 Smile Detection | Detects smiles from facial regions |
| 📷 Webcam Support | Uses live camera input |
| ⚡ Real-Time Processing | Processes frames continuously |
| 🎯 Haar Cascades | Uses pre-trained OpenCV classifiers |
| 🖼️ Bounding Boxes | Displays detection regions visually |
| 🧠 ROI Processing | Performs feature detection inside face regions |

---

## 🧠 Detection Pipeline

```text
                 ┌──────────────────┐
                 │      Webcam      │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │  Capture Frame   │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ Convert to Gray  │
                 │     Scale        │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │  Face Detection  │
                 └────────┬─────────┘
                          ↓
              ┌───────────┴───────────┐
              ↓                       ↓
     ┌────────────────┐       ┌────────────────┐
     │ Eye Detection  │       │Smile Detection │
     └───────┬────────┘       └───────┬────────┘
             │                        │
             └───────────┬────────────┘
                         ↓
                ┌──────────────────┐
                │ Draw Bounding    │
                │     Boxes        │
                └────────┬─────────┘
                         ↓
                ┌──────────────────┐
                │ Display Result   │
                └──────────────────┘
