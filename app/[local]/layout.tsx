import '@styles/globals.css';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'wikiprompt',
  description: 'Community-driven wiki for prompts',
};

const locales = ['en', 'fr'];

const RootLayout = ({
  children,
  params: { local },
}: {
  children: React.ReactNode;
  params: { local: string };
}) => {
  if (!locales.includes(local as any)) notFound();
  return (
    <html lang={local}>
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>
        <main className='app'>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;