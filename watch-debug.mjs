import chokidar from 'chokidar';
import chalk from 'chalk';

const watcher = chokidar.watch('.', {
  ignored: /node_modules/,
  ignoreInitial: true,
});
// const watcher = chokidar.watch('.', { ignored: /node_modules|\.next/ });

console.log(chalk.cyan('👀 Watching for file changes...'));

let lastChange = 0;

watcher.on('change', (path) => {
  const now = Date.now();

  // уникаємо повторних тригерів з однієї події
  if (now - lastChange < 300) return;
  lastChange = now;

  const file = path.replace(process.cwd(), '.');
  console.log(`${chalk.yellow('[Fast Refresh]')} rebuilding ${chalk.green(file)}`);
  setTimeout(() => {
    console.log(chalk.greenBright('[Fast Refresh] done ✅'));
  }, 100);
});

// import chokidar from 'chokidar';

// const watcher = chokidar.watch('.', {
//   ignored: ['node_modules', '.next', '.git', '**/*.map'],
//   persistent: true,
// });

// watcher.on('change', (path) => {
//   console.log('🌀 File changed:', path);
// });
