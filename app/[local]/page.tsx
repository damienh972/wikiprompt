import { useTranslations } from 'next-intl';

const Home = () => {
  const t = useTranslations('Index');
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        {t('main_title')}
        <br className='max-md:hidden' />
        <span className='teal_gradient text-center'>{t('sub_title')}</span>
      </h1>
      <p className='desc text-center'>{t('description')}</p>
      {/* <Feed /> */}
    </section>
  );
};

export default Home;
