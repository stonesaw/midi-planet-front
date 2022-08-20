// FileReader 周りの型が面倒だったので、JS

import { Midi } from "@tonejs/midi";

export async function loadMidi(
  file: File,
  callback: (strJson: string) => void
) {
  const reader = new FileReader();
  reader.onload = function (e) {
    if (!e.target || !e.target.result) return;
    const midi = new Midi(e.target.result as ArrayBuffer);
    callback(JSON.stringify(midi, undefined, 2));
  };
  reader.readAsArrayBuffer(file);
}
