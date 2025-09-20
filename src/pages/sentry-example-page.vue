<!--
This is just a very simple page with a button to throw an example error.
Feel free to delete this file.
-->

<script setup lang="ts">
import * as Sentry from '@sentry/nuxt'

class SentryExampleFrontendError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SentryExampleFrontendError'
  }
}

const hasSentError = ref(false)
const isConnected = ref(true)

onMounted(async () => {
  try {
    const result = await Sentry.diagnoseSdkConnectivity()
    isConnected.value = result !== 'sentry-unreachable'
  } catch (error) {
    console.info('error: ', error)
    isConnected.value = false
  }
})

async function getSentryData() {
  await Sentry.startSpan(
    {
      name: 'Example Frontend Span',
      op: 'test',
    },
    async () => {
      const res = await $fetch('/api/sentry-example-api', {
        method: 'GET',
        ignoreResponseError: true,
      }).catch(() => null)
      if (!res) {
        hasSentError.value = true
      }
    },
  )
  throw new SentryExampleFrontendError(
    'This error is raised on the frontend of the example page.',
  )
}
</script>

<template>
  <title>Sentry Onboarding</title>
  <div>
    <main>
      <div class="flex-spacer" />
      <svg
        height="40"
        width="40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.85 2.995a3.698 3.698 0 0 1 1.353 1.354l16.303 28.278a3.703 3.703 0 0 1-1.354 5.053 3.694 3.694 0 0 1-1.848.496h-3.828a31.149 31.149 0 0 0 0-3.09h3.815a.61.61 0 0 0 .537-.917L20.523 5.893a.61.61 0 0 0-1.057 0l-3.739 6.494a28.948 28.948 0 0 1 9.63 10.453 28.988 28.988 0 0 1 3.499 13.78v1.542h-9.852v-1.544a19.106 19.106 0 0 0-2.182-8.85 19.08 19.08 0 0 0-6.032-6.829l-1.85 3.208a15.377 15.377 0 0 1 6.382 12.484v1.542H3.696A3.694 3.694 0 0 1 0 34.473c0-.648.17-1.286.494-1.849l2.33-4.074a8.562 8.562 0 0 1 2.689 1.536L3.158 34.17a.611.611 0 0 0 .538.917h8.448a12.481 12.481 0 0 0-6.037-9.09l-1.344-.772 4.908-8.545 1.344.77a22.16 22.16 0 0 1 7.705 7.444 22.193 22.193 0 0 1 3.316 10.193h3.699a25.892 25.892 0 0 0-3.811-12.033 25.856 25.856 0 0 0-9.046-8.796l-1.344-.772 5.269-9.136a3.698 3.698 0 0 1 3.2-1.849c.648 0 1.285.17 1.847.495Z"
          fill="currentcolor"
        />
      </svg>
      <h1>sentry-example-page</h1>

      <p class="description">
        Click the button below, and view the sample error on the Sentry
        <a
          target="_blank"
          href="https://tiago-porto.sentry.io/issues/?project=4510050072199168"
          >Issues Page</a
        >. For more details about setting up Sentry,
        <a
          target="_blank"
          href="https://docs.sentry.io/platforms/javascript/guides/nuxt/"
          >read our docs</a
        >.
      </p>

      <button type="button" :disabled="!isConnected" @click="getSentryData">
        <span> Throw Sample Error </span>
      </button>

      <p v-if="hasSentError" class="success">
        Sample error was sent to Sentry.
      </p>
      <div v-else-if="!isConnected" class="connectivity-error">
        <p>
          It looks like network requests to Sentry are being blocked, which will
          prevent errors from being captured. Try disabling your ad-blocker to
          complete the test.
        </p>
      </div>
      <div v-else class="success-placeholder" />

      <div class="flex-spacer" />
    </main>
  </div>
</template>

<style scoped>
:global(body) {
  margin: 0;

  @media (prefers-color-scheme: dark) {
    background-color: #0a0a0a;
    color: #ededed;
  }
}

main {
  display: flex;
  min-height: 100vh;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    sans-serif;
  gap: 16px;
}

h1 {
  padding: 0 4px;
  border-radius: 4px;
  margin: 0;
  background-color: rgb(24 20 35 / 3%);
  font-family: monospace;
  font-size: 20px;
  line-height: 1.2;
}

p {
  margin: 0;
  font-size: 20px;
}

a {
  color: #6341f0;
  cursor: pointer;
  text-decoration: underline;

  @media (prefers-color-scheme: dark) {
    color: #b3a1ff;
  }
}

button {
  padding: 0;
  border: none;
  border-radius: 8px;
  margin-top: 4px;
  background-color: #553db8;
  color: white;
  cursor: pointer;

  & > span {
    display: inline-block;
    padding: 12px 16px;
    border: 1px solid #553db8;
    border-radius: inherit;
    background-color: #7553ff;
    font-size: 20px;
    font-weight: bold;
    line-height: 1;
    transform: translateY(-4px);
  }

  &:hover > span {
    transform: translateY(-8px);
  }

  &:active > span {
    transform: translateY(0);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;

    & > span {
      border: none;
      transform: translateY(0);
    }
  }
}

.description {
  max-width: 500px;
  color: #6e6c75;
  font-size: 20px;
  line-height: 1.5;
  text-align: center;

  @media (prefers-color-scheme: dark) {
    color: #a49fb5;
  }
}

.flex-spacer {
  flex: 1;
}

.success {
  padding: 12px 16px;
  border: 1px solid #00bf4d;
  border-radius: 8px;
  background-color: #00f261;
  color: #181423;
  font-size: 20px;
  line-height: 1;
}

.success-placeholder {
  height: 46px;
}

.connectivity-error {
  width: 500px;
  padding: 12px 16px;
  border: 1px solid #a80033;
  border-radius: 8px;
  margin: 0;
  background-color: #e50045;
  color: #fff;
  text-align: center;
}

.connectivity-error a {
  color: #fff;
  text-decoration: underline;
}
</style>
