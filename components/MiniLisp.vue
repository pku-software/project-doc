<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { withBase } from "@vuepress/client";
import { Terminal } from "xterm";
import { LocalEchoAddon } from "@gytx/xterm-local-echo";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

let wasmEnv = void 0;
const terminalDiv = ref(null);
let resizeObserver;

const EXAMPLE_INPUTS = [
  "(+ 30 50)",
  "(/ 10 3)",
  "(if (> 5 3) \"OK\" \"Impossible\")",
  '(print "Hello, world!")',
  "(map - '(1 2 3))",
  "(car '(lhs . rhs))",
  "(cdr (list 1 'a #t))",
  "(cons 9 (cons 8 (cons 5 '())))",
  "(map (lambda (x) (* x x)) '(1 2 3))",
  "(eval '(+ 1 2))",
  "(let ((x 10)) (+ x 20))",
  "(filter odd? '(1 2 3 4 5))",
  "(begin (define x 42) x)",
  "(reduce (lambda (x y) (+ x y)) '(1 2 3 4 5))",
];
const exampleNo = ref(Math.floor(Math.random() * EXAMPLE_INPUTS.length));

if (!("wasmLoaded" in window)) {
  window.wasmLoaded = new Promise((resolve) => {
    window.Module = {
      onRuntimeInitialized: resolve,
      print: alert,
    };
    const script = document.createElement("script");
    script.src = withBase("/mini_lisp.js");
    document.body.appendChild(script);
  });
}

onMounted(async () => {
  const term = new Terminal({
    cursorBlink: true,
    fontSize: 12,
  });
  term.open(terminalDiv.value);
  const localEcho = new LocalEchoAddon({
    enableIncompleteInput: false,
    enableAutocomplete: false,
  });
  const fitAddon = new FitAddon();
  term.loadAddon(localEcho);
  term.loadAddon(fitAddon);
  term.write("\x1b[38;5;250mLoading Mini-Lisp on Wasm...\x1b[0m");
  await window.wasmLoaded;
  await localEcho.println("\x1b[H\x1b[2J\x1b[1mMini-Lisp on Wasm\x1b[0m\x1b[38;5;250m by Guyutongxue\x1b[0m");
  wasmEnv = new window.Module.WasmEnv();
  const readLine = async () => {
    const line = await localEcho.read(">>> ");
    if (!wasmEnv) {
      console.error("Wasm env not ready.");
      return;
    }
    try {
      const result = wasmEnv.eval(line);
      await localEcho.println(result);
    } catch (e) {
      if (Array.isArray(e.message)) {
        await localEcho.println(
          `\x1b[31m${e.message[0]}: ${e.message[1]}\x1b[0m`
        );
      }
    }
    readLine();
  };
  readLine();
  resizeObserver = new ResizeObserver(() => {
    fitAddon.fit();
  });
  resizeObserver.observe(terminalDiv.value);
});

onUnmounted(() => {
  if (wasmEnv) {
    wasmEnv.delete();
    wasmEnv = void 0;
  }
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = void 0;
  }
});
</script>

<template>
  <div class="term-container">
    <div class="hint">
      <h5>Try Mini-Lisp Now.</h5>
      在右侧输入任意代码，按回车执行。试试
      <code>
        {{ EXAMPLE_INPUTS[exampleNo] }}
      </code>
      ？
    </div>
    <div class="terminal" ref="terminalDiv"></div>
  </div>
</template>

<style>
.term-container {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 20rem;
  border-radius: 1rem;
  background-color: var(--c-border);
  overflow: hidden;
}
.term-container .hint {
  padding: 2rem;
}
.term-container .hint h5 {
  padding: 0;
  margin: 1rem 0;
  font-size: 1.5rem;
}
.term-container .terminal {
  background-color: black;
  padding: 1rem;
}
.xterm-viewport {
  scrollbar-width: thin;
  scrollbar-color: grey black;
}
.xterm-viewport::-webkit-scrollbar {
  width: 7px;
}
.xterm-viewport::-webkit-scrollbar-thumb {
  background-color: grey;
  border-radius: 3px;
}
.xterm-viewport::-webkit-scrollbar-track {
  background-color: black;
}
</style>
