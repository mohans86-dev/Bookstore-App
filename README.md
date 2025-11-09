# Bookstore App

Download the app: https://github.com/mohans86-dev/Bookstore-App/releases/download/v1.0.0/bookstore.apk

---

## 🖼️ Screenshots

<img width="217" height="459" alt="Screenshot_1" src="https://github.com/user-attachments/assets/3d8c11c9-6be0-4941-88e0-bf9e25fb28b2" />
<img width="207" height="459" alt="Screenshot_2025-11-07-01-17-27-25_055a28fee6e9c39ddb596aa6ac6a96fe-portrait" src="https://github.com/user-attachments/assets/65cf4ea8-b6b2-4175-a371-d1b5abefd2e1" />
<img width="207" height="459" alt="Screenshot_2025-11-07-01-18-38-95_055a28fee6e9c39ddb596aa6ac6a96fe-portrait" src="https://github.com/user-attachments/assets/ac506703-eee2-4b0c-881c-a80a23b94c2f" />
<img width="207" height="459" alt="Screenshot_2025-11-07-01-19-03-13_055a28fee6e9c39ddb596aa6ac6a96fe-portrait" src="https://github.com/user-attachments/assets/23e1bd18-1268-465f-b651-e19ee9211524" />
<img width="207" height="459" alt="Screenshot_2025-11-07-01-19-14-09_055a28fee6e9c39ddb596aa6ac6a96fe-portrait" src="https://github.com/user-attachments/assets/2662be1c-29b9-45f0-90c7-084fe9a9553c" />
<img width="217" height="459" alt="Screenshot_2" src="https://github.com/user-attachments/assets/4a1a6106-55bd-4db7-b30b-65000bc4096e" />
<img width="217" height="459" alt="Screenshot_3" src="https://github.com/user-attachments/assets/906596d0-f3ed-4f28-8239-9ab2bf672b0e" />

---

# 📚 BookStore App

A **Book Management Android App** with an integrated **Node.js + MongoDB backend**, designed for both **Admins** and **Customers**.  
Admins can manage book stock, and customers can browse, view, and purchase books.  
Built with **Java (Android)** and **Material Design UI** for an elegant experience.

---

## ✨ Features

### 👩‍💼 **Admin Features**
- Add or update books with title, author, ISBN, and description  
- Upload a custom book cover image (Base64 encoded & stored in MongoDB)  
- View all books including out-of-stock ones  
- Update stock quantity instantly  
- Delete books from inventory  
- Local image caching using SQLite (for offline access)

### 👨‍💻 **Customer Features**
- Browse all available books  
- View book details and availability  
- Add books to cart and checkout  
- Real-time updates on stock availability

---

## 🧩 Tech Stack

| Layer | Technology |
|:------|:------------|
| **Frontend (Mobile)** | Android (Java, XML), Retrofit, Glide |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **Local Storage** | SQLite (DAO for image caching) |
| **UI Library** | Material Components for Android |
| **Image Handling** | Base64 Encoding + Glide |
| **API Communication** | Retrofit2 + Gson |

---

## 🔑 User Roles

| Role | Description |
|------|--------------|
| **Admin** | Can add, update, delete, and manage stock of all books |
| **Customer** | Can only view and purchase available books |

---
