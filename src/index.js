import readline from 'readline';
import os from 'os';
import { performUp, performCd, performLs } from './commands/nav.js';
import { performCat, performAdd, performRm, performMv, performCp, performRn } from './commands/files.js';
import { performOsInfo } from './commands/osinfo.js';
import { performHash } from './commands/hash.js';
import { performCompress, performDecompress } from './commands/zip.js';

// инициализируем интерфейс командной строки
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>'
});

// получаем имя пользователя из аргументов командной строки
const username = process.argv[2]?.split('=')[1];

if (!username) {
  console.error('Please provide a username with --username=your_username');
  process.exit(1);
}

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${process.cwd()}`);
console.log('up - нынешняя директория. \nls - содержание директории. \ncat - Выводит содержимое указанного файла в консоль. \nadd - Создает новый пустой файл с указанным именем в текущей директории.');
console.log('rm - Удаляет указанный файл. \ncp - Копирует файл из одного места в другое.\nmv - Перемещает файл из одного места в другое (копирует файл, а затем удаляет исходный).');
console.log('cd - Изменяет текущую рабочую директорию на указанную пользователем.\nup - Перемещает текущую рабочую директорию на один уровень вверх (в родительскую директориюn');
console.log('os - информация о системе\nhash - Вычисляет хэш-сумму для указанного файла.\ncompress - Сжимает указанный файл или директорию в архив.\ndecompress - Распаковывает указанный архив в текущую директорию.\n');
console.log('.exit - выход из программы');
rl.prompt();

// обработка строки, введенной пользователем
rl.on('line', (line) => {
  const [command, ...args] = line.trim().split(/\s+/);

  switch (command) {
    case 'up':
      performUp();
      break;
    case 'cd':
      performCd(args);
      break;
    case 'ls':
      performLs();
      break;
    case 'cat':
      performCat(args);
      break;
    case 'add':
      performAdd(args);
      break;
    case 'rm':
      performRm(args);
      break;
    case 'mv':
      performMv(args);
      break;
    case 'cp':
      performCp(args);
      break;
    case 'rn':
      performRn(args);
      break;
    case 'os':
      performOsInfo(args);
      break;
    case 'hash':
      performHash(args);
      break;
    case 'compress':
      performCompress(args);
      break;
    case 'decompress':
      performDecompress(args);
      break;
    case '.exit':
      rl.close();
      break;
    default:
      console.log('Invalid input');
  }
  rl.prompt();
});

// закрытие программы
rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}! Goodbye!`);
  process.exit(0);
});