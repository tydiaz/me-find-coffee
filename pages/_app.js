import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <footer>
        <p>© 2022 Gandalf</p>
        <a href='https://icons8.com/icon/KRQgTwddkc3A/coffee'>Coffee</a> icon by{' '}
        <a href='https://icons8.com'>Icons8</a>
      </footer>
    </div>
  );
}

export default MyApp;
