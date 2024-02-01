const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const dotenv = require('dotenv');
const readline = require('readline');

const DIST_PATH = path.resolve(__dirname, '../../../../dist/apps/dev/clients/cli/build');
const DIST_FILE_NAME = 'index.js';

dotenv.config();
if (process.env.VERBOSE) {
  console.log('Verbose logging enabled');
}
async function spawnAsync(
  cmd,
  args,
  options
) {
  if (options && options.env) {
    options.env = { ...process.env, ...options.env };
  }

  const child = child_process.spawn(cmd, args, {
    // we are being opinionated here, the commands output will be passed through to the parent
    // this gives us better output in the parent
    stdio: 'inherit',
    ...options,
  });

  const promise = new Promise((resolve, reject) => {
    child.on('exit', (code, signal) => {
      process.env['VERBOSE'] && console.log(`child process exited with code ${code} and signal ${signal}`);
      if (code !== 0 || signal) {
        reject({ code, signal });
      }
      resolve({ code, signal });
    });

    child.on('error', (error) => {
      process.env['VERBOSE'] && console.log(`child process error ${error}`);
      reject({ error });
    });
  });
  promise.process = child;
  return promise;
}

function restoreHistory() {
  try {
    const history = fs.readFileSync('/tmp/dev-repl-history.json', 'utf8');
    return JSON.parse(history);
  } catch (e) {
    return [];
  }
}

function persistHistory() {
  fs.writeFileSync('/tmp/dev-repl-history.json', JSON.stringify(history));
}

const history = restoreHistory();

const promptMessage = 'Enter dev-cli command to run: (Ctrl+C to exit)';
const runningMessage = (command) => `Running command: "${command}"`;
const border = Array(promptMessage.length + 1).join('-');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  tabSize: 4,
});

const promptForCommand = async () => {
  const command = await getUserInput();
  if (command) {
    console.log(runningMessage(command));
    console.log(border);
    console.log(' ');
    if (!history.length || history[0] !== command) {
      const existingCommandIndex = history.indexOf(command);
      if (existingCommandIndex > -1) {
        history.splice(existingCommandIndex, 1);
      }
      history.unshift(command);
      persistHistory(history);
    }
    // note we run the command from the apps folder to ensure .env files are picked up
    const mainPath = path.join(DIST_PATH, DIST_FILE_NAME);
    try {
      await spawnAsync('node', [mainPath, ...command.split(' ')], {
        env: {
          __DEV__: 'true',
        }
      });
      console.log(' ');
    } catch (e) {
      console.error('Command Error:');
      console.error(e);
    }

  }
  return promptForCommand();
};

async function getUserInput() {
  return new Promise((resolve) => {
    let currentInput = '';
    let commandString = '';
    let currentHistoryIndex = -1;
    let selectedHistoryItem = undefined;
    function handleKeyPress(_, key) {
      if (key.ctrl && key.name === 'c') {
        rl.close();
        process.exit(0);
      } else if (key.name === 'up' || key.name === 'down') {
        if (!history || commandString.length) {
          return;
        }
        selectedHistoryItem = navigateHistory(history, key.name, currentHistoryIndex);
        currentHistoryIndex = history.indexOf(selectedHistoryItem);
        readline.cursorTo(process.stdout, 2);
        readline.clearLine(process.stdout, 1);
        currentInput = selectedHistoryItem;
        rl.write(null, { ctrl: true, name: 'u' });
        rl.write(selectedHistoryItem || '');
      } else if (key.name === 'backspace') {
        commandString = commandString.slice(0, -1);
        currentInput = currentInput.slice(0, -1);
      } else if (key.sequence && key.sequence.length === 1) {
        commandString += key.sequence;
        currentInput += key.sequence;
      }
    }
    function handleLine() {
      rl.off('line', handleLine);
      process.stdin.off('keypress', handleKeyPress);
      rl.pause();
      resolve(currentInput);
    }
    rl.on('line', handleLine);
    readline.emitKeypressEvents(process.stdin, rl);
    if (process.stdin.setRawMode != null) {
      process.stdin.setRawMode(true);
    }
    process.stdin.on('keypress', handleKeyPress);
    initializeUserPrompt();
  });
}

function initializeUserPrompt() {
  console.log(border);
  console.log(promptMessage);
  rl.write('> ');
  rl.write(null, {
    sequence: '\x7F',
    name: 'backspace',
    ctrl: false,
    meta: false,
    shift: false
  });
  rl.write(null, {
    sequence: '\x7F',
    name: 'backspace',
    ctrl: false,
    meta: false,
    shift: false
  });
}

const deltaMapper = {
  down: -1,
  up: 1,
};

function navigateHistory(
  history,
  direction,
  currentIndex,
) {
  if (currentIndex === 0 && direction === 'down') {
    return;
  }
  const index = Math.min(
    history.length - 1,
    Math.max(-1, currentIndex + deltaMapper[direction]),
  );
  return history[index];
}

promptForCommand().then(() => {
  process.exit(0);
}).catch((e) => {
  console.error(e);
  process.exit(1)
});
