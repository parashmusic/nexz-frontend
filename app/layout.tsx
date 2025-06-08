// import './globals.css';
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Nexz - Level up your Investment',
//   description: '',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }
import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({ 
  weight: ['400', '500', '700'], // Include all weights you need
  subsets: ['latin'],
  display: 'swap', // Ensures text remains visible during webfont load
  variable: '--font-dm-sans', // Optional: for CSS variable usage
});

export const metadata: Metadata = {
  title: 'Nexz - Level up your Investment',
  description: 'Your financial future starts here',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.className}>
      <body>
        {children}
      </body>
    </html>
  );
}

// import './globals.css';
// import type { Metadata } from 'next';
// import { Space_Grotesk } from 'next/font/google';

// const spaceGrotesk = Space_Grotesk({ 
//   weight: ['300', '400', '500', '600', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-space-grotesk', // For CSS variable usage
// });

// export const metadata: Metadata = {
//   title: 'Nexz - Level up your Investment',
//   description: '',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={spaceGrotesk.className}>
//       <body className="antialiased"> {/* Adds smooth font rendering */}
//         {children}
//       </body>
//     </html>
//   );
// }