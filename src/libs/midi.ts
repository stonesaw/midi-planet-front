import { Midi } from "@tonejs/midi";

export function loadMidi(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      if (!e.target || !e.target.result) {
        reject(new Error("Can't loading a MIDI file."));
      } else {
        const midi = new Midi(e.target.result as ArrayBuffer);
        const json = JSON.stringify(midi, undefined, 2);
        resolve(json);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}
