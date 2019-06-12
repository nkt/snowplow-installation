const { emitter, tracker } = require('snowplow-tracker');

const e = emitter(
  '127.0.0.1',
  'http',
  8080,
  'POST',
  5,
  (error, body, response) => {
    if (error) {
      console.log({ body, error });
    }
  }
);

const t = tracker([e], 'stress-tracker', 'stress-app', false);

const immediate = () => new Promise(setImmediate);
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

async function run() {
  while (true) {
    t.trackStructEvent(`event_${Math.random()}`, `action_${Math.random()}`, null, `prop_${Math.random()}`, Math.random());
    await delay(10);
  }
}

run().catch((error) => console.error(error));