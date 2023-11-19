import { NavMessages } from '@app/types';
import Nav from '@components/Nav';
import '@styles/globals.css';
import { useMessages } from 'next-intl';
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
  const messages = useMessages();
  const navMessages = messages.Nav as unknown as NavMessages;

  if (!locales.includes(local as any)) notFound();

  return (
    <html lang={local}>
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>
        <main className='app'>
          <Nav content={navMessages} />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
