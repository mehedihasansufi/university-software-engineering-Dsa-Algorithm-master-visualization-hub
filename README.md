[README (1).md](https://github.com/user-attachments/files/26859584/README.1.md)
# 🧭 nodePath — Algorithm Visualizer

A web-based algorithm visualizer that helps CSE students understand sorting algorithms through interactive, step-by-step animations.

---

## 📌 About

**nodePath** is a team project built as part of a Computer Science curriculum. Instead of reading static textbook descriptions, users can watch sorting algorithms come to life with color-coded bar animations, operation logs, and complexity analysis — all in one place.

---

## ✨ Features

### 🔢 Insertion Sort Visualizer
- Set array size from 2 to 10 elements
- Enter custom values or generate a random array
- Auto-play animation or step through manually
- Color-coded bars: **key**, **comparing**, **inserting**, and **sorted** states
- Operation log records every comparison and shift
- Speed slider: 1500ms (slow) → 150ms (very fast)

### 🔍 Selection Sort Visualizer
- Same controls as Insertion Sort
- Crown animation highlights the current minimum element
- Live stats: pass number, current minimum, total swaps, total comparisons
- Color states: pink (comparing), yellow (minimum), green (sorted)

### ⚙️ Common Features
- Reset button to start fresh at any time
- Complexity cards showing **Best**, **Average**, **Worst** time & space complexity
- Fully responsive — works on both desktop and mobile

---

## 🎨 Color System

| Color  | Meaning |
|--------|---------|
| 🔵 Blue   | Normal unsorted element |
| 🟡 Yellow | Key element (Insertion) / Current minimum (Selection) |
| 🩷 Pink   | Element currently being compared |
| 🟣 Purple | Element being placed into correct position |
| 🟢 Green  | Fully sorted element |

---

## 📊 Algorithm Details

### Insertion Sort
| Case       | Complexity |
|------------|------------|
| Best Case  | O(n)       |
| Worst Case | O(n²)      |
| Space      | O(1)       |
| Stable     | ✅ Yes     |

### Selection Sort
| Case       | Complexity |
|------------|------------|
| Best Case  | O(n²)      |
| Worst Case | O(n²)      |
| Space      | O(1)       |
| Stable     | ❌ No      |

---

## 🛠️ Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | HTML5, CSS3, JavaScript |
| Backend    | Django (Python) |
| Icons      | Font Awesome |
| Styling    | Glassmorphism effects, custom CSS animations |

---

## 🚀 Getting Started

### Prerequisites
- Python 3.x
- Django

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/nodePath.git
cd nodePath

# Install dependencies
pip install -r requirements.txt

# Run the development server
python manage.py runserver
```

Then open your browser and go to `http://127.0.0.1:8000`

---

## 🧭 How to Use

1. Open the site and log in
2. Select an algorithm from the dashboard (Insertion Sort or Selection Sort)
3. Set array size and enter values — or click **Random** to generate one
4. Click **Auto Sort** to watch the animation, or use **Step** to go manually
5. Read the operation log to follow each comparison and swap
6. Check the complexity cards for performance info
7. Hit **Reset** and try a different array or algorithm

---

## ⚠️ Current Limitations

- Maximum array size: 10 elements
- Only 2 algorithms implemented (Insertion Sort and Selection Sort)
- No backward step navigation — forward only
- No side-by-side algorithm comparison mode

---

## 🔭 Future Work

- [ ] Add more algorithms: Bubble Sort, Merge Sort, Quick Sort
- [ ] Add Linked List visualizer (insert, delete, search)
- [ ] Allow backward step navigation
- [ ] Side-by-side algorithm comparison mode
- [ ] Quiz and progress tracking for students

---

## 📚 References

- Cormen et al. (2009). *Introduction to Algorithms*. MIT Press.
- [GeeksforGeeks — Insertion Sort](https://www.geeksforgeeks.org/insertion-sort/)
- [GeeksforGeeks — Selection Sort](https://www.geeksforgeeks.org/selection-sort/)
- [Django Documentation](https://docs.djangoproject.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 👥 Team

Built as a team project for the **nodePath** module.

---

## 📄 License

This project is for academic purposes.
