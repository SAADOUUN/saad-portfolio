# Saad El Filali - Portfolio Website

A modern, cyberpunk-themed portfolio website built with Next.js, TailwindCSS, and Framer Motion.

## 🚀 Features

- **Multi-language Support**: Arabic (AR), French (FR), English (EN), German (DE)
- **Cyberpunk/Hacker Theme**: Black and red color scheme with glitch effects, neon glows, and matrix animations
- **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Smooth Animations**: Powered by Framer Motion
- **Modern Stack**: Next.js 14 (App Router), TailwindCSS, TypeScript

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- npm or yarn

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

   The website will automatically detect your browser language or default to English. You can access specific languages:
   - English: http://localhost:3000/en
   - French: http://localhost:3000/fr
   - Arabic: http://localhost:3000/ar
   - German: http://localhost:3000/de

## 📁 Project Structure

```
├── app/
│   ├── [locale]/          # Localized routes
│   │   ├── layout.tsx     # Locale-specific layout
│   │   └── page.tsx       # Home page
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Certifications.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── LanguageSelector.tsx
├── messages/              # Translation files
│   ├── en.json
│   ├── fr.json
│   ├── ar.json
│   └── de.json
├── i18n.ts               # i18n configuration
├── middleware.ts         # Next.js middleware for i18n
└── tailwind.config.js    # TailwindCSS configuration
```

## 🎨 Customization

### Adding Your Image

1. Place your image in the `public` folder
2. Update the Hero component (`components/Hero.tsx`) to use your image:
   ```tsx
   <Image 
     src="/your-image.jpg" 
     alt="Saad El Filali" 
     width={400} 
     height={400}
     className="rounded-full"
   />
   ```

### Updating Content

- **Translations**: Edit files in `messages/` folder
- **Skills**: Update `components/Skills.tsx`
- **Projects**: Update `components/Projects.tsx`
- **Certifications**: Update `components/Certifications.tsx`

### Adding CV Download

1. Place your CV file in the `public` folder
2. Update the Navbar component (`components/Navbar.tsx`):
   ```tsx
   const handleDownloadCV = () => {
     const link = document.createElement('a');
     link.href = '/cv.pdf';
     link.download = 'Saad_El_Filali_CV.pdf';
     link.click();
   };
   ```

### Updating Social Links

Edit the `socialLinks` array in `components/Contact.tsx` with your actual social media URLs.

## 🏗️ Building for Production

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm start
# or
yarn start
```

## 📝 Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **next-intl**: Internationalization
- **Lucide React**: Icon library

## 🎯 Sections

1. **Hero**: Introduction with glitch animations
2. **About**: Personal description with typing effect
3. **Skills**: Three categories of technical and soft skills
4. **Projects**: Showcase of cybersecurity projects
5. **Certifications**: Display of professional certifications
6. **Contact**: Contact form and social media links

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is private and proprietary.

## 👤 Author

**Saad El Filali**
- Cybersecurity & Infrastructure Student

---

Built with ❤️ and lots of ☕

