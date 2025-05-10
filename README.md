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
cd my-baby-names-app
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
VITE_API_SHEETBEST_URL=your_sheetbest_url
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

## SheetBest API Setup

1. Create a **Google Sheet** with your baby names.
2. Use **SheetBest** to connect your Google Sheet to an API.
3. Add the **SheetBest** URL to your **`.env`** file as **`VITE_API_SHEETBEST_URL`**.
4. Make sure the Google Sheet has the required columns (e.g., **name**, **meaning**, **origin**, **popularity**).

## Contributing

Pull requests are **welcome**! For major changes, please open an issue first to discuss what you would like to change.
