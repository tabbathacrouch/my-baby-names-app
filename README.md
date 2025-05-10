# Baby Name (Tinder) App 👶💞

A **React + TypeScript** application for selecting baby names, inspired by **Tinder**. Users can **like** or **dislike** names, and then **email** their results!

## 🚀 Live Demo

Check out the live demo **[here](https://baby-names-hqb2tprq6-tabbathacrouchs-projects.vercel.app/)**.

## Features

- Look through baby names
- Email your results to baby's mom
- Responsive design for mobile and desktop
- Deployed to Vercel
- Environment variable support for secure API keys

## Installation

1. **Clone the Repository**

```bash
git clone https://github.com/tabbathacrouch/my-baby-names-app.git
cd baby-name-swipe-app
```

2. **Install Dependencies**

```bash
pnpm install
```

3. **Add Environment Variables**

Create a **`.env`** file in the project root:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Make sure to **replace** the values with your actual [**EmailJS**](https://www.emailjs.com/) credentials.

4. **Run the Development Server**

```bash
pnpm dev
```

## EmailJS Setup

1. Create a **free** account on **[EmailJS](https://www.emailjs.com/)**.
2. Create a **new service** and connect your email provider.
3. Create a **new email template** with the following fields:

   - **from_name**
   - **liked_names**
   - **disliked_names**

## Contributing

Pull requests are **welcome**! For major changes, please open an issue first to discuss what you would like to change.
