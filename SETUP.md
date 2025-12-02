# Quick Setup Guide

## 🚀 Getting Started

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to: **http://localhost:3000**

The site will automatically redirect to your browser's language or default to English.

## 📝 Customization Checklist

### ✅ Add Your Profile Image
1. Place your image in the `public` folder (e.g., `public/profile.jpg`)
2. Open `components/Hero.tsx`
3. Replace the image placeholder section (around line 80) with:
```tsx
import Image from 'next/image';

// Replace the placeholder div with:
<Image
  src="/profile.jpg"
  alt="Saad El Filali"
  width={400}
  height={400}
  className="rounded-full border-4 border-cyber-red"
  priority
/>
```

### ✅ Add Your CV
1. Place your CV PDF in the `public` folder (e.g., `public/cv.pdf`)
2. Open `components/Navbar.tsx`
3. Update the `handleDownloadCV` function (around line 30):
```tsx
const handleDownloadCV = () => {
  const link = document.createElement('a');
  link.href = '/cv.pdf';
  link.download = 'Saad_El_Filali_CV.pdf';
  link.click();
};
```

### ✅ Update Social Media Links
1. Open `components/Contact.tsx`
2. Find the `socialLinks` array (around line 30)
3. Update the `href` values with your actual social media URLs:
```tsx
const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/in/yourprofile', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/yourprofile', label: 'Instagram' },
  { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
  { icon: Github, href: 'https://github.com/yourprofile', label: 'GitHub' },
];
```

### ✅ Update Project Links
1. Open `components/Projects.tsx`
2. Find the project cards and update the `href` attributes with your actual project URLs

### ✅ Update Certification Links
1. Open `components/Certifications.tsx`
2. Find the certification cards and update the `href` attributes with your Credly badge URLs

### ✅ Customize Content
- Edit translation files in `messages/` folder to update content in all languages
- Modify component files to change structure or styling

## 🎨 Styling Customization

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  cyber: {
    black: '#000000',
    red: '#ff0000',  // Change this to your preferred red
    // ...
  },
}
```

### Modify Animations
- Edit `app/globals.css` for custom CSS animations
- Modify Framer Motion props in component files for animation behavior

## 🌐 Language Support

All translations are in the `messages/` folder:
- `en.json` - English
- `fr.json` - French
- `ar.json` - Arabic
- `de.json` - German

Edit these files to customize content for each language.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is busy, use:
```bash
npm run dev -- -p 3001
```

### Module Not Found Errors
Delete `node_modules` and `.next` folder, then:
```bash
npm install
```

### TypeScript Errors
Make sure all dependencies are installed:
```bash
npm install
```

## 📞 Need Help?

Check the main `README.md` for more detailed information.

